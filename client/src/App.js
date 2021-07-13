import "./App.css";
import Login from "./components/Login";
import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import app, { googleAuthProvider } from "./firebase";
const auth = app.auth();

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return unsubscribe;
  }, []);

  function loginWithGoogle() {
    auth.signInWithPopup(googleAuthProvider);
  }

  function logout () {
    auth.signOut();
  }

  return (
    <>
      {user ? (
        <Dashboard user={user} logout={logout} />
      ) : (
        <Login setUser={setUser} loginWithGoogle={loginWithGoogle} />
      )}
    </>
  );
}

export default App;
