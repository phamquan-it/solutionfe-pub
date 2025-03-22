import { handleUpload } from '@/common';
import { useCreateServiceMutation } from '@/libs/redux/api/serviceApi';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload, message } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';

const CreateService: React.FC = () => {
    const [createService, { isLoading }] = useCreateServiceMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<Service>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values: Service) => {
        if (fileList.length === 0) {
            message.error("Please upload an image.");
            return;
        }

        try {
            // Upload the image and get the URL
            const imageUrl = await handleUpload(fileList[0] as RcFile, message);
            const serviceData = { ...values, image: imageUrl };

            console.log("Service Data:", serviceData);
            createService(serviceData);
        } catch (error) {
            console.error("Upload error:", error);
            message.error("Image upload failed.");
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Create</Button>
            <Modal
                title="Create"
                className="overflow-auto"
                open={isModalOpen}
                okButtonProps={{ loading: isLoading }}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="!h-[50vh] overflow-auto pe-2" style={{ scrollbarWidth: "thin" }}>
                    <Form<Service>
                        layout="vertical"
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item<Service> label="Name" name="name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item<Service> label="Price" name="price" rules={[{ required: true }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item<Service> label="Amount" name="amount" rules={[{ required: true }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item<Service> label="Rate" name="rate" rules={[{ required: true }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item<Service> label="Description" name="description" rules={[{ required: true }]}>
                            <Input.TextArea autoSize />
                        </Form.Item>
                        <Form.Item<Service> label="Image" name="image" rules={[{ required: true }]}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFileList([file]); // Only keep the latest file
                                    return false; // Prevent automatic upload
                                }}
                                fileList={fileList}
                                maxCount={1} // Allow only one file
                                onRemove={() => setFileList([])}
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default CreateService;

