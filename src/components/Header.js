import { Link } from 'react-router-dom';
function Header() {
    return (
        <header>
            <div className="grid-inner">
                <Link to="/">
                    <img src="/assets/logo.svg" className="logo"></img>
                </Link>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/project">Project</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;