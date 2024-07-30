/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import "../banner/css/index.css"

import { serverUrl, storageUrl } from "../../../constants"
import { useEffect, useState } from "react"
import { useDimensions } from "../../mamager/ScreenManager"
import { Col, Row } from "antd"
import { Icon } from '@iconify/react'
import { useNavigate } from "react-router"

export default function CarouselList(props) {

    const navigate = useNavigate()
    const { width } = useDimensions()

    return (
        <div className="banner">
            {props.data?.length > 0 ?
                <Swiper
                    modules={[Pagination, Navigation, Mousewheel, Keyboard, Autoplay]}
                    slidesPerView={props.data?.length <= 1 ? 1 : (width > 1500 ? 3 : ((width >= 760 && width <= 1500) ? 2 : 1))}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                    keyboard={{ enabled: true }}
                    // pagination={{
                    //     clickable: true
                    // }}
                    navigation={true}
                    loop={true}
                    className="mySwiper"
                >
                    {props.data.map((item, index) =>
                        <SwiperSlide key={index}>
                            <div
                                style={{
                                    width: (width > 1580 ? 500 : ((width > 760 && width < 1580) ? "95%" : "92.2%")),
                                    height: 250,
                                    padding: 24,
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    navigate("/product?productId=" + item.productId)
                                    window.scrollTo(0, 0)
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                        borderRadius: 20,
                                        height: 250,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingLeft: 34,
                                        paddingRight: 34
                                    }}
                                >
                                    <Row gutter={[0, 18]}>
                                        <Col span={24}>
                                            <Icon icon="oi:double-quote-serif-left" style={{ color: "#0099FF", width: 20, height: 20, marginTop: 15 }} />
                                            <label style={{ fontSize: 19, fontWeight: 600, paddingLeft: 10, cursor: "pointer" }}>{item.title}</label>
                                        </Col>

                                        <Col span={24}>
                                            <label style={{ paddingRight: 10, cursor: "pointer" }}>{item.subTitle}</label>
                                            <Icon icon="oi:double-quote-serif-right" style={{ color: "#0099FF", width: 20, height: 20, marginTop: 15 }} />
                                        </Col>
                                    </Row>
                                </div>

                            </div>

                        </SwiperSlide>
                    )}
                </Swiper>
                : []
            }
        </div>
    )
}