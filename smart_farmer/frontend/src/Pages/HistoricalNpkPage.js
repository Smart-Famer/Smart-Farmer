import "../App.css";
import Sidebar from "../components/Sidebar/SideBar";
import NpkLevelChart from "../components/NpkLevelChart";
import Input from "../components/inputForms/InputForm";


export default function HistoricalNPKpage() {
  return (
    <div className="row justify-content-center">
      <div className="col-11 col-sm-11 col-md-10 col-lg-9">
        <Input formName="NPK Historical Data">
          <NpkLevelChart/>
        </Input>
      </div>
    </div>
  );
}
