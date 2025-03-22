// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
    token: {
        fontSize: 14,
    },
    components: {
        Layout: {
            headerPadding: 10,
            headerBg: 'white',
            footerPadding: "20px 20px"

        },
    }
};

export default theme;
