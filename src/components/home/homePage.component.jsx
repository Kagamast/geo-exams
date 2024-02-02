import logo from '../../assets/images/globe.png';
import van from '../../assets/images/van.png';
import './homePage.style.scss'
import HugeButton from '../hugeButton/hugeButton.component';

const HomePage = () => {
    return(
        <div className="home-page">
            <div className="left">
                <img src={van}/>
                <h1>Where to?</h1>

                <div className="continue-buttons">
                    <HugeButton click='goto/svet' color='primary'>Svět</HugeButton>
                    <HugeButton click='goto/evropa' color='secondary'>Evropa</HugeButton>
                    <HugeButton click='goto/cesko' color='accent'>Česko</HugeButton>
                </div>
            </div>
            <div className="right">
                <img src={logo}/>
                <h2>Explore the world.</h2>
            </div>
        </div>
    )
}

export default HomePage;