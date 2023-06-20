import React, { useEffect, useState } from "react";
import "./Home.css";
import CardList from "../CardList/CardList";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, FilterByTemperament } from "../../redux/actions/actions";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [selectedTemperament, setSelectedTemperament] = useState("");

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(FilterByTemperament(selectedTemperament));
  }, [dispatch, selectedTemperament]);

  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to the dog's page!</h1>
      <CardList allDogs={allDogs} />
    </div>
  );
};

export default Home;
