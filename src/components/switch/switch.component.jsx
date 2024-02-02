import "./switch.style.scss"

const SwitchComponent = ({changeHandler, checked}) => {
    return( 
        <label className="switch">
            <input type="checkbox" checked={checked}  onChange={changeHandler}/>
        </label>
    )
}

export default SwitchComponent;