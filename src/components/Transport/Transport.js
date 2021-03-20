import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VehicleContext } from '../../App';
import './Transport.css';


const Transport = (props) => {

    const [vehicleInfos, setvehicleInfos] = useContext(VehicleContext);
    console.log(props.vehicle);
    const { id, vehicle, image, cost, capacity, economy, luxury } = props.transport;
    console.log(vehicle);
   

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