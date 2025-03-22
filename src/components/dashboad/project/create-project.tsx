import { useGetCategoriesQuery } from '@/libs/redux/api/categoryApi';
import { Button, Form, FormProps, Input, Modal, Select, Upload, UploadProps, message } from 'antd';
import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useGetAllUserQuery } from '@/libs/redux/api/userApi';
import { useGetAllTechnologyQuery } from '@/libs/redux/api/technologyApi';
import { useGetAllServicesQuery } from '@/libs/redux/api/serviceApi';
import { useCreateProjectMutation } from '@/libs/redux/api/projectApi';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const CreateProject: React.FC = () => {

    const { data, isFetching, isSuccess } = useGetCategoriesQuery({})
    const [createProject, project_state] = useCreateProjectMutation()
    const user = useGetAllUserQuery()
    const techlology = useGetAllTechnologyQuery()
    const service = useGetAllServicesQuery()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const handleOk = () => {
        form.submit()
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const [messageApi, contextHolder] = message.useMessage();
    const onFinish: FormProps<CreateProject>['onFinish'] = async (values) => {
        values.technologies = values?.technologies?.map((technology_id) => Number(technology_id));
        values.price = Number(values.price)

        if (values.duration) {
            values.duration = dayjs(values.duration).format("YYYY/MM/DD");
        }
        values.files = []
        console.log('Success:', values);
        const result = await createProject(values)
        if (result.error) {
            messageApi.error("Create project err!")
        } else messageApi.success("Create project success!")
    };

    const onFinishFailed: FormProps<CreateProject>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const props: UploadProps = {
        fileList: [],
        name: 'file',
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
            } else if (info.file.status === 'error') {
            }
        },
    };
    return <>
        {contextHolder}
        <Button type="primary"
            onClick={() => {
                setIsModalOpen(true);
            }}
            iconPosition="end">Create</Button>
        <Modal title="Create"
            width={800}
            open={isModalOpen}
            okButtonProps={{
                loading: project_state.isLoading
            }} onOk={handleOk} onCancel={handleCancel}>
            <Form<CreateProject>
                form={form}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className="h-[56vh]">
                    <div className="h-[41vh] overflow-auto pe-1 slide-form">
                        <Form.Item<CreateProject>
                            label="Name"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Project name" />
                        </Form.Item>
                        <div className="grid grid-cols-3 gap-2">
                            <Form.Item
                                className="col-span-2"
                                label="User"
                                name="user_id"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    options={user?.data?.map((value) => ({ value: value.id + '', label: value.email }))}
                                    className="w-48"
                                    allowClear
                                    placeholder="Select user"
                                />
                            </Form.Item>
                            <Form.Item<CreateProject>
                                label="Category"
                                name="category_id"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    options={data?.map((value) => ({ value: value.id, label: value.name }))}
                                    placeholder="Select category"
                                />
                            </Form.Item>

                        </div>
                        <Form.Item
                            label="Duration"
                            name="duration"
                            rules={[{ required: true }]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>
                        <Form.Item<CreateProject>
                            label="Technologies"
                            name="technologies"
                            rules={[{ required: true }]}
                        >
                            <Select
                                mode="tags"
                                showSearch
                                options={techlology?.data?.map((value) => ({ value: value.id + '', label: value.name }))}
                                className="w-48"
                                allowClear
                                placeholder="Select technology"
                            />
                        </Form.Item>
                        <div className="grid grid-cols-3 gap-2">
                            <Form.Item<CreateProject>
                                label="Price"
                                name="price"
                                rules={[{ required: true }]}
                            >
                                <Input type="number" placeholder="Enter price" />
                            </Form.Item>
                            <Form.Item<CreateProject>
                                label="Project files"
                                name="files"
                            >

                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>

                        </div>
                    </div>

                    <div className="h-12">
                        <Form.Item<CreateProject>
                            label="Description"
                            name="description"
                        >
                            <Input.TextArea rows={2} allowClear />
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Modal>
    </>

}

export default CreateProject
