import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Carousel from "./Carousel";
import "./Gallery.css";
import ImgTable from "./ImgTable";
import PhotoData from "./PhotoData";


export default function SlideShow(props) {
  const [photos, setphotos] = useState(PhotoData);
  const [curImage, setCurImage] = useState(
    Object.keys(photos).length != 0 ? photos[Object.keys(photos)[0]][0] : null
  );
  const [curImageDate, setCurDate] = useState(
    Object.keys(photos).length != 0 ? Object.keys(photos)[0] : null
  );
  const current = new Date();
  const curDate = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}`;

  function deletePhoto() {
    setphotos((prevPhotos) => {
      if (prevPhotos[curImageDate].length === 1) {
        let newObj = {};
        Object.keys(prevPhotos).forEach(function (key, index) {
          if (key !== curImageDate) {
            newObj = { ...newObj, [key]: prevPhotos[key] };
          }
        });
        setCurImage(null);

        return newObj;
      } else {
        let newArr = [];
        prevPhotos[curImageDate].map((item) => {
          newArr = item.key !== curImage.key ? [...newArr, item] : newArr;
        });
        setCurImage(newArr[0]);

        return { ...prevPhotos, [curImageDate]: newArr };
      }
    });
  }

  function handleClick(params) {
    setCurDate(params);
    setCurImage(photos[params][0]);
  }

  return (
    <div className="gallery">
      {Object.keys(photos).indexOf(curImageDate) !== -1 && (
        <div className="gallery-image-section">
          <h5 className="gallery-image-date">
            {curImageDate === curDate ? "Today" : curImageDate}
          </h5>
          <Container>
            <Row>
              <Col xs="8">
                <Carousel
                  className="carousel"
                  items={photos[curImageDate]}
                  setcurimage={setCurImage}
                />
              </Col>
              <Col className="gallery-details-container" xs="4">
                <div className="gallery-details">
                  <ul className="details-list">
                    <li className="gallery-details-item">
                      Date : {curImageDate}
                    </li>
                    <li className="gallery-details-item">
                      Time : {curImage.time}
                    </li>
                    <li className="gallery-details-item">
                      Camera Angle : {curImage.cameraAngle}
                    </li>
                    <li className="gallery-details-item">
                      <Button color="danger" onClick={deletePhoto}>
                        Delete
                      </Button>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      <div className="table-container">
        <ImgTable photos={photos} handleClick={handleClick} />
      </div>
    </div>
  );
}
