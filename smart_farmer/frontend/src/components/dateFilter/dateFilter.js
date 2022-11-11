import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react"
import { usePhotoContext } from "../../hooks/usePhotoContext"
import DateCard from '../Gallery/dateCard'


export default function DateFilter({setCards}){
    const {photos, dispatchPhotos} = usePhotoContext()
    const [fromDate,setFromDate] = useState("")
    const [toDate,setToDate] = useState("")
    
    const handleFilter = ()=>{
        let keys=Object.keys(photos)
        if(fromDate){
            keys= keys.filter((key)=>new Date(key)>= new Date(fromDate))
        }
        if(toDate){
            keys = keys.filter((key)=>new Date(key)<new Date(toDate))
        }
        const cards = keys.map((date)=><div class="col">
        <DateCard date={date}/>
        </div>)
        setCards(cards)
    }

    return(
        <div>
            <div class="input-group mb-2">
                <span class="input-group-text">From</span>                                    
                <input type="date"  class="form-control" placeholder='From :' value={fromDate} onChange={(e)=>{setFromDate(e.target.value)}}/>
                <span class="input-group-text">To</span>
                <input type="date"  class="form-control" placeholder='To :' value={toDate} onChange={(e)=>{setToDate(e.target.value)}}/>
                <button class="btn btn-primary" type="button" onClick={handleFilter}>Filter</button>
            </div>

        </div>
        
    )
}