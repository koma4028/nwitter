import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { fbAuth } from "firebaseInstance";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // Use Hook to add 'onAuthStateChanged' Event Lister to 'useEffect'(= 'Mounting Components' Event Lister)
  useEffect(() => {
    fbAuth.onAuthStateChanged((user) => {
      if (user) setUserObj(user);
      setInit(true);
    });
  }, [])

  return (
    <>
      {/* Show 'AppRouter' only after initializing is finished */}
      {init ?
        <AppRouter
          isLoggedIn={userObj}
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
