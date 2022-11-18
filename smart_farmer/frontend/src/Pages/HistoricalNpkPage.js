import "../App.css";
import Sidebar from "../components/Sidebar/SideBar";
import NpkLevelChart from "../components/NpkLevelChart";
import Input from "../components/inputForms/InputForm";


export default function HistoricalNPKpage() {
  return (
    <div className="main-container">
    <Sidebar/>
      <div>
        <Input formName="NPK Historical Data">
          <NpkLevelChart/>
        </Input>
      </div>
    </div>
  );
}
