import './colorButton.style.scss'

const ColorButton = ({children, color, click, afterColor}) => {
    return(
        <button
            className={`
                color-button
                ${color}
                ${click? " clickable" : ""}
                ${afterColor? " has-after" : ""}`}
            onClick={click}
            style={{"--after-color": afterColor}}
        >
            {children}
        </button>
    )
}

export default ColorButton;