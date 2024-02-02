import ColorButton from "../colorButton/colorButton.component";
import ColorSlider from '../colorSlider/colorSlider.component';
import CheckBox from "../checkBox/checkBox.component";
import SwitchComponent from "../switch/switch.component";

const PlayPageForm = ({
        startButtonDisabled, 
        currentGameInfo, 
        difficultyChangeHandler, 
        startGameHandler, 
        jsonObject, 
        allowedLocations, 
        locationTypeChangeHandler,
        modeChangeHandler}) => {

    const gameDificultyDescriptions = ["Lehké", "Medium", "Těžké"];
    const gameDificultyColors = ["#035a98", "#039850", "#981903"]; //blue green red

    return (
        <div className="play-page">
            <div className="play-page-form">
                <h2>Lokace:</h2>
                {jsonObject.location_types.map(
                    (value, index) => {
                        return(<CheckBox 
                            index={index}
                            key={value}
                            changeHandler={locationTypeChangeHandler} 
                            label={value} 
                            checked={allowedLocations[index]}
                        />)}
                )}
                <span className="inline-content mode-switch">
                    <h2 className="no-margin">Režim učení:</h2>
                    <SwitchComponent checked={currentGameInfo.learningMode} changeHandler={modeChangeHandler}/>
                    </span>
                <h2>Obtížnost:</h2>
                <div className="side-by-side difficulty-slider-container">
                    <ColorSlider 
                        min='0' 
                        max='2' 
                        value={currentGameInfo.difficulty} 
                        changeHandler={difficultyChangeHandler} 
                        color={gameDificultyColors[currentGameInfo.difficulty]}
                        />
                    <h3 className="no-margin">{gameDificultyDescriptions[currentGameInfo.difficulty]}</h3>
                </div>
                <ColorButton click={startButtonDisabled?()=>{alert('no locations selected')}:startGameHandler} color={startButtonDisabled?'gray':'secondary'}>Start</ColorButton>
            </div>
        </div>
    );
}

export default PlayPageForm;