import en from './src/messages/en.json';

type Messages = typeof en;
export {
    Messages
}
declare global {
    // Use type safe message keys with `next-intl`
    interface IntlMessages extends Messages { }
}
