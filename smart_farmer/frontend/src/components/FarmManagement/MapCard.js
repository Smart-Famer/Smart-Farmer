import React from 'react'
import { useFarmContext } from '../../hooks/useFarmContext'

export default function MapCard(){
    const {farm} = useFarmContext()
    return(
        <div className="embed-responsive">
            <iframe
              width={"100%"}
              height={"300px"}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCi02J9WcBGHLfNAViDd2n41OsK6PMZN30&q=${farm.location.latitude},${farm.location.longitude}`}
            ></iframe>
        </div>
    )
}