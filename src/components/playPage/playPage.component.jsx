import './playPage.style.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PlayPageSideColumn from '../playPageSideColumn/playPageSideColumn.component';
import PointOnMap from '../pointOnMap/pointOnMap.component';
import PlayPageWinScreen from '../playPageWinScreen/playPageWinScreen.component';
import PlayPageForm from '../playPageForm/playPageForm.component';

const PlayPage = () => {
    const defaultCurrentGameInfo = {
        started: false,
        difficulty: 0,
        accuracyColor: "yellow",
        numberOfCorrect: 0,
        numberOfIncorrect: 0,
        activity: "guessing", //"guessing", "waiting", "learning"
        correctLocationVisbility: 0, //[hidden, dissapearing, visible]
        learningMode: false,
    }

    const [currentGameInfo, setCurrentGameInfo] = useState(defaultCurrentGameInfo);
    const [backgroundMapImage, setBackgroundMapImage] = useState(null);
    const [jsonObject, setJsonObject] = useState(null);
    const [locationsArray, setLocationsArray] = useState([]);
    const [failedLocationsArray, setFailedLocationsArray] = useState([]);
    const [allowedLocationTypes, setAllowedLocationTypes] = useState([]);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const updateEnabledLocations = () => {
        if(jsonObject){
            const newLocationsArray = jsonObject.locations
            .filter(value => value.difficulty <= parseInt(currentGameInfo.difficulty) + 1)
            .filter(value => allowedLocationTypes[value.location_type -1])
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            setLocationsArray(newLocationsArray)
        }
    }
    useEffect(updateEnabledLocations, [allowedLocationTypes, currentGameInfo.difficulty])
    
    const loadGameInfo = async (starting) => {
        try {
            const gameJsonObjectModule = await import(`../../assets/examMap${location.pathname}/baseInfo.json`);
            let backgroudMapImageModule = "error"
            try {
                backgroudMapImageModule = await import(`../../assets/examMap${location.pathname}/background-map.svg`);
            } catch {
                backgroudMapImageModule = await import(`../../assets/examMap${location.pathname}/background-map.png`);

            }
            
            setCurrentGameInfo({
                ...currentGameInfo,
                started: false,
                numberOfCorrect: 0,
                numberOfIncorrect: 0,
            })
            setBackgroundMapImage(backgroudMapImageModule.default);
            setJsonObject(gameJsonObjectModule.default);
            setFailedLocationsArray([]);
            if(starting === true){
                setAllowedLocationTypes(gameJsonObjectModule.location_types.map(() => (true)))
            }
            updateEnabledLocations()
            } catch (error) {
                console.error("Failed to load the game info", error);
                navigate("../page-not-found");
        }
    };

    useEffect(() => {        
        loadGameInfo(true);
    }, [location.pathname]);

    const clickOnMapHandler = (event) => {
        if(currentGameInfo.activity === "guessing"){const {offsetX, offsetY} = event.nativeEvent
            var d=document.createElement("div");
            d.className="clickEffect";
            d.style.top=event.clientY+"px";d.style.left=event.clientX+"px";
            document.body.appendChild(d);
            d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
            const clickAccurate = detectIfClickWasCorrect(offsetX, offsetY)
            if(clickAccurate){
                setCurrentGameInfo(
                    {
                        ...currentGameInfo,
                        accuracyColor: gameAccuracyColors[0],
                        activity: "waiting"       
                    }
                )
                setTimeout(()=>{moveToNextLocation(true)}, 1000)
            }else{
                setFailedLocationsArray([...failedLocationsArray, locationsArray[0]]);
                setCurrentGameInfo({
                    ...currentGameInfo,
                    accuracyColor: gameAccuracyColors[2],
                    activity: "learning",
                    correctLocationVisbility: 2,
                })


                setTimeout(()=>{
                    document.addEventListener("keydown", moveOnAfterMemorized)
                    document.addEventListener("click", moveOnAfterMemorized)
                }, 1000)
            }
        }
    };
    
    const moveOnAfterMemorized = () => {
        document.removeEventListener("keydown", moveOnAfterMemorized)
        document.removeEventListener("click", moveOnAfterMemorized)
        setCurrentGameInfo(
            {
                ...currentGameInfo,
                activity: "waiting",
                correctLocationVisbility: 1,
                accuracyColor: gameAccuracyColors[2]
            }
        )
        setTimeout(()=>{moveToNextLocation(false)}, 500)
    }
    
    const detectIfClickWasCorrect = (offsetX, offsetY) => {
        const clickRange = locationsArray[0].click_range
        for(let i=0; i < locationsArray[0].cords.length; i++){
            if(
                Math.abs(offsetX - locationsArray[0].cords[i].x) <= clickRange &&
                Math.abs(offsetY - locationsArray[0].cords[i].y) <= clickRange
                ){return true;}
            }
            return false;
        }
        
        const gameAccuracyColors = ["green", "yellow", "red"] //green yellow red
        
        if (!jsonObject || !backgroundMapImage) {
        return <div>{`loading ${location.pathname}`}</div>;
    }

    const moveToNextLocation = (correct) => {
        if (correct) {
            setCurrentGameInfo(
                {
                    ...currentGameInfo,
                    accuracyColor: gameAccuracyColors[1],
                    numberOfCorrect: currentGameInfo.numberOfCorrect + 1,
                    activity: "guessing"
                })
            setLocationsArray(locationsArray.slice(1))
        } else {
            setCurrentGameInfo(
                {
                    ...currentGameInfo,
                    accuracyColor: gameAccuracyColors[1],
                    numberOfIncorrect: currentGameInfo.numberOfIncorrect + 1,
                    activity: "guessing"
                })
            if (currentGameInfo.learningMode) {
                setLocationsArray(moveFirstElementToFourth(locationsArray))
            } else {
                setLocationsArray(locationsArray.slice(1))

            }
        }
    }

    const moveFirstElementToFourth = (array) => {
        
        // Removing the first element
        const firstElement = array.shift();
        
        if (array.length < 5) {
            // Handle error or return as is because we can't move the first element to the fourth index
            console.log("too short")
            return [...array, firstElement];
        }
        // Inserting the removed element at the new position (index 3 for the fourth position)
        array.splice(3, 0, firstElement);
        
        // Returning the modified array
        array.map((value)=>{console.log(value.name)})
        console.log("\n")
        return [...array];
    };

    const startGameHandler =() => {
        setCurrentGameInfo({
            ...currentGameInfo,
            started: true,
            activity: "guessing"       
        });
    };
    
    const difficultyChangeHandler = (event) => {
        setCurrentGameInfo({
            ...currentGameInfo,
            difficulty: event.target.value
        });
    };

    const modeChangeHandler = (event) => {
        setCurrentGameInfo({
            ...currentGameInfo,
            learningMode: event.target.checked,
        });
    }

    const locationTypeChangeHandler = (event) => {
        const checkIndex = parseInt(event.nativeEvent.srcElement.name.slice(5))
        const checkValue = event.nativeEvent.srcElement.checked
        const newAllowedLocationsTypes = allowedLocationTypes.map((value, index) => (index === checkIndex? checkValue : value))
        setAllowedLocationTypes(newAllowedLocationsTypes)
    };

    const rapeatUnsuccessfulLocations = () => {
        setLocationsArray(
            failedLocationsArray
        )
        setFailedLocationsArray([])
        setCurrentGameInfo({
            ...currentGameInfo,
            numberOfCorrect: 0,
            numberOfIncorrect: 0,
        })
    }

    const goHome = () => {
        navigate("../")
    }
    
    
    
        

    if (!currentGameInfo.started) {
        return (
            <PlayPageForm 
                allowedLocations={allowedLocationTypes}
                locationTypeChangeHandler={locationTypeChangeHandler}
                currentGameInfo={currentGameInfo} 
                jsonObject={jsonObject}
                difficultyChangeHandler={difficultyChangeHandler} 
                startGameHandler={startGameHandler} 
                startButtonDisabled={locationsArray.length === 0}
                modeChangeHandler={modeChangeHandler}/>
        );
    }
    
    const { numberOfCorrect, numberOfIncorrect } = currentGameInfo

    if(locationsArray.length === 0){
        return(            
            <PlayPageWinScreen 
                loadGameInfo={loadGameInfo} 
                goHome={goHome} 
                rapeatUnsuccessfulLocations={rapeatUnsuccessfulLocations} 
                numberOfCorrect={numberOfCorrect} 
                numberOfIncorrect={numberOfIncorrect}/>
        )
    }

    // ... JSX for the main game ...
    return (
        <div className='play-page'>
            <div className="main">
        
                <div onMouseUp={clickOnMapHandler} className="guess-map" style={{width: jsonObject.backgroundMapWidth + "px", cursor: currentGameInfo.activity === "waiting" ? "auto" : "pointer"}}>
                    {
                        currentGameInfo.correctLocationVisbility > 0?
                        locationsArray[0].cords.map((pointOnMap) => {
                                const {x, y} = pointOnMap
                                return(
                                    <PointOnMap key={x * y} x={x} y={y} leaving={currentGameInfo.correctLocationVisbility === 1}/>
                                    )
                                }
                        ): ""
                    }
                    <img src={backgroundMapImage} alt="Background Map" />
                </div>
                <PlayPageSideColumn 
                    locationName={locationsArray[0].name}
                    locationType={jsonObject.location_types[locationsArray[0].location_type - 1]}
                    locationIndex={locationsArray[0].location_type}
                    color={currentGameInfo.accuracyColor}
                    portionFinishedPercent={Math.round(100 * (numberOfCorrect + numberOfIncorrect) / (numberOfCorrect + numberOfIncorrect + locationsArray.length))} 
                    portionCorrectPercent={numberOfCorrect + numberOfIncorrect === 0 ? 0 : Math.round(100 * numberOfCorrect / (numberOfCorrect + numberOfIncorrect))}
                    jsonObject={jsonObject}/>
            </div>
        </div>
    );
};

export default PlayPage;
