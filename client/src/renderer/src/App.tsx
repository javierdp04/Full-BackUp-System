import React from "react"
import { Routes, Route } from "react-router-dom"
import Backup from "./views/Backup"
import Schedule from "./views/Schedule"
import { ProtectedLayout } from "../../scripts/auth_utils"
import LogIn from "./views/LogIn"


function App() : React.ReactElement {
    return (
        <Routes>
            <Route path ="/login" element = {(<LogIn />)} />
            <Route path="/" element= {ProtectedLayout(<Backup />)} />
            <Route path="/schedule" element= {ProtectedLayout(<Schedule />)} />
        </Routes>
    )
}

export default App
