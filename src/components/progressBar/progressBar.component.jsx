import './progressBar.style.scss'


const ProgressBar = ({percent, color}) => {
    return(
        <div className="progress-bar-container">
            <div className={`${color} progress-bar-line`} style={{width: percent + "%"}}></div>
        </div>
    )
}

export default ProgressBar;