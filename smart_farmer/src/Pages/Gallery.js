import React, { useState } from "react"

import LoginNavBar from "../components/NavBars/LoginNavbar"
import "../App.css"
import Sidebar from "../components/Sidebar/SideBar"
import Carousel from "../components/Carousel/Carousel"
import { Container,Row,Col, Button} from "reactstrap";
import ImgTable from "../components/ImgTable/ImgTable"
import PhotoData from "../PhotoData"

export default function Gallery()
{
    const [photos, setphotos] = useState(PhotoData)
    //const [items, setItems] = useState(PhotoData[Object.keys(PhotoData)[0]]);
    const [curImage, setCurImage] = useState(Object.keys(photos).length!=0?photos[Object.keys(photos)[0]][0]:null)
    const [curImageDate, setCurDate] =useState(Object.keys(photos).length!=0?Object.keys(photos)[0]:null)
    const current = new Date()
    const curDate = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;
    // console.log(PhotoData[Object.keys(PhotoData)[0]],curImage,curImageDate)
    //console.log(curImageDate)


    function deletePhoto(){
        setphotos((prevPhotos)=>{
            if(prevPhotos[curImageDate].length===1){
                let newObj={}
                Object.keys(prevPhotos).forEach(function(key,index){
                    if(key!==curImageDate){
                        newObj = {...newObj,[key]:prevPhotos[key]}
                    }
                })
                setCurImage(null)
                console.log(newObj)
                return newObj
            } else{
                let newArr=[];
                prevPhotos[curImageDate].map(item=>{
                    newArr = item.key !== curImage.key ? [...newArr,item]:newArr;
                })
                setCurImage(newArr[0])
                // console.log(newArr)
                return {...prevPhotos, [curImageDate]:newArr};
            }     
        })
        
    }

    function handleClick(params){
        setCurDate(params)
        setCurImage(photos[params][0])
    }

    return(
        <section className="main-container">
            <Sidebar/>
            <div className="gallery">
                <div>
                    {Object.keys(photos).indexOf(curImageDate)!==-1 &&
                    <Container className="gallery-image-section">  
                    <h5 className="gallery-image-date">{curImageDate===curDate?"Today": curImageDate}</h5>         
                    <Row>
                        <Col xs="8">
                            <Carousel className="carousel" items={photos[curImageDate]} setcurimage={setCurImage}/>
                        </Col>
                        <Col xs="4">
                            <ul>
                                <li>Date : {curImageDate}</li>
                                <li>Time : {curImage.time}</li>
                                <li>Camera Angle : {curImage.cameraAngle}</li>
                            </ul>
                            <Button className="gallery-delete-button" color="danger"  onClick={deletePhoto}>Delete</Button>
                        </Col>
                    </Row>
                    </Container>}
                </div>
                <div><ImgTable photos={photos} handleClick={handleClick}/></div>
                
            </div>

        </section>
    )
    }