import { message } from 'antd';

export const toast = (type, msg, duration = 3) => {
    if (type === "error") {
        message.error(msg, [duration]);
    } else if (type === "success") {
        message.success(msg);
    } else {
        message.info(msg);
    }
};
