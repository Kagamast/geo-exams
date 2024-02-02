import './colorButton.style.scss'

const ColorButton = ({children, color, click}) => {
    return(
        <button
            className={`
                color-button
                ${color}
                ${click? " clickable" : ""}`}
            onClick={click}
        >
            {children}
        </button>
    )
}

export default ColorButton;