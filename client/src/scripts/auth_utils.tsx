import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { jwtDecode, type JwtPayload } from "jwt-decode"
import type { AuthState } from "../shared/models/models"
import { getToken } from "./crypto_utils";


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
    const serverUrl : string =  await window.electronApi.getEnvVariable("SERVER_URL");
    const jwt : string | null = getToken();

    if(!serverUrl) throw Error("Couldn't find the server URL");
    if(!jwt) return {"valid" : false};
    const { exp } = jwtDecode<JwtPayload>(jwt);
    if(!exp || exp *1000 < Date.now()) return {"valid" : false};
    
    
    const response = await fetch(`${serverUrl}/auth/verify`, {
        method : "GET",
        headers : {
            "Authorization" : `Bearer ${jwt}`,
            "Content-type" : "application/json"
        }
    });

    if(!response.ok) return {"valid" : false};
    const jsonResponse = await response.json() as {"valid" : boolean};
    if(!jsonResponse.valid) return {"valid" : false};

    return jsonResponse;
}

