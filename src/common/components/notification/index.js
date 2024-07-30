import { notification } from "antd";

// openNotification
export const Notification = (type, title, description) => {
    notification[type]({
        message: title,
        description: description,
        index: "5000",
        placement: "bottomRight",
        // onClick: () => console.log("Notification Clicked!")
    });
};