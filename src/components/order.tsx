"use client"
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Collapse, CollapseProps, Form, FormProps, Input, Modal, Select, Upload, UploadFile, UploadProps, message, Image } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/router';
import { useGetAllITCategoryQuery } from '@/libs/redux/api/it_categoryApi';
import { useGetCategoriesQuery } from '@/libs/redux/api/categoryApi';
import { useCheckConfirmProjectMutation, useCreateProjectMutation, useVerifyTransactionsMutation } from '@/libs/redux/api/projectApi';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/config/firebase_config';
import { RcFile } from 'antd/es/upload';
import { handleUpload } from '@/common';
import { useTranslations } from 'next-intl';

type FieldType = {
    name?: string;
    project_category: string
    technology_used?: string[],
    description?: string,
    project_type?: string,
    solution_file?: string
};
const OrderBuider = ({ technologies, categories, services }: {
    technologies: Technology[]
    categories: Category[]
    services: Service[]
}) => {
    //uploadfile 
    const t = useTranslations("Order")
    const or = useTranslations("OrderState")
    const [isChecking, setIsChecking] = useState(false)
    const [activeKey, setActiveKey] = useState<string>('1')
    const [fileList, setFileList] = useState<RcFile[]>([])
    const [upLoading, setUpLoading] = useState(false)

    const ittechlologies = useGetAllITCategoryQuery();
    const [vertifyOrder, vertifyOrderState] = useVerifyTransactionsMutation()
    const [createProject, { data, isLoading, isError }] = useCreateProjectMutation()
    const router = useRouter()
    const searchParams = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [checkConfirmProject, confirmState] = useCheckConfirmProjectMutation();


    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const setTechnologiesFromItCategoryId = (service_id: number) => {
        const result = ittechlologies.data?.find((t) => t.id == service_id)
        const techs = result?.technologies ?? []
        form.setFieldValue('technology_used', techs.map((tech) => tech.id?.toString()))
    }
    useEffect(() => {
        setTimeout(() => {
            if (searchParams.get("platform") != undefined || searchParams.get("category") != undefined) {
                setIsModalOpen(true)
                switch (searchParams.get("platform")) {
                    case 'web':
                        form.setFieldValue('project_category', 1)
                        setTechnologiesFromItCategoryId(1)
                        break;
                    case 'mobile':
                        form.setFieldValue('project_category', 2)
                        setTechnologiesFromItCategoryId(2)
                        break;
                    case 'desktop':
                        form.setFieldValue('project_category', 5)
                        setTechnologiesFromItCategoryId(5)
                        break;
                    case 'cross-platform':
                        form.setFieldValue('project_category', 7)
                        setTechnologiesFromItCategoryId(7)
                        break;
                }
            }
            if (searchParams.get("category") != undefined && searchParams.get("id") != undefined) {
                form.setFieldValue('project_category', 13)
                const service = services.find(service => service.id == Number(searchParams.get("id")));
                const technologies = service?.technologies || [];
                form.setFieldValue('technology_used', technologies.map((tech) => tech.id?.toString()))
                form.setFieldValue('description', `Template: ${service?.name}`)
            }
        }, 100)
    }, [searchParams])

    const [orderId, setOrderId] = useState(-1)
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setUpLoading(true)
        const filePaths = [];
        const fileStores = fileList.map(async (file) => {
            return await handleUpload(file, messageApi);
        })
        const files = await Promise.all(fileStores);
        const techlologiesUsed = values.technology_used ?? [];
        const project = {
            name: values.name ?? '',
            price: 1,
            duration: '2025/01/01',
            description: values.description ?? '',
            category_id: Number(values.project_type),
            technologies: techlologiesUsed.map((value) => Number(value)),
            files: files.map((file) => ({ file }))
        }
        const result = await createProject(project);
        if (result.error) messageApi.error("Err!"); else {
            setOrderId(result.data.data.id || -1)
            messageApi.success("Success!")
            setActiveKey('2')
        } setUpLoading(false)
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // works when >= 5.6.0, recommended ✅
    const [qrsrc, setQrsrc] = useState<string>()

    const [nodeCheck, setNodeCheck] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (orderId !== -1) {
            setIsChecking(true);
            setQrsrc(`https://qr.sepay.vn/img?bank=TPBank&acc=00005864268&template=compact&amount=5000&des=SOP${orderId}`);
            const startTime = Date.now(); // Capture the start time
            const checkStatus = async () => {
                try {
                    const checkData = await checkConfirmProject({ id: orderId });

                    if (checkData.data?.confirmed) {
                        messageApi.success(or("done"));
                        handleOkChecking();
                    } else {
                        if (Date.now() - startTime < 2 * 60 * 1000) { // Stop checking after 2 minutes
                            setTimeout(checkStatus, 3000);
                        } else {
                            messageApi.error(or("validation_expired"));
                            handleOkChecking()
                        }
                    }
                } catch (error) {
                    console.error("Error checking confirmation:", error);
                }
            };
            checkStatus();
            return () => { };
        }
    }, [orderId]);

    const items: CollapseProps['items'] = [
        {
            key: '2',
            label: t('banktranfer'),
            children: <>
                <div className="flex justify-center">
                    <Image width={180} src={qrsrc} />
                </div>
            </>,
        },
        {
            key: '3',
            label: t('frommyaccount'),
            children: <p>
                <Checkbox onChange={async (e) => {
                    if (e.target.checked) {
                        const result = await vertifyOrder({ project_id: orderId });
                        if (!result.error) {
                            messageApi.success(or("done"));
                            handleOkChecking();
                        } else messageApi.error(or("insufficientbalance"));
                    }
                }} >Direct payment from my account</Checkbox>
            </p>,
        },
    ]
    const [form] = Form.useForm()
    const handleOk = () => {
        if (orderId == -1)
            form.submit()
        else {
            setOrderId(-1)
            setQrsrc('')
            handleCancel()
        }
    }
    const handleOkChecking = () => {
        setQrsrc('');
        setIsChecking(false);
        setOrderId(-1)
        handleCancel();
    }

    return <>
        {contextHolder}
        <Modal
            okButtonProps={{
                loading: isLoading || upLoading || isChecking
            }}
            onOk={handleOk}
            okText={orderId == -1 ? or("next") : or("checking")}
            title="Buider"
            open={isModalOpen}
            onCancel={handleCancel}
            width={1000}

        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <div className="grid md:grid-cols-3 gap-2 h-[60vh] overflow-auto">
                    <Card className="">
                        <Form.Item<FieldType>
                            label={t('name')}
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={t('category')}
                            name="project_category"
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={ittechlologies
                                    .data?.map((
                                        ittechlology
                                    ) => {
                                        return {
                                            value: ittechlology.id,
                                            label: ittechlology.name
                                        }
                                    })}
                                onChange={(e) => {
                                    const result = ittechlologies.data?.find((t) => t.id == e)
                                    const techs = result?.technologies ?? []
                                    form.setFieldValue('technology_used', techs.map((tech) => tech.id?.toString()))
                                }}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={t('description')}
                            name="description"
                        >
                            <Input.TextArea allowClear rows={2} />
                        </Form.Item>
                    </Card>
                    <Card>
                        <Form.Item<FieldType>
                            label={t('technologiesused')}
                            name="technology_used"
                        >
                            <Select options={technologies?.map((techlology) => ({
                                value: techlology.id?.toString(),
                                label: techlology.name
                            }))} mode="tags" />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={t('projectcategory')}
                            name="project_type"
                            initialValue={1}

                            rules={[{ required: true }]}
                        >
                            <Select options={categories?.map((category) => ({
                                value: category.id, label: category.name
                            }))} />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="solution_file"
                        >
                            <Upload
                                multiple
                                maxCount={5}
                                beforeUpload={(file) => {
                                    setFileList((prev) => [...prev, file]);
                                    return false; // Prevent auto upload
                                }}
                                fileList={fileList}
                                onRemove={(file) => setFileList((prev) => prev.filter((item) => item.uid !== file.uid))}
                            >
                                <Button icon={<UploadOutlined />}>{t('selectfiles')}</Button>
                            </Upload>
                        </Form.Item>
                        <p>{t('canuploadfile')}</p>
                    </Card>

                    <Card className={orderId == -1 ? "" : "border-sky-400"}>
                        <Collapse
                            items={items}
                            accordion
                            onChange={(key) => {
                                if (orderId != -1) {
                                    setActiveKey(key + '')
                                } else {
                                    form.submit()
                                }
                            }}
                            activeKey={activeKey}
                            className="!border-none !bg-transparent" />
                        <div className="!h-full px-2 text-ssm">
                            {t('need1dollar')}
                        </div>
                    </Card>

                </div>
            </Form>

        </Modal>
    </>
}

export default OrderBuider
