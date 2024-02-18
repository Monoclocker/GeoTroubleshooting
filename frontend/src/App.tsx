import {BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Index from "./pages/Index"
import Profile from "./pages/Profile"

function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Index} />
                <Route path="/profile" Component={Profile} />
            </Routes>
        </BrowserRouter>
  )
}

export default App
