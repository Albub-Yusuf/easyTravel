import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VehicleContext } from '../../App';
import './Transport.css';


const Transport = (props) => {

    // set data from vehicle context & destructing the data;
    const [vehicleInfos, setvehicleInfos] = useContext(VehicleContext);
    const { id, vehicle, image, cost, capacity, economy, luxury } = props.transport;



    const handleData = () => {


        const vehicleData = {

            id: id,
            name: vehicle,
            capacity: capacity,
            cost: cost,
            image: image,
            economy: economy,
            luxury: luxury,


        }
        setvehicleInfos(vehicleData);


    }


    return (
        // render vehicle card component
        <div>
            <Link to="/destination" onClick={handleData}>
                <div className="vehicle-card">
                    <div className="vehicle-card-content">
                        <div className="vehicle-logo">
                            <img src={image} alt="logo" />
                        </div>
                        <div className="vehicle-info">
                            <h5><strong>{vehicle}</strong></h5>
                        </div>
                    </div>
                </div>
            </Link>
        </div>

    );
};

export default Transport;