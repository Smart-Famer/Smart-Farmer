import React from 'react'
import { useFarmContext } from '../hooks/useFarmContext'
import InputForm from '../components/inputForms/InputForm'
import FarmDetailsForm from '../components/FarmManagement/FarmDetailsForm'
import MapCard from '../components/FarmManagement/MapCard'
import SecretKeyModal from '../components/FarmManagement/SecretKeyModal'

export default function FarmDetailsPage(){
    const {farm} = useFarmContext()
    return(
        <div className="row justify-content-center">
            <div className="col-11 col-sm-10 col-md-9 col-lg-7">
                <InputForm formName="Farm Details">
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <FarmDetailsForm/>
                        </div>
                        <div className='col-12 col-md-8 pe-5'>
                            <MapCard/>
                        </div>
                    </div>
                    <div className='row'>
                        <SecretKeyModal/>
                    </div>
                </InputForm>
            </div>
        </div>
      )
}