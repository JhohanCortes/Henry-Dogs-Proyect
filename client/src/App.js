import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
// import RandomDog from "./components/RandomDog/RandomDog";
import CreatedDogs from "./components/CreatedDogs/CreatedDogs";
import "./App.css";

function App() {

  return (
    <div className="App">
      <Nav />
      <div className="app-pages">
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route exact path="/form" component={Form} />
        <Route path="/form/:id" component={Form} />
        {/* <Route exact path="/random" component={RandomDog} /> */}
        <Route exact path="/yourbreeds" component={CreatedDogs} />

      </div>
      <Footer />
    </div>
  );
}

export default App;
