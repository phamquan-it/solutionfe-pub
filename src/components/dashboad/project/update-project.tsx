import { useGetCategoriesQuery } from '@/libs/redux/api/categoryApi';
import { Button, Form, Input, Modal, Select, Upload, message, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { EditFilled, UploadOutlined } from '@ant-design/icons';
import { useGetAllUserQuery } from '@/libs/redux/api/userApi';
import { useGetAllTechnologyQuery } from '@/libs/redux/api/technologyApi';
import { useGetAllServicesQuery } from '@/libs/redux/api/serviceApi';
import { useUpdateProjectMutation } from '@/libs/redux/api/projectApi';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface UpdateProjectProps {
    project: Project;
}

const UpdateProject: React.FC<UpdateProjectProps> = ({ project }) => {
    const { data: categories } = useGetCategoriesQuery({});
    const { data: users } = useGetAllUserQuery();
    const { data: technologies } = useGetAllTechnologyQuery();
    const { data: services } = useGetAllServicesQuery();
    const [updateProject, { isLoading }] = useUpdateProjectMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (isModalOpen && project) {
            form.setFieldsValue({
                name: project.name,
                technologies: project?.technologies.map((t:any) => String(t.id)),
                duration: dayjs(project.duration, "YYYY/MM/DD"),
                category_id: project.category_id,
                price: project.price,
                user_id: project.user?.id,
                description: project.description
            });
        }
    }, [isModalOpen, project, form]);

    const handleUpdate = async (values: any) => {
        try {
            values.technologies = values.technologies.map(Number);
            values.price = Number(values.price);
            if (values.duration) {
                values.duration = dayjs(values.duration).format("YYYY/MM/DD");
            }
            values.files = [];

            await updateProject({ id: project.id??-1, body: values }).unwrap();
            messageApi.success('Project updated successfully!');
            setIsModalOpen(false);
        } catch (error) {
            messageApi.error('Update failed!');
        }
    };

    return (
        <>
            {contextHolder}
            <Button type="primary"
                onClick={() => setIsModalOpen(true)}
                icon={<EditFilled />}
            />

            <Modal title="Update Project"
                width={600}
                open={isModalOpen}
                okText="Update"
                confirmLoading={isLoading}
                onOk={() => form.submit()}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdate}
                    autoComplete="off"
                >
                    <div className="h-[56vh]">
                        <div className="h-[41vh] overflow-auto pe-1 slide-form">
                            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                                <Input placeholder="Project name" />
                            </Form.Item>

                            <div className="grid grid-cols-3 gap-2">
                                <Form.Item label="User" name="user_id" rules={[{ required: true }]}>
                                    <Select
                                        options={users?.map((user) => ({ value: String(user.id), label: user.email }))}
                                        className="w-48"
                                        allowClear
                                        placeholder="Select user"
                                    />
                                </Form.Item>

                                <Form.Item label="Category" name="category_id" rules={[{ required: true }]}>
                                    <Select
                                        options={categories?.map((cat) => ({ value: cat.id, label: cat.name }))}
                                        placeholder="Select category"
                                    />
                                </Form.Item>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Form.Item label="Service" name="service_id">
                                    <Select
                                        showSearch
                                        options={services?.map((service) => ({ value: String(service.id), label: service.name }))}
                                        className="w-48"
                                        allowClear
                                        placeholder="Select service"
                                    />
                                </Form.Item>

                                <Form.Item label="Duration" name="duration" rules={[{ required: true }]}>
                                    <DatePicker className="w-full" />
                                </Form.Item>
                            </div>

                            <Form.Item label="Technologies" name="technologies" rules={[{ required: true }]}>
                                <Select
                                    mode="tags"
                                    showSearch
                                    options={technologies?.map((tech) => ({ value: String(tech.id), label: tech.name }))}
                                    className="w-48"
                                    allowClear
                                    placeholder="Select technology"
                                />
                            </Form.Item>

                            <div className="grid grid-cols-3 gap-2">
                                <Form.Item label="Price" name="price" rules={[{ required: true }]}>
                                    <Input type="number" placeholder="Enter price" />
                                </Form.Item>

                                <Form.Item label="Project files" name="files">
                                    <Upload>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="h-12">
                            <Form.Item label="Description" name="description">
                                <Input.TextArea rows={2} allowClear />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateProject;

