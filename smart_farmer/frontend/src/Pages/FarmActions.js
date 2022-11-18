import Header from "../components/login/Header.js";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import LoginNavBar from "../components/NavBars/LoginNavbar";
import Sidebar from "../components/Sidebar/SideBar.js";
import FarmCard from "../components/FarmManagement/farmCard";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useEffect } from "react";
import { useState } from "react";
import { useFarmContext } from "../hooks/useFarmContext.js";
import "../components/FarmManagement/farmCard";
import { HiViewGridAdd } from "react-icons/hi";
import FarmForm from "../components/FarmManagement/farmForm";
import InputForm from "../components/inputForms/InputForm.js";

export default function FarmAction() {
  const { action, _id } = useParams();
  console.log(action, _id);
  let formName = "";
  if (action === "add") {
    formName = "Add New Farm";
  } else {
    formName = "Edit Farm";
  }
  return (
    <div className="row justify-content-center">
      <div className="col-11 col-sm-10 col-md-9 col-lg-7">
        <InputForm formName={formName}>
          <FarmForm action={action} farm_id={_id} />
        </InputForm>
      </div>
    </div>
  );
}
