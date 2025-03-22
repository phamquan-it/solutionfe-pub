import { useCreateTechnologyMutation } from '@/libs/redux/api/technologyApi';
import { Button, Form, FormProps, Input, Modal, message, Upload } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { uploadAndConvertImage } from '@/common';

const CreateTechnology: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createTechnology, { isLoading }] = useCreateTechnologyMutation();
    const [svgContent, setSvgContent] = useState<string | null>(null);

    const [form] = Form.useForm<Technology>();

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setSvgContent(null);
    };

    const onFinish: FormProps<Technology>['onFinish'] = async (values) => {
        if (!svgContent) {
            message.error('Please upload and convert an image first.');
            return;
        }

        try {
            await createTechnology({ ...values, icon: svgContent }).unwrap();
            message.success('Technology created successfully!');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Upload error:', error);
            message.error('Upload failed. Please try again.');
        }
    };

    const handleUpload = async (file: RcFile) => {
        try {
            const svg = await uploadAndConvertImage(file);
            if (svg) {
                setSvgContent(svg);
                message.success('Image converted to SVG successfully!');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            message.error('Failed to convert image.');
        }
        return false; // Prevent default upload behavior
    };

    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Create</Button>

            <Modal
                title="Create Technology"
                open={isModalOpen}
                okButtonProps={{ loading: isLoading }}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form<Technology> form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
                    <Form.Item<Technology> label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Upload Icon">
                        <Upload beforeUpload={handleUpload} showUploadList={false}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    {svgContent && (
                        <div style={{ marginTop: 20 }}>
                            <h3>Preview:</h3>
                            <div dangerouslySetInnerHTML={{ __html: svgContent }} />
                        </div>
                    )}
                </Form>
            </Modal>
        </>
    );
};
export default CreateTechnology;
