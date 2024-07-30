import ReactPlayer from 'react-player'
import { serverUrl } from '../../../constants'

export default function Video(props) {
    return (
        <div style={{ backgroundColor: "black" }}>
            <ReactPlayer
                config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                onContextMenu={e => e.preventDefault()}
                url={`${serverUrl}/${props.url}`}
                controls
                playing
                width={props?.width ? props?.width : "100%"}
                height={props?.height ? props?.height : "100%"}
            />

            {props?.title ?
                <div style={{ paddingLeft: 12, paddingRight: 12, paddingBottom: 12, paddingTop: 12, color: "white", borderBottom: "1px solid #5A5A5A" }}>
                    <label>{props?.title}</label>
                </div>
                : []
            }
        </div>
    )
}