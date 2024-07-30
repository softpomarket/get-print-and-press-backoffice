/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import FastRewindIcon from "@material-ui/icons/FastRewind"
import FastForwardIcon from "@material-ui/icons/FastForward"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'
import VolumeUp from "@material-ui/icons/VolumeUp"
import VolumeDown from "@material-ui/icons/VolumeDown"
import VolumeMute from "@material-ui/icons/VolumeOff"
import FullScreen from "@material-ui/icons/Fullscreen"
import Popover from '@mui/material/Popover'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useDimensions } from "../../mamager/ScreenManager"
import { Image } from "antd"

const useStyles = styled(({ theme }) => ({
    controlsWrapper: {
        visibility: "hidden",
        // position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    button: {
        margin: theme.spacing(1)
    },
    controlIcons: {
        color: "#777",

        fontSize: 40,
        transform: "scale(0.9)",
        "&:hover": {
            color: "#fff",
            transform: "scale(1)"
        }
    },
    bottomIcons: {
        color: "#999",
        width: 12,
        marginLeft: 5,
        "&:hover": {
            color: "#fff",
        }
    },
    bottomIcons2: {
        color: "#999",
        width: 12,
        "&:hover": { color: "#fff" }
    },
    bottomSpeed: {
        color: "white",
        "&:hover": { background: "black" }
    },
    volumeSlider: {
        width: 60,
        color: "#23B14D",
        marginLeft: 8
    }
}))

const WhiteIconButton = styled(IconButton)({
    color: 'white'
})

const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 4,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        paddingLeft: 6,
        paddingRight: 6,
        height: 32,
        borderRadius: '10% 10% 10% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
    },
})

