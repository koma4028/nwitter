import React from "react";
import AppRouter from "components/Router";
import myFirebaseApp from "firebaseInstance";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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
