import PieChart from '../pieChart/pieChart.component';
import ColorButton from '../colorButton/colorButton.component';


const PlayPageWinScreen = ({numberOfCorrect, numberOfIncorrect, rapeatUnsuccessfulLocations, goHome, loadGameInfo}) => {
    const gameWinColors = ["#039850", "#ffce2c", "#ff792c"] //green yellow orange
    const winPercentage = Math.round(100 * numberOfCorrect / (numberOfCorrect + numberOfIncorrect))
    return(
        <div className="play-page">
            <div className={`play-page-form slide-in-animate win-screen ${winPercentage > 80? "great-success" : ""}`}>
                <PieChart percentage={winPercentage} colorGradient={gameWinColors}/>
                <h2>Správně: {`${numberOfCorrect}/${numberOfCorrect + numberOfIncorrect}`}</h2>

                <div className="side-by-side">
                    <ColorButton color="blue" click={loadGameInfo}>Znovu</ColorButton>
                    {numberOfIncorrect === 0? 
                        <ColorButton color="green" click={goHome}>Domů</ColorButton>:
                        <ColorButton color="green" click={rapeatUnsuccessfulLocations}>Chyby</ColorButton>
                    }
                </div>
            </div>
        </div>
    )
}

export default PlayPageWinScreen;