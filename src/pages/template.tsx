import { containsAll, filterRouterTechnologies, filterRouterTemplates, mergeUniqueNumericStrings, mergeUniqueTechnologies, syncObjectToUrl } from '@/common';
import SearchFilter from '@/components/filters/search-filter';
import { CustomerServiceOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Checkbox, Divider, Form, Input, Image, Tag, List, FloatButton } from 'antd';
import { Layout } from 'antd';
const { Sider, Content } = Layout;
import Title from 'antd/es/typography/Title';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/all`);
    const services = await res.json();
    return {
        props: {
            services
        },
        revalidate: 10,
    };
}
const Page = ({ services }: { services: Service[] }) => {
    const t = useTranslations("SolutionPage")
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(false)
    const templateQuery = router.query?.template;
    const templateArray = Array.isArray(templateQuery) ? templateQuery : templateQuery ? [templateQuery] : [];
    // Get keyword from query
    const technologyQuery = router.query?.technology;
    const technologyArray = Array.isArray(technologyQuery) ? technologyQuery : technologyQuery ? [technologyQuery] : [];
    const keyword = router.query?.keyword?.toString().toLowerCase() || "";
    // Filter services based on template, keyword, and technology ID
    const filteredServices = services.filter(service => {
        const matchesTemplate = templateArray.length === 0 || templateArray.includes(String(service.id));
        const matchesKeyword = keyword === "" || service?.name?.toLowerCase().includes(keyword);
        const matchesTechnology = technologyArray.length === 0 ||
            service.technologies?.some(tech => technologyArray.includes(String(tech.id)));

        return matchesTemplate && matchesKeyword && matchesTechnology;
    });

    const [form] = Form.useForm()
    const filterOnCheck = (value: any, templates: number[] | string[]) => {
        if (value.target.checked)
            syncObjectToUrl(router, { template: mergeUniqueNumericStrings(router, templates) })
        else {
            syncObjectToUrl(router, { template: filterRouterTemplates(router, templates) })
        }

    }

    const filterTechOnCheck = (value: any, techs: number[] | string[]) => {
        if (value.target.checked)
            syncObjectToUrl(router, { technology: mergeUniqueTechnologies(router, techs) })
        else {
            syncObjectToUrl(router, { technology: filterRouterTechnologies(router, techs) })
        }

    }
    return <>
        <div className="p-2">
            <Card>
                <Layout>
                    <Sider theme="light" collapsed={collapsed} collapsible={true} collapsedWidth={0}
                        breakpoint={"md"}
                        trigger={collapsed ? <FaCaretRight /> : <FaCaretLeft />}

                        onBreakpoint={() => {
                            if (window != undefined)
                                if (window.innerWidth < 800)
                                    setCollapsed(true)
                                else setCollapsed(false)
                        }}
                        className={`${collapsed ? "" : "pe-3"} border-r border-gray-100 `}
                        onCollapse={(cl) => {
                            setCollapsed(cl)
                        }}
                    >

                        <Title level={3} className={collapsed ? "hidden" : ""}>Templates</Title>
                        <div className="overflow-hidden">

                            <Form
                                form={form}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="search"
                                >
                                    <SearchFilter />
                                </Form.Item>
                                <Form.Item
                                    initialValue={containsAll(templateArray, [2])}
                                    name="profile"
                                    valuePropName="checked"
                                >
                                    <Checkbox onChange={(value) => {
                                        filterOnCheck(value, [2])
                                    }}>E-comerge</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    initialValue={containsAll(templateArray, [1, 2, 5])}
                                    name="e-comerge"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        onChange={(value => {
                                            filterOnCheck(value, [1, 2, 5])
                                        })}
                                    >Profile buider</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    name="tool"
                                    initialValue={containsAll(templateArray, [2, 5])}
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        onChange={(value => {
                                            filterOnCheck(value, [2, 5])
                                        })}

                                    >Tools</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    name="platform-buider"
                                    valuePropName="checked"
                                    initialValue={containsAll(templateArray, [3])}
                                >
                                    <Checkbox
                                        onChange={(value => {
                                            filterOnCheck(value, [3])
                                        })}
                                    >Platform builder</Checkbox>
                                </Form.Item>

                            </Form>
                            <Divider orientation='center' />
                            <Form
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="profile"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        onChange={(value) => {
                                            filterTechOnCheck(value, [2, 3])
                                        }}
                                    >Nextjs, Vuejs</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    name="e-comerge"
                                    valuePropName="checked"

                                >
                                    <Checkbox
                                        onChange={(value) => {
                                            filterTechOnCheck(value, [6])
                                        }}

                                    >Spring boot</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    name="tool"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        onChange={(value) => {
                                            filterTechOnCheck(value, [15])
                                        }}

                                    >ASP.NET core</Checkbox>
                                </Form.Item>
                            </Form>
                        </div>
                    </Sider>
                    <Content className="!bg-white px-2">
                        <div className="p-1 font-semibold">
                            Filters
                        </div>
                        <List
                            pagination={{ position: "bottom", align: "center" }}
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 1 + Number(collapsed),
                                md: 3 + Number(collapsed),
                                lg: 4 + Number(collapsed),
                                xl: 4 + Number(collapsed),
                                xxl: 4 + Number(collapsed),
                            }}
                            dataSource={filteredServices}
                            renderItem={(service) => (
                                <List.Item>
                                    <Card hoverable
                                        classNames={{ body: "!p-0", title: "-mx-2" }}
                                        title={service.name}
                                        className="!overflow-hidden"
                                        cover={
                                            <Image width={"100%"} alt="" height={150} preview={false} src={service.image} />
                                        }
                                        actions={[
                                            <Link href={`/solution?category=13&id=${service.id}`} key="1" type="link" className="!font-semibold !text-sky-500">{t('buildnow')}</Link>
                                        ]}
                                    >
                                        <div className="py-2 px-1">
                                            {service.technologies?.map((value) => {
                                                return (
                                                    <Tag key={value.id} className="!border-0">{value.name}</Tag>
                                                )
                                            })}
                                        </div>
                                        <div className="px-2">
                                            <div className="flex justify-between mb-4">
                                                <span className="font-semibold">${service.price}</span>
                                            </div>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Content>
                </Layout>
            </Card>
        </div>
    </>

}

export default Page