const Controls = forwardRef(
    (
        {
            onSeek,
            onSeekMouseDown,
            onSeekMouseUp,
            onRewind,
            onPlayPause,
            onFastForward,
            playing,
            played,
            elapsedTime,
            totalDuration,
            onMute,
            muted,
            onVolumeSeekDown,
            playbackRate,
            onPlaybackRateChange,
            onToggleFullScreen,
            volume,
            onVolumeChange,
            videoTitle,
            loading,
            isControlActive,
            isFullScreen
        },
        ref
    ) => {
        const classes = useStyles()
        const [anchorEl, setAnchorEl] = useState(null)
        const open = Boolean(anchorEl)
        const id = open ? "simple-popover" : undefined
        const { width } = useDimensions()

        const [isVolumeActive, setIsVolumeActive] = useState(false)

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget)
        }


        const controlIconSize = () => {
            return width >= 410 ? "default" : "small"
        }

        const handleClose = () => {
            setAnchorEl(null)
        }

        useEffect(() => {
            if (isControlActive === "hidden") {
                setIsVolumeActive(false)
            }
        }, [isControlActive, isVolumeActive])

        useEffect(() => {

        }, [isFullScreen])

        useEffect(() => {

        }, [isFullScreen])

        return (
            <>
                <div
                    ref={ref}
                    style={{
                        // position: 'absolute',
                        top: 'auto',
                        bottom: 0,
                        // height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        visibility: "visible"
                    }}
                >
                    <Grid container columns={24} spacing={0}>
                        <Grid item xs={24} style={{ paddingLeft: 14, paddingRight: 14 }}>
                            <PrettoSlider
                                min={0}
                                max={100}
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                valueLabelFormat={() => `${elapsedTime}`}
                                value={played * 100}
                                onChange={onSeek}
                                onMouseDown={onSeekMouseDown}
                                onChangeCommitted={onSeekMouseUp}
                            />
                        </Grid>

                        <Grid item xs={24} style={{ paddingLeft: 6, paddingBottom: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <WhiteIconButton onClick={onRewind} className={classes.controlIcons} aria-label="rewind">
                                    <FastRewindIcon className={classes.controlIcons} fontSize={controlIconSize()} />
                                </WhiteIconButton>

                                <WhiteIconButton
                                    onClick={onPlayPause}
                                    className={classes.bottomIcons2}
                                >
                                    {playing ?
                                        <PauseIcon fontSize={controlIconSize()} />
                                        :
                                        <PlayArrowIcon fontSize={controlIconSize()} />
                                    }
                                </WhiteIconButton>

                                <WhiteIconButton onClick={onFastForward} className={classes.controlIcons} aria-label="forward">
                                    <FastForwardIcon fontSize={controlIconSize()} />
                                </WhiteIconButton>

                                <WhiteIconButton
                                    onClick={() => {
                                        setIsVolumeActive(true)
                                        onMute()
                                    }}
                                    className={`${classes.bottomIcons} ${classes.volumeButton}`}
                                    onMouseOut={(e) => {
                                        if (e.nativeEvent.layerY < 10) {
                                            setIsVolumeActive(true)
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (e.nativeEvent.layerY > 100) {
                                            setIsVolumeActive(false)
                                        }
                                    }}
                                >
                                    {muted ?
                                        <VolumeMute fontSize={controlIconSize()} onMouseOut={(e) => setIsVolumeActive(true)} onMouseLeave={(e) => setIsVolumeActive(false)} />
                                        :
                                        (volume > 0.5 ?
                                            <VolumeUp fontSize={controlIconSize()} onMouseOut={(e) => setIsVolumeActive(true)} onMouseLeave={(e) => setIsVolumeActive(false)} />
                                            :
                                            <VolumeDown fontSize={controlIconSize()} onMouseOut={(e) => setIsVolumeActive(true)} onMouseLeave={(e) => setIsVolumeActive(false)} />
                                        )
                                    }
                                </WhiteIconButton>

                                {isVolumeActive ?
                                    <div
                                        style={{
                                            // position: "absolute",
                                            marginTop: -160,
                                            marginLeft: 121,
                                            height: 100,
                                            background: "rgba(0,0,0,0.6)",
                                            paddingTop: 12,
                                            paddingBottom: 12,
                                            borderRadius: 10
                                        }}
                                    >
                                        <Slider
                                            min={0}
                                            max={100}
                                            value={muted ? 0 : volume * 100}
                                            onChange={onVolumeChange}
                                            aria-label="Default"
                                            className={classes.volumeSlider}
                                            onMouseDown={onSeekMouseDown}
                                            onChangeCommitted={onVolumeSeekDown}
                                            style={{ width: 10 }}
                                            orientation="vertical"
                                            onMouseOut={(e) => setIsVolumeActive(true)}
                                            onMouseLeave={(e) => setIsVolumeActive(false)}
                                        />
                                    </div>
                                    : []
                                }

                                <Typography variant="body1" style={{ color: "#fff", marginLeft: 8, fontSize: 14 }}>
                                    {elapsedTime}/{totalDuration}
                                </Typography>
                            </div>
                        </Grid>

                        {/* <Grid item xs={12} style={{ paddingRight: 6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Button
                                    onClick={handleClick}
                                    aria-describedby={id}
                                    // className={classes.bottomIconsSpeed}
                                    style={{ minWidth: 10 }}
                                    variant="text"
                                >
                                    <Typography style={{ fontSize: 14 }}>
                                        {playbackRate === 1 ? "ปกติ" : <>{playbackRate}X</>}
                                    </Typography>
                                </Button>

                                <Popover
                                    container={ref.current}
                                    open={open}
                                    id={id}
                                    onClose={handleClose}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "left"
                                    }}
                                    transformOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left"
                                    }}
                                    style={{
                                        borderRadius: 10,
                                        float: 'right'
                                    }}
                                >
                                    <Grid
                                        container
                                        direction="column-reverse"
                                        style={{
                                            background: "rgb(25, 25, 25)",
                                            border: "3px solid rgb(25, 25, 25)",
                                            color: "white"
                                        }}
                                    >
                                        {[0.25, 0.5, 1, 1.5, 1.75, 2].map((rate) => (
                                            <Button
                                                key={rate}
                                                onClick={() => {
                                                    onPlaybackRateChange(rate);
                                                    handleClose();
                                                }}
                                                className={classes.bottomSpeed}
                                                variant="text"
                                            >
                                                <Typography style={{ fontSize: 14 }} color={rate === playbackRate ? "white" : "inherit"}>{rate === 1 ? "ปกติ" : <>{rate}</>}</Typography>
                                            </Button>
                                        ))}

                                    </Grid>
                                </Popover>
                                <WhiteIconButton
                                    onClick={onToggleFullScreen}
                                    className={classes.bottomIcons2}
                                >
                                    <FullScreen fontSize={controlIconSize()} />
                                </WhiteIconButton>
                            </div>
                        </Grid> */}
                    </Grid>
                </div>

                {/* {loading ?
                    <div
                        style={{
                            // position: 'absolute',
                            top: '42%',
                            left: 0,
                            right: 0,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            style={{ flexGrow: 1 }}
                        >
                            <Grid container direction="row" style={{ justifyContent: 'center' }}>
                                <center>
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress style={{ width: 80, height: 80, color: '#23B14D', marginTop: 0 }} />
                                    </Box>
                                </center>
                            </Grid>
                        </Grid>
                    </div>
                    : []
                } */}
            </>
        )
    }
)

Controls.propTypes = {
    onSeek: PropTypes.func,
    onSeekMouseDown: PropTypes.func,
    onSeekMouseUp: PropTypes.func,
    onRewind: PropTypes.func,
    onPlayPause: PropTypes.func,
    onFastForward: PropTypes.func,
    onVolumeSeekDown: PropTypes.func,
    onChangeDispayFormat: PropTypes.func,
    onPlaybackRateChange: PropTypes.func,
    onToggleFullScreen: PropTypes.func,
    onMute: PropTypes.func,
    playing: PropTypes.bool,
    played: PropTypes.number,
    elapsedTime: PropTypes.string,
    totalDuration: PropTypes.string,
    muted: PropTypes.bool,
    playbackRate: PropTypes.number,
    isFullScreen: PropTypes.bool,
}

export default Controls