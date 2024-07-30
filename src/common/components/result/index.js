/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button, Layout, Result, Card } from 'antd'
import Header from "../header"
import Footer from "../footer"
import { useDimensions } from "../../mamager/ScreenManager"

const { Content } = Layout

export default function Results(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const { width } = useDimensions()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setLoading(true)

        setData(location.state)

        setLoading(false)
    }, [])

    return (
        <>
            {!loading ?
                <>
                    <Header/>

                    <article>
                        <Content>
                            <div
                                style={
                                    width > 1500 ?
                                        { backgroundColor: "white", marginLeft: '5%', marginRight: '5%', paddingTop: '1%', paddingBottom: '1%' }
                                        :
                                        (
                                            (width > 912 && width <= 1500) ?
                                                { backgroundColor: "white", marginLeft: '5%', marginRight: '5%', paddingTop: '1%', paddingBottom: '1%' }
                                                :
                                                { backgroundColor: "white", marginLeft: '0%', marginRight: '0%', paddingTop: '0%', paddingBottom: '0%' }
                                        )
                                }
                            >
                                <Card bordered={true}>

                                    <Result
                                        status={data?.type}
                                        title={data?.title}
                                        subTitle={data?.subTitle}
                                        extra={[
                                            <>
                                                {data?.btnIsActive1 ?
                                                    <Button
                                                        type="primary"
                                                        style={{ width: data?.btnWidth }}
                                                        onClick={() =>
                                                            navigate("/" + data?.btnPathName1)
                                                        }
                                                    >{data?.btnName1}</Button>
                                                    : []}

                                                {data?.btnIsActive2 ?
                                                    <Button
                                                        type="primary"
                                                        style={{ width: data?.btnWidth }}
                                                        onClick={() =>
                                                            navigate("/" + data?.btnPathName2)
                                                        }
                                                    >{data?.btnName2}</Button>
                                                    : []}
                                            </>,
                                        ]}
                                    />
                                </Card>
                            </div>
                        </Content>
                    </article>

                    <Footer />
                </>
                : []
            }
        </>
    )
}