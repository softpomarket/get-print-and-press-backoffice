import { forwardRef } from "react"
import PropTypes from "prop-types"
import { styled } from '@mui/system'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'

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
            played
        },
        ref
    ) => {
        return (
            <div 
            ref={ref} 
            style={{
                position: 'absolute',
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
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    style={{ flexGrow: 1 }}
                >
                    <Grid container columns={24} spacing={0}>
                        <Grid item xs={24} style={{ paddingLeft: 14, paddingRight: 14 }}>
                            <PrettoSlider
                                min={0}
                                max={100}
                                aria-label="custom thumb label"
                                value={played * 100}
                                onChange={onSeek}
                                onMouseDown={onSeekMouseDown}
                                onChangeCommitted={onSeekMouseUp}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
)

Controls.propTypes = {
    onSeek: PropTypes.func,
    onSeekMouseDown: PropTypes.func,
    onSeekMouseUp: PropTypes.func,
    onPlayPause: PropTypes.func,
    playing: PropTypes.bool,
    played: PropTypes.number,
    elapsedTime: PropTypes.string,
    totalDuration: PropTypes.string,
};
export default Controls;