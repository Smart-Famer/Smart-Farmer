import { createContext, useReducer, useEffect } from "react";
import PhotoData from "../components/Gallery/PhotoData"
import { useFarmContext } from "../hooks/useFarmContext";

export const PhotoContext = createContext()
export const photoReducer = (state, action)=>{
    switch(action.type){
        case("INITIATE"):
            return action.payload
        case("DELETE-PHOTO"):
            return {
                ...state,
                [action.payload.date]:state[action.payload.date].filter(function(photo){
                    return photo._id!==action.payload._id
                })
            }
        case("DELETE-DATE"):
            let newState={}
            Object.keys(state).forEach(key=>{
                if(key!==action.payload.date){
                    newState[key]=[...state[key]]
                }
            })
            return newState
        default:
            return state
    }

}
export const PhotoContextProvider = ({children})=>{
    const {farm} = useFarmContext()
    const [photos, dispatchPhotos] = useReducer(photoReducer,{})
    useEffect(()=>{
        const fetchPhotos = async ()=>{
            const response = await fetch(`http://localhost:4000/api/photos/get-photos/${farm._id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const json = await response.json()
            if (response.ok){
                dispatchPhotos({type:"INITIATE", payload:json})
            }
        }
        fetchPhotos()
    },[])
    

    console.log('Current Photos:', photos)
    
    return(
        <PhotoContext.Provider value={{photos, dispatchPhotos}}>
            {children}
        </PhotoContext.Provider>
    )
}