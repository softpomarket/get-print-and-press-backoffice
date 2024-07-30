/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

import { useState } from "react"
import "../footer/css/index.css"
import { BackTop, Col, Image, Row, Tooltip, Input } from "antd"
import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useDimensions } from "../../mamager/ScreenManager"

function Footer() {

    const navigate = useNavigate()
    const { width } = useDimensions()

    return (
        <footer>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#262626",
                    color: "white",
                }}
            >
                <nav
                    style={{
                        paddingTop: 50,
                        paddingBottom: 50,
                        paddingLeft: (width > 1200 ? 0 : 24),
                        paddingRight: (width > 1200 ? 0 : 24),
                        maxWidth: 1200,
                        width: "100%"
                    }}
                >
                    <Row gutter={[0, 24]}>
                        <Col xs={24} md={13} xl={15}>
                            <div style={{ display: width > 430 ? "flex" : "grid" }}>
                                <div style={{ paddingLeft: (width > 430 ? 0 : 24), paddingBottom: (width > 430 ? 0 : 24) }}>
                                    <Image
                                        fallback="./assets/images/logo/logo-wisit-estate.jpg"
                                        src="error"
                                        preview={false}
                                        style={{ width: 150, height: 150, borderRadius: 16 }}
                                    />
                                </div>

                                <div>
                                    <div style={{ paddingLeft: 24, paddingBottom: 6 }}>
                                        <label style={{}}>ติดต่อทีมเช่าหรือฝ่ายขายของเรา</label>
                                    </div>

                                    <div style={{ paddingLeft: 24, paddingBottom: 6 }}>
                                        <label style={{}}>กรุณาโทรหรือส่งอีเมลถึงเรา</label>
                                    </div>

                                    <div style={{ paddingLeft: 24, paddingBottom: 6 }}>
                                        <label style={{}}>Tel: 061-454-5490</label>
                                    </div>

                                    <div style={{ paddingLeft: 24, paddingBottom: 6 }}>
                                        <label style={{}}>Email: isassethome@gmail.com</label>
                                    </div>

                                    <div style={{ paddingLeft: 24 }}>
                                        <label style={{}}>ที่อยู่: 99/26 หมู่ 4 ต.ไทรน้อย อ.ไทรน้อย  นนทบุรี</label>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} md={11} xl={9}>
                            <div style={{ height: '100%', display: "grid", alignItems: "flex-start" }}>
                                <div style={{ display: "grid", alignItems: "center", justifyContent: "flex-start" }}>
                                    <div style={{ paddingLeft: (width > 430 ? 0 : 24), paddingBottom: (width > 430 ? 0 : 12) }}>
                                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61551243572018&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=595238731515893" style={{ border: "none", overflow: "hidden", width: 340, height: 130 }} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                    </div>

                                    <div
                                        style={{ paddingTop: 6, cursor: "pointer" }}
                                        onClick={() => {
                                            window.open("https://line.me/R/ti/p/@377wudef?oat_content=url")
                                        }}
                                    >
                                        <img src="./assets/images/contact/line.png" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </nav>
            </div>
            
            <nav style={{ backgroundColor: "#9D00FF", color: "white", paddingLeft: '5%', paddingRight: '5%', paddingTop: 15, paddingBottom: 15, fontWeight: 600, textAlign: 'center' }}>
                <label>Copyright © 2024  ขายบ้านเช่าบ้าน All Right Reserved.</label>
            </nav>
        </footer>
    )
}

export default Footer
