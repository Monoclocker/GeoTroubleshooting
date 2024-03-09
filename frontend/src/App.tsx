import {BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Index from "./pages/Index"
import Profile from "./pages/Profile"
import Registration from "./pages/Registration"
import RootStore from "./stores/RootStore"
import { RootContext } from "./components/RootContext"
import { MapDashboard } from "./components/MapBoard"
import Dashboard from "./pages/Dashboard"

function App() {

    return (
        <RootContext.Provider value={new RootStore()}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="login" element={<Index/> } />
                    <Route path="register" element={<Registration />} />
                    <Route path="dashboard" element={<Dashboard />}>
                        <Route path="profile" element={<Profile />} />
                        <Route path="map" element={<MapDashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </RootContext.Provider>
  )
}

export default App
