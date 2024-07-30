import { useEffect, useState } from "react"

export default async function ScreenManager() {
    return {}
}

export const useDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return windowDimensions
}

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return { width, height }
}