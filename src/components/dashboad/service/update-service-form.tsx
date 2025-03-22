import { handleUpload } from '@/common';
import { useUpdateServiceMutation } from '@/libs/redux/api/serviceApi';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Modal, Upload, message } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

interface UpdateServiceFormProps {
    service: Service;
}

const UpdateFormService: React.FC<UpdateServiceFormProps> = ({ service }) => {
    const [updateService, { isLoading }] = useUpdateServiceMutation();
    const [form] = Form.useForm<UpdateService>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        form.setFieldsValue(service);
    }, [service, form]);


    const onFinish: FormProps<UpdateService>['onFinish'] = async (values) => {
        let imageUrl = null;
        try {
            if (fileList.length > 0) {
                imageUrl = await handleUpload(fileList[0] as RcFile, message);
            }
            if (imageUrl != null) {
                values.image = imageUrl
            }
            const updatedService:UpdateService = {
                ...values ,
                id: service.id?? -1,
            }
            const result = await updateService(updatedService);
            if (result.error) message.error("Err")
            else message.success("success")
        } catch (error) {
            console.error("Update failed:", error);
            message.error("Failed to update service.");
        }
    };

    return (
        <>
            <div className="!h-[50vh] overflow-auto pe-2" style={{ scrollbarWidth: "thin" }}>
                <Form<UpdateService>
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
                    <Form.Item<Service> label="Description" name="description">
                        <Input.TextArea autoSize />
                    </Form.Item>
                    <Form.Item<Service> label="Image" name="image">
                        <Upload
                            beforeUpload={(file) => {
                                setFileList([file]);
                                return false;
                            }}
                            fileList={fileList}
                            maxCount={1}
                            onRemove={() => setFileList([])}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default UpdateFormService;

