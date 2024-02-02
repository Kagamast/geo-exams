import './pointOnMap.style.scss'
import {ReactComponent as MapPointSvg} from '../../assets/images/icons/mapPoint.svg'

const PointOnMap = ({x, y, classNames, pointColor, leaving}) => {
    return(
        <div className={`map-point-wrapper ${classNames} ${leaving? "popping-out" : ""}`} style={{ left: x + "px", top: y + "px", color: pointColor}}>
            <MapPointSvg/>
        </div>
    )
}

export default PointOnMap