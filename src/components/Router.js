import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navagation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ?
                    // Show Home
                    <>
                        <Route
                            exact path="/"
                            element={<Home userObj={userObj} />}
                        >
                        </Route>
                        <Route
                            exact path="/profile"
                            element={<Profile refreshUser={refreshUser} userObj={userObj} />}
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