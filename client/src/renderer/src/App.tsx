import React from "react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import Menu from "./Menu"
import Backup from "./views/Backup"
import Schedule from "./views/Schedule"

function App() : React.ReactElement {
    return (
        <MemoryRouter>
            <Menu />
                <main>
                    <Routes>
                        <Route path="/" element={<Backup />} />
                        <Route path="/schedule" element={<Schedule />} />
                    </Routes>
                </main>
        </MemoryRouter>
    )
}

export default App
