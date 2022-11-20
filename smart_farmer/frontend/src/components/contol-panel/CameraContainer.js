import React, { useEffect, useState } from "react";
import { useFarmContext } from "../../hooks/useFarmContext";
import "./ControlPanel.css";

export default function CameraContainer() {
  const { farm } = useFarmContext();
  const [options, setOptions] = useState(null);
  const [cameras, setCameras] = useState(null);
  const [selectedCamTake, setCamTake] = useState("");
  const [selectedCamUpload, setCamUpload] = useState("");
  const [successTake, setSuccessTake] = useState(null);
  const [errorTake, setErrorTake] = useState(null);
  const [successUpload, setSuccessUpload] = useState(null);
  const [errorUpload, setErrorUpload] = useState(null);
  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const temp = farm?.actuators.Camera;
    if (temp) {
      setCameras(temp);
      setOptions(temp?.map((cam) => <option>{cam.name.split("_")[1]}</option>));
      setCamTake(temp[0]?.name.split("_")[1]);
      setCamUpload(temp[0]?.name.split("_")[1]);
    }
  }, [farm]);

  const handleUploadChange = (file) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
    setURL(URL.createObjectURL(file));
  };

  async function handleSubmitTake(event) {
    event.preventDefault();
    const msg = `Take Photo - ${selectedCamTake}`;
    const response = await fetch(
      `${process.env.REACT_APP_DATA_SERVER}/api/get-requests/`,
      {
        method: "POST",
        body: JSON.stringify({
          secret_key: farm.secret_key,
          data: { msg },
          headers: { "Content-type": "application/json" },
        }),

        headers: { "Content-type": "application/json" },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setErrorTake(json.error);
    }

    if (response.ok) {
      setSuccessTake(`Pump succesfully!`);
    }
    setTimeout(() => {
      setSuccessTake(null);
      setErrorTake(null);
    }, 5000);
  }

  async function handleSubmitUpload(event) {
    event.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/photos/upload-image`,
      {
        method: "POST",
        body: JSON.stringify({
          image,
          farm_id: farm._id,
          camera_angle: selectedCamUpload,
          public_id: `smart-farmer/${farm.name}`,
          file_name: fileName,
          timestamp: new Date(),
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setSuccessUpload("Image Successfully Uploaded");
    }
    if (!response.ok) {
      setErrorUpload(json.error);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-11 col-sm-10 col-md-7 mt-3 camera">
        <div className="row bg-success text-white p-2">
          <h5>Cameras</h5>
        </div>
        <div className="row justify-content-center mt-2 mt-lg-1 ms-3 me-3">
          <div className="col-10 col-lg-6 p-lg-5 p-4">
            <form className="form" onSubmit={handleSubmitTake}>
              <legend>Take Photos</legend>
              <div>
                <div className="row mb-3">
                  <select
                    className="form-control"
                    id="exampleNumber"
                    name="camera"
                    placeholder="Select Camera"
                    type="select"
                    value={selectedCamTake}
                    onChange={(e) => {
                      setCamTake(e.target.value);
                    }}
                  >
                    {options}
                  </select>
                </div>
                <button type="submit" className="btn btn-green text-white">
                  Take
                </button>
                {errorTake && <p className="text-danger mt-3">{errorTake}</p>}
                {successTake && (
                  <p className="text-success mt-3">Photo Taken Successfully!</p>
                )}
              </div>
            </form>
          </div>
          <div className="col-10 col-lg-6 p-lg-5 p-4">
            <form
              encType="multipart/form-data"
              className="form"
              onSubmit={handleSubmitUpload}
            >
              <legend>Upload Photos</legend>
              <div className="row mb-3">
                <select
                  className="form-control"
                  id="exampleNumber"
                  name="camera"
                  placeholder="Select Camera"
                  type="select"
                  value={selectedCamUpload}
                  onChange={(e) => {
                    setCamUpload(e.target.value);
                  }}
                >
                  {options}
                </select>
              </div>
              <div className="row mb-3">
                <input
                  className="form-control"
                  id="exampleNumber"
                  name="camera"
                  placeholder="Select Camera"
                  type="file"
                  onChange={(e) => {
                    handleUploadChange(e.target.files[0]);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-green text-white">
                Upload
              </button>
              {successUpload && (
                <p className="text-success mt-3">{successUpload}</p>
              )}
              {errorUpload && <p className="text-danger mt-3">{errorUpload}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
