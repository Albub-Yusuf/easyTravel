import React, { useContext } from 'react';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// or less ideally
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../App';


const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
    return (
        <Container>
        <div className="nav-wrapper">
            <div className="logo">
                <h3>Easy Travel</h3>
            </div>

            <div className="nav-link">
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/destination">Destination</Link></li>
                    <li><Link to="/">Blog</Link></li>
                    <li><Link to="/">Contact</Link></li>
                    <li id="conditionalProfile">{loggedInUser.email ? <strong>{loggedInUser.name}</strong> : <Link to="/login"><button className="login-btn">Login</button></Link>}</li>
                    <li><FontAwesomeIcon className="ham-menu" icon={faBars}></FontAwesomeIcon></li>
                </ul>
            </div>
           
            {/* dropdown */}

            {/* <div className="nav-link-hidden">
                <ul>
                <li><Link to="/home">Home</Link></li>
                    <li><Link to="/destination">Destination</Link></li>
                    <li><Link to="/">Blog</Link></li>
                    <li><Link to="/">Contact</Link></li>
                </ul>
            </div> */}
        </div>

        </Container>
    );
};

export default Navbar;