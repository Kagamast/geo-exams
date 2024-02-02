import './goToPage.style.scss'
import HugeButton from '../hugeButton/hugeButton.component';
import ExamMap from '../../assets/examMap/map.json'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoToPage = () => {
    const [foundObjectFromPath, setFoundObjectFromPath] = useState(null);
    const location = useLocation();   
    const navigate = useNavigate() 
    
    useEffect(() => {
        const examMapPath = location.pathname.replace("/goto/", "");
        
        const findObjectByPath = (jsonArray, path) => {
            const pathParts = path.split('/').filter((element) => (element !== ""));
            
            let currentContent = jsonArray;
            let remainingPath = pathParts;
            let finished = false
            
            while(remainingPath.length > 0 && currentContent.length > 0 && !finished){
                let foundItemByid = false
                for (const item of currentContent) {
                    if (item.id === remainingPath[0]) {
                        //TODO forward to play when a game is inputed
                        remainingPath.shift() //move to next element of path
                        foundItemByid = true
                        if(remainingPath.length === 0){
                            finished = true;
                            currentContent = item
                        }else{
                            currentContent = item.type === "container" ? item.content : item
                        }
                        break;
                    }
                }
                if(!foundItemByid){return null}
            }
            return currentContent
        };
        
        const objectFromPath = findObjectByPath(ExamMap, examMapPath);
        if (!objectFromPath) {
            console.error("Failed to load the page info")
            navigate('../page-not-found')
        } else {
            setFoundObjectFromPath(objectFromPath);
        }
    }, [location.pathname]);
    
    if (!foundObjectFromPath) {
        return <div>Loading...</div>; // or some other placeholder content
    }
    const listOfContent = foundObjectFromPath.content || []
    const examMapPath = location.pathname;
    console.log(listOfContent)

    return(
        <div className="go-to-page">
            <div className="main">
                <h1>{foundObjectFromPath.displayName}</h1>

                <div className="continue-buttons">
                    {
                        listOfContent.map((item) => {
                            const { id, displayName, type } = item;
                            if(type === "container"){return(
                                <HugeButton key={id} click={`${examMapPath.replace("/goto/", "")}/${id}`} color="small">{displayName}</HugeButton>
                            )}else{return(
                                <HugeButton key={id} click={`${examMapPath.replace("/goto/", "../play/")}/${id}`} color="small">{displayName}</HugeButton>
                            )}
                        })
                    }
                </div>
            </div>
        </div>
    )


    
}

export default GoToPage;