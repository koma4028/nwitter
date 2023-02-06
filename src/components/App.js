import React from "react";
import AppRouter from "components/Router";
import { myFirebaseApp, fbAuth } from "firebaseInstance";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState((fbAuth.currentUser === null ? false : true));
  return (
    <>
      <AppRouter
        isLoggedIn={isLoggedIn}
      />
      <footer>
        &copy; {new Date().getFullYear()} Nwitter
      </footer>
    </>
  );
}

export default App;
