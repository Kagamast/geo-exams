import './playPageSideColumn.style.scss'
import ColorButton from '../colorButton/colorButton.component';
import ProgressBar from '../progressBar/progressBar.component';

const PlayPageSideColumn = ({jsonObject, locationName, locationIndex, color, locationType, portionFinishedPercent, portionCorrectPercent}) => {
    return(
        <div className="play-page-side-info-column">
            <h2>Najdi:</h2>
            <h3>{locationType}</h3>
            <ColorButton color={color} afterColor={jsonObject.location_colors? jsonObject.location_colors[locationIndex - 1] : null}>{locationName}</ColorButton>
            <h2>Hotovo: {portionFinishedPercent}%</h2>
            <ProgressBar percent={portionFinishedPercent} color="primary"/>
            <h2>Správně: {portionCorrectPercent}%</h2>
            <ProgressBar percent={portionCorrectPercent} color="secondary"/>
        </div>
    )
}

export default PlayPageSideColumn;