import React from "react"
import { redirect } from "react-router-dom"
import { jwtDecode, type JwtPayload } from "jwt-decode"

export async function ProtectedLayout(children  : React.ReactElement) {
    const serverUrl : Promise<string> =  window.electronApi.getEnvVariable("SERVER_URL");
    const jwt : string | null  = localStorage.getItem("jwt");
    
    if(!jwt) throw redirect("/login");

    const responseUrl : string = await serverUrl;
    if(!serverUrl) throw Error("Couldn't find the server URL");

    const validationFetch = fetch(`response/auth/verify`, {
        method : "GET",
        headers : {
            "Authorization" : `${jwt}`,
            "Content-type" : "application/json"
        }
    });

    const { exp } = jwtDecode<JwtPayload>(jwt);
    if(!exp || exp *1000 < Date.now()) throw redirect("/login");

    const validationResponse = await (await validationFetch).json() as {"valid" : boolean};
    if(!validationResponse || !validationResponse.valid) throw redirect("/login");

    return children;
}

