import React from "react";
import { Row, Col } from "reactstrap";
import { Button } from 'reactstrap';
import './inputform.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NPKInput() {
    return (
        <div>
            <form>
                <div class="form-group row p-3">
                    <label for="inputNitrogen" class="col-sm-4 col-form-label">Nitrogen</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="inputNitrogen" />
                    </div>
                    <label for="inputNitrogen" class="col-sm-1 col-form-label">mgl<sup>-1</sup></label>

                </div>
                <div class="form-group row p-3">
                    <label for="inputPhosphorus" class="col-sm-4 col-form-label">Phosphorus</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="inputPhosphorus" />
                    </div>
                    <label for="inputPhosphorus" class="col-sm-1 col-form-label">mgl<sup>-1</sup></label>

                </div>
                <div class="form-group row p-3">
                    <label for="inputPotassium" class="col-sm-4 col-form-label">Potassium</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="inputPotassium" />
                    </div>
                    <label for="inputPotassium" class="col-sm-1 col-form-label">mgl<sup>-1</sup></label>

                </div>
                <button type="button" className="btn btn-green btn-block m-4">Submit</button>

            </form>
        </div>

    )
}