import {BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Index from "./pages/Index"
import Profile from "./pages/Profile"
import Registration from "./pages/Registration"

function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Index} />
                <Route path="/register" Component={Registration}/>
                <Route path="/profile" Component={Profile} />
            </Routes>
        </BrowserRouter>
  )
}

export default App
