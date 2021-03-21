import React, { useContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import './Destination.css';
import peoples from '../../images/peopleicon.png';
import { AuthContext, VehicleContext } from '../../App';
import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;




const Destination = () => {

    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

    const [vehicleinfos, setvehicleinfos] = useContext(VehicleContext);

    const { id, name, image, capacity, cost, economy, luxury } = vehicleinfos;

    let [viewport, setViewport] = useState({

        width: window.innerWidth,
        height: 550,
        latitude: 23.7461,
        longitude: 90.3742,
        zoom: 13,
        pitch: 50


    })







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
                    <Col id="contentSection" sm={4} xs={12}>
                        <br></br>
                        <div className="destination-wrapper" id="destinationPicker">
                            <div className="destination-container">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <label>Pick From</label><br />
                                    <input className="inputStyle" name="pickupFrom" ref={register({ required: true })} />
                                    {errors.pickupFrom && <span>field is required</span>}
                                    <br></br>
                                    <label>Pick To</label><br></br>
                                    <input className="inputStyle" name="pickupTo" ref={register({ required: true })} />
                                    {errors.pickupFrom && <span>field is required</span>}
                                    <br></br>
                                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                        <input className="pick-btn" type="submit" value="Search" />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {
                            locations &&

                            <div id="options">
                                <div style={{ background: 'lightgray', borderRadius: '10px', padding: '10px' }}>
                                    <div style={{ background: 'tomato', borderRadius: '10px', margin: '10px', padding: '20px', color: '#fff' }}>

                                        <ul className="bar">
                                            <li>{locations.from} </li>
                                            <li>{locations.to} </li>
                                        </ul>
                                    </div>
                                    <br></br>
                                    <div style={{ display: 'flex', background: '#fff', borderRadius: '10px', margin: '10px', padding: '10px', color: '#333', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img style={{ width: '60px' }} src={image} alt="vehicle" /> <b> &nbsp;{name}</b>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img style={{ width: '30px' }} src={peoples} alt="capacity" /><b> &nbsp;{capacity}</b>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span><strong>${cost}</strong></span>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div style={{ display: 'flex', background: '#fff', borderRadius: '10px', margin: '10px', padding: '10px', color: '#333', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img style={{ width: '60px' }} src={image} alt="vehicle" /> <b> &nbsp;{name}</b>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img style={{ width: '30px' }} src={peoples} alt="capacity" /><b> &nbsp;{capacity}</b>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span><strong>${economy}</strong></span>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div style={{ display: 'flex', background: '#fff', borderRadius: '10px', margin: '10px', padding: '10px', color: '#333', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img style={{ width: '60px' }} src={image} alt="vehicle" /> <b> &nbsp;{name}</b>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img style={{ width: '30px' }} src={peoples} alt="capacity" /><b> &nbsp;{capacity}</b>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span><strong>${luxury}</strong></span>
                                        </div>
                                    </div>
                                    <br></br>
                                </div>
                                <br></br>
                            </div>


                        }
                    </Col>
                    <br></br>

                    <Col id="mapSection" sm={8} xs={12}>
                        <br></br>
                        <div style={{ display: 'flex', background: 'lightgray', minHeight: '550px', borderRadius: '3px', alignItems: 'center', justifyContent: 'center' }}>

                            <ReactMapGL {...viewport} mapboxApiAccessToken="pk.eyJ1IjoiYWxidWJ5dXN1ZiIsImEiOiJja21oOXBtdDUwMTBuMnBvN3A5d3g0bjM2In0.7aiK3tIRGcGrN66WU5VVEg"

                                mapStyle="mapbox://styles/albubyusuf/ckmimko2j3sch17ndjgwgw5j0"
                                onViewportChange={viewport => {
                                    setViewport(viewport);
                                }}>
                            </ReactMapGL>

                        </div>
                    </Col>
                </Row>
                <br></br>
                <hr />

            </Container>

        </div>
    );
};

export default Destination;