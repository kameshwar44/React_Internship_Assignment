import React from "react";
import Signup from "./Components/Home/Signup";
import { Route, Routes } from "react-router";
import Post from "./Components/Post/Post";

function App() {
  return (
    <>
     <Routes>
        <Route exact path="/" element={<Signup />}>
          Signup
        </Route>
        <Route exact path="/post" element={<Post/>}>
          Post
        </Route>
      </Routes>

    </>
  );
}

export default App;
