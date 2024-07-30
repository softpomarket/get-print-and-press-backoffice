import React from 'react'
// import { Breadcrumb } from 'antd';
import { useDimensions } from '../../mamager/ScreenManager';

export default function BreadcrumbPage(props) {
    const { width } = useDimensions()

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: 60,
                backgroundColor: "#262626",
                color: "white",
                paddingLeft: width > 900 ? "10%" : 16,
                paddingRight: width > 900 ? "10%" : 16
            }}
        >
            <div>
                <label style={{ fontSize: 22 }}>{props.pageCurrentName}</label>
            </div>

            <div>
                {/* <Breadcrumb
                    itemColor="white"
                    lastItemColor="white"
                    linkColor="white"
                    linkHoverColor="white"
                    separatorColor="white"

                    items={[
                        {
                            title: 'Home',
                        },
                        {
                            title: <a href="">Application Center</a>,
                        },
                        {
                            title: <a href="">Application List</a>,
                        },
                        {
                            title: 'An Application',
                        },
                    ]}
                /> */}
            </div>
        </div>
    )
}
