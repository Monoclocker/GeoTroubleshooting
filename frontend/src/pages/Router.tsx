import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage, RegistrationPage } from "../modules/auth-module/exports"
import { DashboardPage } from "../modules/dashboard-module/exports"
import { Profile } from "../modules/profile-module/exports"
import { MapPage } from "../modules/map-module/exports"

export const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegistrationPage />} />
                <Route path="dashboard" element={<DashboardPage />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="map" element={<MapPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}