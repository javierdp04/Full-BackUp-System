import React from "react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import Backup from "./views/Backup"
import Schedule from "./views/Schedule"
import { ProtectedLayout } from "../../scripts/auth_utils"
import LogIn from "./views/LogIn"


function App() : React.ReactElement {
    return (
        <MemoryRouter initialEntries={["/login"]}>
                    <Routes>
                        <Route path ="/login" element = {(<LogIn />)} />
                        <Route path="/" element={ProtectedLayout(<Backup />)} />
                        <Route path="/schedule" element={ProtectedLayout(<Schedule />)} />
                    </Routes>
        </MemoryRouter>
    )
}

export default App
