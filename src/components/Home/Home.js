import React, { useEffect, useState } from 'react';
import './Home.css';
import { Container } from 'react-bootstrap';
import transportData from '../../fakeData/transport.json';
import Transport from '../Transport/Transport';




const Home = () => {

  
    const [transports, setTransport] = useState([]);

    //load fake data
    useEffect(() => {

        setTransport(transportData);


    }, []);


    return (


        <div className="home-wrapper">

            <div className="content">
                {/* render transport cards in homepage */}
                <Container className="home-container">

                    {
                        transports.map(tp => <Transport key={tp.id} transport={tp}></Transport>)
                    }

                </Container>
            </div>

        </div>

    );
};

export default Home;