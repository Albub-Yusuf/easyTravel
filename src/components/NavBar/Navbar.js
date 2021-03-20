import React, { useContext } from 'react';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// or less ideally
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../App';
import { useState } from 'react';


const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

    const [locations, setLocations] = useState(true);


    const handleNavToggle = () => {

        if (locations == false) {

            setLocations(true);

        }

        if (locations == true) {

            setLocations(false);

        }

    }

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
                        <li><FontAwesomeIcon className="ham-menu" icon={faBars} onClick={handleNavToggle}></FontAwesomeIcon></li>
                    </ul>
                </div>

            </div>

            {
                locations && <div id="hidden-ui" style={{ display: 'flex', background: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <p><Link to="/home" onClick={handleNavToggle}><strong>Home</strong></Link></p>
                        <p><Link to="/destination" onClick={handleNavToggle}><strong>Destination</strong></Link></p>
                        <p><Link to="/" onClick={handleNavToggle}><strong>Blog</strong></Link></p>
                        <p><Link to="/" onClick={handleNavToggle}><strong>Contact</strong></Link></p>
                        <p>{loggedInUser.email ? <strong>{loggedInUser.name}</strong> : <Link to="/login" onClick={handleNavToggle}><button className="login-btn">Login</button></Link>}</p>
                    </div>
                </div>

            }

        </Container>
    );
};

export default Navbar;