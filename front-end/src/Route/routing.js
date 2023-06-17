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


function Routing() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/chat" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="*" element={<Error />} />
            </Routes> 
        </Router>
    )
}

export default Routing;