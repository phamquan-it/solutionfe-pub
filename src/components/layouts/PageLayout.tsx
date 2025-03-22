import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
};

export default function PageLayout({ children }: Props) {
    const t = useTranslations('PageLayout');

    return (
        <div className="h-screen">
            {children}
        </div>
    );
}
