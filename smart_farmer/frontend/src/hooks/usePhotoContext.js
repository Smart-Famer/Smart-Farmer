import { PhotoContext } from "../context/photoContext";
import { useContext } from "react";

export const usePhotoContext = ()=>{
    const context= useContext(PhotoContext)

    if(!context){
        throw Error("usePhotoContecx can be used only in a PhotoContextProvider Wrapper")
    }

    return context
}