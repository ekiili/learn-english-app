import { Route, Routes } from 'react-router-dom'

export const AppRoutes = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </main>
    )
}