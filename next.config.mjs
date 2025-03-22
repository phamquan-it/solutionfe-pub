/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    onDemandEntries: {
        maxInactiveAge: 60 * 1000,
        pagesBufferLength: 4,
    },
    swcMinify: true,

    transpilePackages: [
        "antd",
        "@ant-design",
        "rc-util",
        "rc-pagination",
        "rc-picker",
        "rc-notification",
        "rc-tooltip",
        "rc-tree",
        "rc-table",
    ],
    i18n: {
        locales: ["en", "vi"],
        defaultLocale: "en",
    },
};

export default nextConfig;
