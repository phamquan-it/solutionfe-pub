import { useUpdateTechnologyMutation } from '@/libs/redux/api/technologyApi';
import { FormOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Modal, Tabs, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { RcFile } from 'antd/es/upload';
import AssignLanguage from './assign-language';
import AssignITCategory from './assign-itcategory';
import { uploadAndConvertImage } from '@/common';

interface UpdateTechnologyProps {
    technology: Technology;
}

const UpdateTechnology: React.FC<UpdateTechnologyProps> = ({ technology }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateTechnology, { isLoading }] = useUpdateTechnologyMutation();
    const [svgContent, setSvgContent] = useState<string | null>(technology.icon || null);

    const [form] = Form.useForm<Technology>();

    useEffect(() => {
        form.setFieldsValue(technology);
    }, [technology, form]);

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setSvgContent(technology.icon || null);
    };

    const onFinish: FormProps<Technology>['onFinish'] = async (values) => {
        if (!svgContent) {
            message.error('Please upload and convert an image first.');
            return;
        }

        try {
            await updateTechnology({ id: technology.id, ...values, icon: svgContent }).unwrap();
            message.success('Technology updated successfully!');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Update error:', error);
            message.error('Update failed. Please try again.');
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

    const items = [
        {
            key: '1',
            label: 'Technology',
            children: (
                <Form<Technology>
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={technology}
                    autoComplete="off"
                >
                    <Form.Item<Technology> label="Name" name="name" rules={[{ required: true }]}>
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: '2',
            label: 'Language',
            children: <AssignLanguage technology={technology} />,
        },
        {
            key: '3',
            label: 'IT Category',
            children: <AssignITCategory technology={technology} />,
        },
    ];

    return (
        <>
            <Button
                type="primary"
                onClick={() => setIsModalOpen(true)}
                icon={<FormOutlined />}
            >
            </Button>
            <Modal title="Update Technology" footer={null} open={isModalOpen} onCancel={handleCancel}>
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>
        </>
    );
};

export default UpdateTechnology;

