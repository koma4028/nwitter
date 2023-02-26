import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { fbAuth } from "firebaseInstance";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    const user = fbAuth.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  // Use Hook to add 'onAuthStateChanged' Event Lister to 'useEffect'(= 'Mounting Components' Event Lister)
  useEffect(() => {
    fbAuth.onAuthStateChanged((user) => {
      if (user) setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => user.updateProfile(args),
      });
      setInit(true);
    });
  }, [])

  return (
    <>
      {/* Show 'AppRouter' only after initializing is finished */}
      {init ?
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={userObj}
          userObj={userObj}
        />
        : "Initializing..."
      }
      < footer >
        &copy;{new Date().getFullYear()} Bulweeter
      </footer>

    </>
  );
}

export default App;
