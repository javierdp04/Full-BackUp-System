import React, { useEffect, useState } from "react"
import { Navigate, redirect } from "react-router-dom"
import { jwtDecode, type JwtPayload } from "jwt-decode"
import type { AuthState } from "../shared/models/models"




export  function ProtectedLayout(children  : React.ReactElement) : React.ReactElement{
    const [state, setState] = useState<AuthState>('Checking');

    useEffect(() => {
        verifyUser()
            .then((data) => (setState(data.valid ? 'Authorized' : 'Unauthorized')));
    }, [])

    if(state == 'Checking') return <p>Loading...</p>
    return (state == 'Authorized') ? children : <Navigate to="/login"></Navigate>
}

async function verifyUser() : Promise<Record<string, boolean>> {
    const serverUrl : Promise<string> =  window.electronApi.getEnvVariable("SERVER_URL");
    const jwt : string | null = localStorage.getItem("token");
    let functReturn : Record<string, boolean> = {"valid" : false}

    if(!jwt) return functReturn;
    const { exp } = jwtDecode<JwtPayload>(jwt);
    if(!exp || exp *1000 < Date.now()) return functReturn;
    

    const responseUrl : string = await serverUrl;
    if(!responseUrl) throw Error("Couldn't find the server URL");

    const validationFetch = fetch(`${responseUrl}/auth/verify`, {
        method : "GET",
        headers : {
            "Authorization" : `${jwt}`,
            "Content-type" : "application/json"
        }
    });

    const response = await validationFetch;
    if(!response.ok) return functReturn;
    const jsonResponse = await response.json() as {"valid" : boolean};
    if(!jsonResponse.valid) return functReturn;

    return jsonResponse;
}

