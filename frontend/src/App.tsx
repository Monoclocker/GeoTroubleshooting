import {BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Index from "./pages/Index"
import Profile from "./pages/Profile"
import Registration from "./pages/Registration"
import RootStore from "./stores/RootStore"
import { RootContext } from "./components/RootContext"

function App() {

    return (
        <RootContext.Provider value={new RootStore()}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={Index} />
                    <Route path="/register" Component={Registration}/>
                    <Route path="/profile" Component={Profile} />
                </Routes>
            </BrowserRouter>
        </RootContext.Provider>
  )
}

export default App
