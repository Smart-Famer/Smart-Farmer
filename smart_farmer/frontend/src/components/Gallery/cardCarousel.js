import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import { usePhotoContext } from '../../hooks/usePhotoContext';
import PhotoCard from './photoCard';
import "./Carousel.css"



function CardCarousel({date}) {
    const navigate = useNavigate()
    const dayArr=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const {photos,dispatchPhotos} = usePhotoContext()
    // const [thisPhotos, setState] = useState(photos[date])
    // useEffect(()=>{
    //     console.log("photos changed",photos)
    // },[photos])

    if(photos[date]){
        return (
            <div>
                <div class='row m-4'>
                    <div class='col'>
                        <h4 class="font-monospace">Photos Taken on - {date} - {dayArr[new Date(date).getDay()]} </h4>
                    </div>
                    <div class='col'>
                        <button class="btn btn-secondary" onClick={()=>{navigate("/user/farm/gallery")}}>Go to Gallery</button>
                    </div>
                </div>
                <div
                class="row row-cols-1 row-cols-md-4 g-4 m-3"
                >    
                    {photos[date].map(element=><div class="col">
                        <PhotoCard date={date} _id={element._id}/>
                    </div>)}   
                </div>
            </div>
      );
    }else{
        return(
            <div>
                <div class='row justify-content-end m-4'>
                    <div class='col-8'>
                        <h4 class="fw-bold text-danger font-monospace">No Photos are Taken on {date}</h4>
                    </div>
                    <div class='col-4'>
                        <button class="btn btn-secondary" onClick={()=>{navigate("/user/farm/gallery")}}>Go to Gallery</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardCarousel;