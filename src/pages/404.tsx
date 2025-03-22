import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import React from 'react';
const Page: React.FC = () => {
    return <>
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
            <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Go Home
            </Link>
        </div>
    </>
}

export default Page
