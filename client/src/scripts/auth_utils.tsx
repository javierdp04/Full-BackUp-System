import React from "react"
import { Navigate } from "react-router-dom"
import { jwtDecode, type JwtPayload } from "jwt-decode"

export function ProtectedLayout(children  : React.ReactElement) {
    const token  = localStorage.getItem("jwt");
    if(!token) return <Navigate to="/login" />

    try {
        const { exp } = jwtDecode<JwtPayload>(token)
        if(!exp || exp *1000 < Date.now()) return <Navigate to="/login" />
    } catch {
        return <Navigate to="/login" />
    }
    return children;
}

