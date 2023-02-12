import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { myFirebaseApp, fbAuth } from "firebaseInstance";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userObj, setUserObj] = useState(null);

  // Use Hook to add 'onAuthStateChanged' Event Lister to 'useEffect'(= 'Mounting Components' Event Lister)
  useEffect(() => {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])

  return (
    <>
      {/* Show 'AppRouter' only after initializing is finished */}
      {init ?
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
        : "Initializing..."
      }
      < footer >
        &copy; {new Date().getFullYear()} Nwitter
      </footer>

    </>
  );
}

export default App;
