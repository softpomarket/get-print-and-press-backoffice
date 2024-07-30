/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Col, Row } from 'antd'
import { useRef, useState, useEffect } from 'react'
import ReactPlayer from "react-player"
import { storageUrl } from '../../../../../constants'
import Controls from './Controls'

import { styled } from '@mui/system'

const useStyles = styled((theme) => ({
    playerWrapper: {
        width: "100%",
        position: "relative"
    }
}))

const format = (seconds) => {
    if (isNaN(seconds)) {
        return `00:00`
    }
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, "0")
    if (hh) {
        return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
    }
    return `${mm}:${ss}`
}

export default function CoverImage(props) {

    const playerRef = useRef(null)
    const controlsRef = useRef(null)
    const canvasRef = useRef(null)

    const classes = useStyles()

    const [state, setState] = useState({
        playing: true,
        played: 0
    })

    const {
        playing,
        played
    } = state

    const [elapsedTime, setElapsedTime] = useState("00:00")
    const [totalDuration, setTotalDuration] = useState("00:00")

    const handlePlayPause = () => {
        setState({ ...state, playing: !state.playing })
    }

    const handleSeekChange = (e, newValue) => {
        setState({ ...state, played: parseFloat(newValue / 100) })
    }

    const handleSeekMouseDown = (e) => {
        setState({ ...state, seeking: true })
    }

    const handleSeekMouseUp = (e, newValue) => {
        setState({ ...state, seeking: true })
        playerRef.current.seekTo(newValue / 100, "fraction")
    }

    const onCapture = () => {
        const canvas = canvasRef.current
        canvas.width = 423
        canvas.height = 239
        const ctx = canvas.getContext("2d")

        ctx.drawImage(playerRef.current.getInternalPlayer(), 0, 0, canvas.width, canvas.height)
        const dataUri = canvas.toDataURL();
        canvas.width = 0;
        canvas.height = 0
        props.handleCaptureCoverImage(dataUri)
    }

    useEffect(() => {
        setElapsedTime(format(playerRef && playerRef.current ? playerRef.current.getCurrentTime() : "00:00"))
        setTotalDuration(props.duration.displayTimeVideo ? props.duration.displayTimeVideo : "00:00")
    }, [elapsedTime, state, totalDuration])

    return (
        <>
            <Col span={24} style={{ height: 0, display: 'none' }}>
                <canvas ref={canvasRef} />
            </Col>
            <div
                className={classes.playerWrapper}
            >
                <Row gutter={[0, 8]}>
                    <Col span={24} style={{ backgroundColor: "black" }}>
                        <ReactPlayer
                            ref={playerRef}
                            width={480}
                            height={250}
                            url={`${storageUrl}/stream/${props.videoUrl}`}
                            config={{
                                file: {
                                    attributes: {
                                        crossOrigin: "anonymous"
                                    }
                                }
                            }}
                        />

                        <Controls
                            ref={controlsRef}
                            onSeek={handleSeekChange}
                            onSeekMouseDown={handleSeekMouseDown}
                            onSeekMouseUp={handleSeekMouseUp}
                            onPlayPause={handlePlayPause}
                            playing={playing}
                            played={played}
                            elapsedTime={elapsedTime}
                            totalDuration={totalDuration}
                        />
                    </Col>
                    <Col span={24}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <label>ช่วงเวลา {elapsedTime} / {totalDuration}</label>
                            <Button
                                key="delete"
                                type="primary"
                                style={{ width: 110, float: "right" }}
                                onClick={() => onCapture()}
                            >
                                เลือก
                            </Button>
                        </div>

                    </Col>
                </Row>
            </div>
        </>
    )
}
