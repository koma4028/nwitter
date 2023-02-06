import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            <Routes>
                {isLoggedIn ?
                    // Show Home
                    <>
                        <Route
                            exact path="/"
                            element={<Home />}
                        >
                        </Route>
                    </>
                    :
                    // Show Login
                    <Route
                        exact path="/"
                        element={<Auth />}
                    >
                    </Route>
                }
            </Routes>
        </Router>
    );
}

export default AppRouter;