import './checkBox.style.scss'

const CheckBox = ({label, index, checked, changeHandler}) => {
    return(
        <label className="check-box-container">
            <input type="checkbox" name={"check" + index} checked={checked} onChange={changeHandler}/>
            <span className="checkmark"></span>{label}
        </label>
    )
}

export default CheckBox;