import './hugeButton.style.scss'
import { Link } from 'react-router-dom';

const HugeButton = ({children, color, click}) => {
    return(
        <Link className={`huge-button ${color}`} to={click}>{children}</Link>
    )
}

export default HugeButton;