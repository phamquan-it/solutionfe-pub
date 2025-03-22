"use client";
import { useState } from "react";
import { Button, Upload, UploadProps, message, Progress, Image, Form } from "antd";
import { UploadOutlined, DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/config/firebase_config";

const FirebaseUpload = () => {
    const [form] = Form.useForm();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState("");
    const [filePath, setFilePath] = useState(""); // Store file path
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store selected file

    const handleUpload = async () => {
        if (!selectedFile) {
            message.warning("Please select a file to upload.");
            return;
        }

        const storagePath = `uploads/${selectedFile.name}`;
        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload error:", error);
                message.error("Upload failed");
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                setDownloadURL(url);
                setFilePath(storagePath);
                message.success("Upload successful!");
            }
        );
    };

    const handleDelete = async () => {
        if (!filePath) {
            message.warning("No file to delete");
            return;
        }

        const fileRef = ref(storage, filePath);

        try {
            await deleteObject(fileRef);
            message.success("File deleted successfully");
            setDownloadURL("");
            setFilePath("");
            setUploadProgress(0);
            setSelectedFile(null);
            form.resetFields();
        } catch (error) {
            console.error("Delete error:", error);
            message.error("File deletion failed");
        }
    };

    const handleGetDownloadLink = async () => {
        if (!filePath) {
            message.warning("No file path set");
            return;
        }

        const fileRef = ref(storage, filePath);
        try {
            const url = await getDownloadURL(fileRef);
            setDownloadURL(url);
            console.log(url);
            message.success("Download link retrieved successfully!");
        } catch (error) {
            console.error("Error fetching download URL:", error);
            message.error("Failed to get download link");
        }
    };

    return (
        <div className="p-5 border rounded-lg shadow-lg">
            <Form form={form} onFinish={handleUpload}>
                <Form.Item>
                    <Upload
                        beforeUpload={(file) => {
                            setSelectedFile(file);
                            return false; // Prevent automatic upload
                        }}
                        maxCount={1}
                        fileList={selectedFile ? [{ uid: selectedFile.name, name: selectedFile.name }] : []}
                        onRemove={() => setSelectedFile(null)}
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={!selectedFile}>
                        Upload
                    </Button>
                </Form.Item>
            </Form>

            {uploadProgress > 0 && <Progress percent={Math.round(uploadProgress)} status="active" />}

            {downloadURL && (
                <div className="mt-3">
                    <p>
                        File URL: <a href={downloadURL} target="_blank" rel="noopener noreferrer">{downloadURL}</a>
                    </p>
                    <Image width={200} src={downloadURL} />
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={handleDelete}>
                        Delete File
                    </Button>
                </div>
            )}

            {filePath && (
                <div className="mt-3">
                    <Button type="primary" icon={<LinkOutlined />} onClick={handleGetDownloadLink}>
                        Get Download Link
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FirebaseUpload;

