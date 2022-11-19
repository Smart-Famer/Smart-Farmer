import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFarmContext } from '../../hooks/useFarmContext'

export default function KeyModal(){
    const [error, setError] = useState(null)
    const [secret,setSecret] = useState("")
    const [state,setState] = useState("password")
    const [pass,setPass] = useState("")
    const {user} = useAuthContext()
    const {farm,dispatchFarm} = useFarmContext()
    const navigate = useNavigate()

    console.log(secret)
    useEffect(()=>{
        setSecret(farm?.secret_key)
    },[farm])

    const checkPassword = async ()=>{
        setError(null)
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/user/check-password`,
        {
          method: "POST",
          body: JSON.stringify({
            user_id:user.details._id,
            password:pass
          }),

          headers: { "Content-type": "application/json" },
        }
        );
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setState("text")
            setTimeout(() => {
                setState("password")
            }, 10000);
        }
    }

        const resetSecretKey = async ()=>{
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/farm/update-secret/${farm._id}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            dispatchFarm({
                type:"UPDATE",
                payload:json
            })
            setTimeout(() => {
                setState("password")
            }, 10000);
        }

    }

    return(
        <div>
            <div class="modal" tabindex="-1" id="exampleModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Enter Your Password</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className='row justify-content-center'>
                            <div className='col-11 horizontal-scrollable'>
                                {state==="text"&&<p className='text-success'>Password verified!</p>}
                                {state==="password"&&<><input className='form-control' type="password" value={pass} placeholder={"Password"} onChange={(e)=>{setPass(e.target.value)}}/>{error&&<p className='text-danger mt-2'>{error}</p>}</>}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                    
                        {state==="password"&&<button type="button" class="btn btn-success" onClick={()=>{checkPassword()}}>Enter</button>}
                    </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                    <strong>Secret Key</strong>
                </label>
                <input
                    type={state}
                    className="form-control-plaintext"
                    id="formGroupExampleInput2"
                    placeholder="Address"
                    value={secret}
                />
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    View
                </button>
                {/* <button type="button" class="btn btn-success ms-2" onClick={()=>{resetSecretKey()}}>
                    Reset
                </button> */}
            </div>


        </div>
    )
}