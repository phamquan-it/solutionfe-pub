import { Button, Card, Form, FormProps, Input, Image, Divider, message } from "antd";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useLoginMutation } from "@/libs/redux/api/authApi";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/libs/redux/slices/authSlice";
import withGuest from "@/utils/withGuest";
import { RootState } from "@/libs/redux/store";
import { useEffect } from "react";
import { setUser } from "@/libs/redux/slices/userSlice";

const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (token) {
            router.push("/"); // Redirect to home if logged in
        }
    }, [token, router]);
    const [login, { data, isLoading, isError }] = useLoginMutation()
    const onFinish: FormProps<LoginType>['onFinish'] = (values) => {
        login(values).then((data) => {
            const token = data.data?.token
            if (token) {
                const roles = data.data?.user.roles ?? []
                        dispatch(setUser(userData));
                dispatch(setToken(token as string));
                messageApi.success("login success");
                router.push("/")
            } else
                messageApi.error("login error")
        })
    };

    const onFinishFailed: FormProps<LoginType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const t = useTranslations('Auth');
    return (
        <>
            {contextHolder}
            <div className="h-full flex items-center justify-center">
                <Card className="shadow-sm w-full h-auto md:w-auto md:h-auto">
                    <div className="flex justify-center">
                        <Image width={200} src="/logo-text.png" alt={""} preview={false}
                            onClick={() => {
                                router.push('/', '', { locale: router.locale })
                            }}
                        />
                    </div>
                    <Divider orientation='center' />
                    <div className="grid ">
                        <Form
                            layout="vertical"
                            name="login"
                            className="w-full md:w-normalForm md:m-auto"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<LoginType>
                                label={t('email')}
                                name="email"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<LoginType>
                                label={t('password')}
                                name="password"
                                rules={[{ required: true }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block loading={isLoading}>
                                    {t('login')}
                                </Button>
                            </Form.Item>
                            <p>{t('donthaveanaccount')}&nbsp;
                                <Link href={"/register"}>{t('register')}</Link>
                            </p>
                        </Form>
                    </div>
                </Card>
            </div>
        </>
    );
}
export default Page;
