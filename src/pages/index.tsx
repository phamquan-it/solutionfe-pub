import { Button, Card, Row, Col, List, Space, Steps, FloatButton, Dropdown } from "antd";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import { CgBrowser } from "react-icons/cg";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { RateState } from "@/components/post/icon-text"
import gsap from "gsap";
import Title from "antd/es/typography/Title";
import FAQ from "@/components/faq";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { CustomerServiceOutlined, DesktopOutlined, LikeFilled, LikeOutlined, MessageFilled, MessageOutlined, MobileOutlined, PhoneOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { MdOutlineLightbulb } from "react-icons/md";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import IconText from "@/components/post/icon-text";
import CommentButton from "@/components/post/comment-btn";

// Disable server-side rendering if ScrollReveal relies on the browser environm);

export default function Home({ faqs, posts }: { faqs: FAQ[], posts: Post[] }) {
    const t = useTranslations('Index');
    const s = useTranslations('CreateSolutionSteps');
    const container = useRef<HTMLDivElement | null>(null);
    const p = useTranslations("Posts")

    const router = useRouter();
    const locale = router.locale || 'en'; // Default to 'en' if locale is not set

    const [current, setCurrent] = useState(1)
    return (
        <>
            <div className="px-2 relative">

                <FloatButton
                    shape="circle"
                    className="hover:!text-white shadow-lg hover:bg-green-500"
                    icon={
                        <motion.div
                            animate={{
                                rotate: [0, -30, 10, -30, 10, 0], // 
                                transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
                            }}
                            onClick={() => window.location.href = `tel:${'0328837820'}`}
                        >
                            <PhoneOutlined />
                        </motion.div>
                    }
                />
                <div className="py-2 grid md:grid-cols-3 gap-2">
                    <Card hoverable>
                        <Button type="link" className="text-lg" href="/solution?platform=desktop">
                            <DesktopOutlined />
                            Desktop</Button>
                        <p className="text-slate-70">
                            {t('sortdescdesktop')}
                            <Link href={"/solution?platform=desktop"}> {t('viewmore')}</Link>
                        </p>
                    </Card>
                    <Card hoverable>
                        <Button type="link" className="text-lg" href="/solution?platform=mobile">
                            <MobileOutlined />
                            Mobile</Button>
                        <p className="text-slate-700">
                            {t('sortdescmobile')}
                            <Link href={"/solution?platform=mobile"}> {t('viewmore')}</Link>
                        </p>
                    </Card>
                    <Card hoverable>
                        <Button type="link" className="text-lg" href="/solution?platform=web">
                            <CgBrowser />
                            Web</Button>
                        <p className="text-slate-700">
                            {t('sortdescweb')}
                            <Link href={"/solution?platform=web"}> {t('viewmore')}</Link>
                        </p>
                    </Card>
                </div>
                <Row gutter={8}>
                    <Col xs={24} lg={15}>
                        <Card className="!mb-2"
                            classNames={{ body: "!p-0" }}
                        >
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={posts}
                                footer={
                                    <div className="ps-7">
                                        <b>solution</b> {t('posts')}
                                    </div>
                                }
                                renderItem={(item: Post) => (
                                    <List.Item
                                        key={item.title}
                                        actions={[
                                            <IconText type={RateState.STAR}
                                                icon={[StarOutlined, StarFilled]}
                                                text={`${item?.star_count}`}
                                                key="list-vertical-star-o"
                                                post={item}
                                            />,
                                            <IconText type={RateState.LIKE}
                                                icon={[LikeOutlined, LikeFilled]} text={`${item?.like_count}`} key="list-vertical-like-o" post={item} />,
                                            <CommentButton post={item} key={item.id+''} />
                                        ]}
                                        extra={
                                            <div className="bg-slate-100 rounded overflow-hidden">
                                                <img
                                                    width={272}
                                                    alt="logo"
                                                    src={item.image}
                                                />
                                            </div>
                                        }
                                    >
                                        <List.Item.Meta
                                            title={<a href={item.title} className="">{
                                                <div className="flex">
                                                    <MdOutlineLightbulb className="translate-y-0.5" /> {locale == 'vi' ? item.title_vi : item.title}
                                                </div>
                                            }</a>}
                                        />
                                        {locale == "vi" ? item.description_vi : item.description}
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} lg={9}>
                        <div className="h-full relative pb-2">
                            <Card
                                className="sticky1"
                            >
                                <Title level={5} className="pb-2">{t('workflow')}</Title>
                                <Steps
                                    direction="vertical"
                                    current={current}
                                    onChange={(current) => {
                                        setCurrent(current)
                                    }}
                                    items={[
                                        {
                                            title: s('receiveproject'),
                                            description: s('receiveprojectdesc'),
                                        },
                                        {
                                            title: s('vertify'),
                                            description: s('vertifydesc'),
                                        },
                                        {
                                            title: s('processingrequest'),
                                            description: s('processingrequestdesc'),
                                        },
                                        {
                                            title: s('complete'),
                                            description: s('completedesc'),
                                        },

                                    ]}
                                />
                            </Card>

                        </div>
                    </Col>
                </Row>

                <div className="mb-2 gap-2">
                    <Card>
                        <Title level={3} className="text-center">{t("faq")}</Title>
                        <FAQ faqs={faqs} />
                    </Card>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/faqs/all`);
    const faqs = await res.json();
    const postRes = await fetch(`${baseUrl}/posts/all`);
    const posts = await postRes.json();
    return {
        props: {
            faqs,
            posts, // Add posts data to props
        },
        revalidate: 60, // Regenerate every 60 seconds
    };
}
