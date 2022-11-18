import 'bootstrap/dist/css/bootstrap.css';
import PhotoData from "./PhotoData"
import React, { useEffect, useState } from "react"
import DateCard from './dateCard'
import { usePhotoContext } from "../../hooks/usePhotoContext"
import "./Carousel.css"
import { useFarmContext } from '../../hooks/useFarmContext';
import DateFilter from '../dateFilter/dateFilter';

export default function PhotoGallery(){
    const {farm} = useFarmContext()
    const {photos, dispatchPhotos} = usePhotoContext()
    const [display_cards,setCards]= useState(null)

    useEffect(()=>{        
        const keys = Object.keys(photos)
        const cards = keys.map((date)=><div class="col mb-3">
        <DateCard date={date}/>
        </div>)

        setCards(cards)
    },[photos])


    
    return(
        <div>
            <div class="row ms-1 p-3">
                <div class="col col-md-7 col-lg-6">
                    <DateFilter setCards={setCards}/>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 m-3">
                {display_cards}
                {display_cards&&display_cards.length===0 && <h4 class="fw-bold text-danger font-monospace">No Photos are Taken yet! Try taking some photos and upload them to monitor your progress.. </h4>}
            </div>
        </div>

        
    )     
}                       