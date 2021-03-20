import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import map from '../../images/Map.png';
import { useForm } from 'react-hook-form';
import './Destination.css';
import peoples from '../../images/peopleicon.png';
import { AuthContext, VContext } from '../../App';

const Destination = () => {

    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

    const [vinfo, setVinfo] = useContext(VContext);

    const{id,name,image,capacity,cost,economy,luxury} = vinfo;



    console.log(vinfo.name);

    

    const { register, handleSubmit, watch, errors } = useForm();

    const [locations, setLocations] = useState();



    const onSubmit = data => {

        const newLocations = {

            from: data.pickupFrom,
            to: data.pickupTo
        }

        setLocations(newLocations);

        document.getElementById('destinationPicker').style.display = 'none';


    };



    return (
        <div>

            <Container>
                <hr></hr>
                <Row>
                    <Col sm={4}>
                        <div id="destinationPicker">
                            <div style={{ background: '#ccc', borderRadius: '10px', padding: '10px' }}>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <label>Pickup From</label><br />
                                    <input name="pickupFrom" ref={register({ required: true })} />
                                    {errors.pickupFrom && <span>field is required</span>}
                                    <br /><br />
                                    <label>Pickup To</label><br></br>
                                    <input name="pickupTo" ref={register({ required: true })} />
                                    {errors.pickupFrom && <span>field is required</span>}
                                    <br /><br />
                                    <input type="submit" value="Search" />
                                    <br></br>
                                </form>

                            </div>
                        </div>

                        {
                            locations &&

                            <div id="options">
                                <div style={{ background: '#ccc', borderRadius: '10px', padding: '10px' }}>
                                    <div style={{ background: 'salmon', borderRadius: '10px', margin: '10px', padding: '20px', color: '#fff' }}>

                                        <ul className="bar">
                                            <li>{locations.from} </li>
                                            <li>{locations.to} </li>
                                        </ul>
                                    </div>
                                    <br></br>
                                    <div style={{ display: 'flex',  background: '#fff', borderRadius: '10px', margin: '10px', padding: '10px', color: '#333' ,alignItems:'center',justifyContent:'space-evenly'}}>
                                       <div style={{display:'flex',alignItems:'center'}}>
                                       <img style={{ width: '60px' }} src={image} alt="vehicle" /> <b> &nbsp;{name}</b>
                                       </div>

                                       <div style={{display:'flex',alignItems:'center'}}>
                                       <img style={{width:'30px'}} src={peoples} alt="capacity" /><b> &nbsp;{capacity}</b>
                                       </div>

                                       <div style={{display:'flex',alignItems:'center'}}>
                                       <span><strong>${cost}</strong></span>
                                       </div>
                                    </div>
                                    <br></br>
                                    <div style={{ display: 'flex',  background: '#fff', borderRadius: '10px', margin: '10px', padding: '10px', color: '#333' ,alignItems:'center',justifyContent:'space-evenly'}}>
                                       <div style={{display:'flex',alignItems:'center'}}>
                                       <img style={{ width: '60px' }} src={image} alt="vehicle" /> <b> &nbsp;{name}</b>
                                       </div>

                                       <div style={{display:'flex',alignItems:'center'}}>
                                       <img style={{width:'30px'}} src={peoples} alt="capacity" /><b> &nbsp;{capacity}</b>
                                       </div>

                                       <div style={{display:'flex',alignItems:'center'}}>
                                       <span><strong>${economy}</strong></span>
                                       </div>
                                    </div>
                                    <br></br>
                                    <div style={{ display: 'flex',  background: '#fff', borderRadius: '10px', margin: '10px', padding: '10px', color: '#333' ,alignItems:'center',justifyContent:'space-evenly'}}>
                                       <div style={{display:'flex',alignItems:'center'}}>
                                       <img style={{ width: '60px' }} src={image} alt="vehicle" /> <b> &nbsp;{name}</b>
                                       </div>

                                       <div style={{display:'flex',alignItems:'center'}}>
                                       <img style={{width:'30px'}} src={peoples} alt="capacity" /><b> &nbsp;{capacity}</b>
                                       </div>

                                       <div style={{display:'flex',alignItems:'center'}}>
                                       <span><strong>${luxury}</strong></span>
                                       </div>
                                    </div>

                                </div>
                            </div>
                        }
                    </Col>
                    <Col sm={8}>
                        <div style={{ background: '#ccc', minHeight: '700px', borderRadius: '10px' }}>
                            <img src={map} alt="" />
                        </div>
                    </Col>
                </Row>

            </Container>

        </div>
    );
};

export default Destination;