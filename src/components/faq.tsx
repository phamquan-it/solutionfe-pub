import { Collapse, CollapseProps, ConfigProvider } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

interface FAQ {
    id: number;
    question: string;
    answer: string;
    question_vi?: string;
    answer_vi?: string;
}

interface FAQsProps {
    faqs: FAQ[];
}

const FAQ: React.FC<FAQsProps> = ({ faqs }) => {
    const { locale } = useRouter();

    const items: CollapseProps['items'] = faqs?.slice(0, 3).map((faq) => ({
        key: String(faq.id),
        label: locale === 'vi' ? faq.question_vi || faq.question : faq.question,
        children: <p>{locale === 'vi' ? faq.answer_vi || faq.answer : faq.answer}</p>,
    }));

    return (
        <ConfigProvider>
            <Collapse accordion items={items} defaultActiveKey={['1']} className="!border-0 !bg-transparent lg:m-auto" />
        </ConfigProvider>
    );
};

export default FAQ;

