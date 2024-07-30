/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import "../banner/css/index.css"

import { storageUrl } from "../../../constants"
import { useEffect, useState } from "react"
import { useDimensions } from "../../mamager/ScreenManager"

export default function Banner(props) {

    const { width } = useDimensions()
    const [imgWidth, setImgWidth] = useState(width * (width > 1500 ? 0.320 : ((width >= 521 && width <= 1500) ? 0.479 : 0.913)))

    useEffect(() => {
        setImgWidth(width * (width > 1500 ? 0.320 : ((width >= 521 && width <= 1500) ? 0.479 : 0.913)))
    }, [width])

    return (
        <div className="banner">
            {props.bannerData?.length > 0 ?
                <Swiper
                    modules={[Pagination, Navigation, Mousewheel, Keyboard, Autoplay]}
                    slidesPerView={(width > 1500 ? 3 : ((width >= 521 && width <= 1500) ? 2 : 1))}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                    keyboard={{ enabled: true }}
                    pagination={{
                        clickable: true
                    }}
                    navigation={true}
                    loop={true}
                    className="mySwiper"
                >
                    {props.bannerData.map((banners, index) =>
                        <SwiperSlide key={index}>
                            <a href={banners.bannerLocation} target="_blank">
                                <img
                                    src={`${storageUrl}/${banners.bannerImage}`}
                                    style={{
                                        maxHeight: 350,
                                        minWidth: 250,
                                        width: imgWidth,
                                        borderRadius: 15,
                                        padding: 6
                                    }}
                                />
                            </a>
                        </SwiperSlide>
                    )}
                </Swiper>
                : []
            }
        </div>
    )
}