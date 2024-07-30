/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { Row, Col, Pagination, Button } from 'antd'
import { Icon } from '@iconify/react'
import { useDimensions } from '../../mamager/ScreenManager'
import Card from '../card'
import LoadingPage from '../loading/page'

export default function Gallery(props) {

    const [gallery, setGallery] = useState([])
    const [loading, setLoading] = useState(false)

    const { width } = useDimensions()

    const size = 12

    const [page, setPage] = useState({
        minValue: 0,
        maxValue: size
    })

    const handleChange = value => {
        if (value <= 1) {
            setPage({
                minValue: 0,
                maxValue: size
            });
        } else {
            setPage({
                minValue: (value - 1) * size,
                maxValue: value * size
            })
        }
    }

    useEffect(() => {
        setGallery(props?.data)
    }, [props?.data])

    useEffect(() => {
        setLoading(props?.loading)
    }, [props?.loading])

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: props?.backgroundColor
            }}
        >
            <div
                style={{
                    paddingTop: 68,
                    paddingBottom: 68,
                    paddingLeft: 12,
                    paddingRight: 12,
                    maxWidth: 1200,
                    width: 1200
                }}
            >
                <Row>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <label style={{ fontSize: 26 }}>{props?.typeName}</label>
                    </Col>
                    <Col span={24}>
                        <div style={{ paddingTop: 24, paddingBottom: 0 }}>
                            <Row>
                                {!loading ?
                                    <>
                                        <Col span={24}>
                                            <Row gutter={[12, 12]}>
                                                {gallery
                                                    ?.slice(page.minValue, page.maxValue)
                                                    ?.map((item, index) => {
                                                        return (
                                                            <Col xs={24} sm={12} md={12} lg={8}>
                                                                <Card
                                                                    key={index}
                                                                    index={index + 1}
                                                                    id={item?.id}
                                                                    image={item?.image}

                                                                    isPaddingLeft={true}
                                                                    isPaddingRight={true}
                                                                    isPaddingTop={true}
                                                                    isOnlyimage={false}
                                                                    isOpenBaseApi={props?.isOpenBaseApi}
                                                                />
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </Col>

                                        <Col span={24} style={{ paddingTop: gallery?.length > 12 ? 12 : 0, paddingBottom: 12, display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                            {gallery?.length > size ?
                                                <center>
                                                    <Pagination
                                                        defaultCurrent={1}
                                                        defaultPageSize={size}
                                                        onChange={handleChange}
                                                        total={gallery?.length ?? 0}
                                                    />
                                                </center>
                                                : []
                                            }
                                        </Col>
                                    </>
                                    :
                                    <Col span={24}>
                                        <LoadingPage loading={loading} />
                                    </Col>
                                }

                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
