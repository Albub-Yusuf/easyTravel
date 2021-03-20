import React, {  useEffect, useState } from 'react';
import './Home.css';
import {Container} from 'react-bootstrap';


import transportData from '../../fakeData/transport.json';
import Transport from '../Transport/Transport';




const Home = () => {

    // set transport from fake data
 const [transports, setTransport] = useState([]);



 

 useEffect(() => {

    setTransport(transportData);
   

 },[]);

 console.log(transports);



    return (
          
        
            <div className="home-wrapper">

           <div className="content">
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