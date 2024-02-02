import './colorSlider.style.scss'

const ColorSlider = ({min, max, changeHandler, color, value}) => {

    return(
        <input 
            style={{backgroundColor: color}} 
            step="1" 
            type='range' 
            min={min}
            max={max} 
            className={`color-slider`} 
            value={value} 
            onChange={changeHandler} 
            list="markers"
        />
    )
}

export default ColorSlider;