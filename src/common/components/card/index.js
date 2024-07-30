/* eslint-disable jsx-a11y/alt-text */
import { serverUrl } from "../../../constants"
import "./css/index.css"
import React from 'react'
import { Button, Col, Image, Row } from 'antd'
import { Icon } from '@iconify/react'
import { useNavigate } from "react-router"

export default function Card(props) {

    const navigate = useNavigate()

    // console.log("props : ", props)

    return (
        <div
            style={{
                // paddingLeft: 12,
                // paddingRight: (props.index % 10) ? 0 : 12,
                // paddingTop: 12,
                // paddingBottom: 12,
                width: props.width,
            }}
        >
            <div className="blog-card">
                {props?.isOnlyimage ?
                    <>
                        <div
                            style={{
                                borderRadius: 8,
                                width: "100%",
                                height: props?.height
                            }}
                            onClick={() => {
                                if (props.pageType === "real-estate") {
                                    navigate("/real-estate-detail?realEstateId=" + props.id)
                                }

                                if (props.pageType === "blog") {
                                    navigate("/blog-detail?blogId=" + props.id)
                                }

                                window.scrollTo(0, 0)
                            }}
                        >
                            {props?.isRent || props?.isSale ?
                                <div class="top-left">
                                    <div style={{ backgroundColor: "#9D00FF", borderRadius: "8px 0px 0px 0px", paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8, width: 50, display: "flex", justifyContent: "center" }}>
                                        <label style={{ color: "white" }}>
                                            {props?.isRent ? "ให้เช่า" : ""}
                                            {props?.isSale ? "ขาย" : ""}
                                        </label>
                                    </div>
                                </div>
                                : []
                            }

                            <div style={{ paddingBottom: 6 }}>
                                <img
                                    // src={`${serverUrl}/${props?.image}`}
                                    src={`${props?.image}`}
                                    style={{ objectFit: "cover", width: "100%", height: 200, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                />
                            </div>

                            <div style={{ height: props?.heightBody }}>
                                <div
                                    style={{
                                        paddingLeft: 12,
                                        paddingRight: 6,
                                        paddingBottom: 10,
                                        fontWeight: 600
                                    }}
                                >
                                    <div className="blog-title">
                                        <label style={{ cursor: "pointer" }}>{props?.name}</label>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        paddingLeft: 12,
                                        paddingRight: 6,
                                        paddingBottom: 8,
                                        fontWeight: 400
                                    }}
                                >
                                    <Row>
                                        {props?.numberOfFloor > 0 ?
                                            <Col span={12}>
                                                <label>{props.numberOfFloor} ชั้น</label>
                                            </Col>
                                            : []
                                        }
                                        {props?.numberOfUsableArea > 0 ?
                                            <Col span={12}>
                                                <label>{props.numberOfUsableArea} ตร.ม.</label>
                                            </Col>
                                            : []
                                        }
                                        {props?.numberOfBedroom > 0 ?
                                            <Col span={12}>
                                                <label>{props.numberOfBedroom} ห้องนอน</label>
                                            </Col>
                                            : []
                                        }
                                        {props?.numberOfParkCar > 0 ?
                                            <Col span={12}>
                                                <label>{props.numberOfParkCar} ที่จอดรถ</label>
                                            </Col>
                                            : []
                                        }
                                        {props?.numberOfBathroom > 0 ?
                                            <Col span={12}>
                                                <label>{props.numberOfBathroom} ห้องน้ำ</label>
                                            </Col>
                                            : []
                                        }
                                    </Row>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingLeft: 12,
                                    paddingRight: 12,
                                    paddingBottom: 12
                                }}
                            >
                                {props?.price ?
                                    <div>
                                        <label style={{ fontSize: 17, fontWeight: 600 }}>{Intl.NumberFormat("en", { maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(Number(props.price))} ฿{props?.isRent ? "/เดือน" : ""}</label>
                                    </div>
                                    : []
                                }

                                <Button
                                    type="primary"
                                    style={{ float: 'right' }}
                                    onClick={() => {
                                        if (props.pageType === "real-estate") {
                                            navigate("/real-estate-detail?realEstateId=" + props.id)
                                        }

                                        if (props.pageType === "blog") {
                                            navigate("/blog-detail?blogId=" + props.id)
                                        }

                                        window.scrollTo(0, 0)
                                    }}
                                >
                                    <label style={{ cursor: "pointer" }}>รายละเอียด</label>
                                </Button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <Image
                            fallback={props?.isOpenBaseApi ? `${serverUrl}/${props?.image}` : `${props?.image}`}
                            src="error"
                            style={{ objectFit: "cover", width: "100%", height: 300, borderRadius: 8, border: "3px solid #9D00FF" }}
                        />
                    </>
                }

            </div>
        </div >
    )
}
