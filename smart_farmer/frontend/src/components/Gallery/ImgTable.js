import Table from 'react-bootstrap/Table';
import {Button} from "reactstrap";

import "./ImgTable.css"
function ImgTable(props) {
    let Data=[]
    Object.keys(props.photos).forEach((key, index)=>{
        Data=[...Data,<tr><td onClick={()=>{props.handleClick(key)}}>{key}</td><td>{props.photos[key].length}</td></tr>]
    })
    return (
        Object.keys(props.photos).length!==0 ?<Table className="img-table" striped bordered hover>       
        <thead>
            <tr>
            <th>Date</th>
            <th>Number of Photos</th>
            </tr>
        </thead>
        <tbody>
            {Data}
        </tbody>
        </Table>
    : <h4>No photos to display</h4>

    );
}

export default ImgTable;