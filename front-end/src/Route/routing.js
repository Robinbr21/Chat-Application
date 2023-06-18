import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "../pages/start";
import Error from "../pages/error";
import Chat from "../pages/chat";
import PrivateRoute from "../Component/privatrRoute";
import UseAuth from '../Hooks/useAuth'


function Routing() {
    const IsAuth = UseAuth()
    console.log("============>>>",UseAuth());
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/chat" element={
                    <PrivateRoute auth={{ isAuthenticated: IsAuth }}>
                        <Chat />
                    </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    )
}

export default Routing;