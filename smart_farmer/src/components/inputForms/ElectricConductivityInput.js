import React from "react";
import './inputform.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ElectricConductivityInput() {
    return (
        <div>
            <form>
                <div className="form-group row p-3">
                    <div className="col-sm-7">
                        <input type="text" className="form-control" id="inputElecCon" />
                    </div>
                    <label for="inputElecCon" className="col-sm-1 col-form-label">sm<sup>-1</sup></label>

                </div>
             <button type="button" className="btn btn-green btn-block m-4">Submit</button>

            </form>
        </div>

    )
}