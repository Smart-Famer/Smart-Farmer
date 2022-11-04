import React from "react";
import './card.css';

export default function Card(props) {
    return (

        <div className="row--farm">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <p className="card-location">{props.location}</p>
                        <a href="#" className="btn btn-green">View</a>
                    </div>
                </div>
            </div>
        </div>

    )
}