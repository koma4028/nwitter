import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navagation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ?
                    // Show Home
                    <>
                        <Route
                            exact path="/"
                            element={<Home />}
                        >
                        </Route>
                        <Route
                            exact path="/profile"
                            element={<Profile />}
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