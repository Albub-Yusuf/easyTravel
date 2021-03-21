import React, { useContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import './Destination.css';
import peoples from '../../images/peopleicon.png';
import { VehicleContext } from '../../App';
import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;




const Destination = () => {


    const [vehicleinfos, setvehicleinfos] = useContext(VehicleContext);
    const { name, image, capacity, cost, economy, luxury } = vehicleinfos;

    //map viewport state initialize
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

    //set destinations 
    const onSubmit = data => {

        const newLocations = {

            from: data.pickupFrom,
            to: data.pickupTo,
            date: data.date
        }

        setLocations(newLocations);

        document.getElementById('destinationPicker').style.display = 'none';


    };



    return (
        <div>

            <Container>
                <hr></hr>
                <Row>
                    {/* Destination picker section */}
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
                                    <label>Select Date</label><br></br>
                                    <input className="inputStyle" type="date" name="date" id="date" ref={register({ required: true })} />
                                    {errors.data && <span>Please Select a date of your travel</span>}

                                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                        <input className="pick-btn" type="submit" value="Search" />
                                    </div>

                                </form>
                            </div>
                        </div>

                        {/* selected destination and available ride showing section */}

                        {
                            locations &&

                            <div id="options">
                                <div className="options-wrapper">
                                    <div className="booking-info">
                                        <div className="bar-wrapper">
                                            <ul className="bar">
                                                <li>{locations.from} </li>
                                                <li>{locations.to} </li>
                                                <p>Date: {locations.date}</p>

                                            </ul>

                                        </div>
                                    </div>


                                    <div className="available-transport">
                                        <div className="transport" >
                                            <img src={image} alt="vehicle" /> <b> &nbsp;{name}</b>
                                        </div>

                                        <div className="capacity">
                                            <img src={peoples} alt="capacity" /><b> &nbsp;{capacity}</b>
                                        </div>

                                        <div className="price">
                                            <span><strong>${cost}</strong></span>
                                        </div>
                                    </div>


                                    <div className="available-transport">
                                        <div className="transport">
                                            <img src={image} alt="vehicle" /> <b> &nbsp;{name}</b>
                                        </div>

                                        <div className="capacity">
                                            <img src={peoples} alt="capacity" /><b> &nbsp;{capacity}</b>
                                        </div>

                                        <div className="price">
                                            <span><strong>${economy}</strong></span>
                                        </div>
                                    </div>


                                    <div className="available-transport">
                                        <div className="transport">
                                            <img src={image} alt="vehicle" /> <b> &nbsp;{name}</b>
                                        </div>

                                        <div className="capacity">
                                            <img src={peoples} alt="capacity" /><b> &nbsp;{capacity}</b>
                                        </div>

                                        <div className="price">
                                            <span><strong>${luxury}</strong></span>
                                        </div>
                                    </div>

                                </div>
                                <br></br>
                            </div>


                        }
                    </Col>
                    <br></br>

                    {/* Map section */}
                    <Col id="mapSection" sm={8} xs={12}>
                        <br></br>
                        <div className="map-wrapper">

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