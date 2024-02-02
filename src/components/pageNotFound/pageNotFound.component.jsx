import './pageNotFound.style.scss'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return(
        <div className="pageNotFoundWrapper">
            <div className="pageNotFound">
                <span className="title">404 Not Found</span>
                <p>
                A wild 404-PAGE appeared!<br/>
                This means that your browser was able to communicate with your given server, but the server could not find
                what was requested.<br/><br/>
                * Make sure the url is correct.<br/>
                * Don't panic.
                </p>
                <Link to=''>Go back home -&gt; _</Link>
            </div>
        </div>
    )
}

export default PageNotFound;