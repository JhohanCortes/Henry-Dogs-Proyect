import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getByName,
  FilterByWeight,
  FilterByHeight,
  FilterByOrigin,
  FilterByTemperament,
  FilterByName,
  FilterByAge,
  invertDogsState,
  clearFilters,
  getTemperaments,
} from "../../redux/actions/actions";
import "./Nav.css";

import landingBack from "../../recourses/footprint.png";

const Nav = () => {
  const [isAscending, setIsAscending] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemp, setSelectedTemp] = useState("Select temperament");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
    handleFilterByOrigin();
  }, [dispatch, selectedOrigin]);

  const handleSearch = () => {
    dispatch(getByName(searchQuery));
    setSearchQuery("");
  };

  const handleHomeClick = () => {
    setSearchQuery("");
    dispatch(getByName(""));
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleButtonClick = () => {
    dispatch(invertDogsState());
    setIsAscending(!isAscending);
  };

  const handleClear = () => {
    dispatch(clearFilters());
    setIsAscending(true);
    setSelectedFilter("");
  };

  const handleFilterByOrigin = () => {
    if (selectedOrigin === "all") {
      dispatch(FilterByOrigin("all"));
    } else if (selectedOrigin === "created") {
      dispatch(FilterByOrigin("created"));
    } else if (selectedOrigin === "api") {
      dispatch(FilterByOrigin("api"));
    }
  };

  const handleFilterByTemperament = (temperament) => {
    dispatch(FilterByTemperament(temperament));
    setSelectedTemp(temperament)
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
  };

  const handleOrderSelection = (filter) => {
    setSelectedOrder(filter);
    if (filter === "temperament") {
      setSelectedOrigin("");
    }
  };

  const handleApplyFilter = () => {
    if (selectedOrder === "nameAsc") {
      dispatch(FilterByName("asc"));
    } else if (selectedOrder === "nameDesc") {
      dispatch(FilterByName("desc"));
    } else if (selectedOrder === "weightAsc") {
      dispatch(FilterByWeight("asc"));
    } else if (selectedOrder === "weightDesc") {
      dispatch(FilterByWeight("desc"));
    } else if (selectedOrder === "heightAsc") {
      dispatch(FilterByHeight("asc"));
    } else if (selectedOrder === "heightDesc") {
      dispatch(FilterByHeight("desc"));
    } else if (selectedOrder === "ageAsc") {
      dispatch(FilterByAge("asc"));
    } else if (selectedOrder === "ageDesc") {
      dispatch(FilterByAge("desc"));
    } else if (selectedOrder === "temperament") {
      handleFilterByTemperament(searchQuery);
    }
  };

  return (
    <nav className="Nav">
      <div className="Nav-left">
        <Link to="/" className="link-texts">
          <img src={landingBack} alt="landingBack" />
        </Link>
        <Link to="/home" className="link-texts" onClick={handleHomeClick}>
          Home
        </Link>
        <div className="Nav-separator"></div>
        <Link to="/form" className="link-texts">
          Register breed
        </Link>
      </div>
      <div className="Nav-center">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search dogs..."
            value={searchQuery}
            onChange={handleChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="Nav-right">
        <div className={`filter-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="menu-toggle" onClick={toggleMenu}>
            Filter By
          </div>
          <div className="menu-content">
            <select
              value={selectedFilter}
              onChange={(event) => {
                handleFilterSelection(event.target.value);
                handleOrderSelection(event.target.value + "Asc");
              }}
            >
              <option value="">Select Filter</option>
              <option value="name">Name</option>
              <option value="weight">Weight</option>
              <option value="height">Height</option>
              <option value="temperament">Temperament</option>
              <option value="age">Age</option>
            </select>

            <select
              value={selectedOrigin}
              onChange={async (event) => {
                await setSelectedOrigin(event.target.value);
                console.log(event.target.value);
              }}
            >
              <option value="">Origen</option>
              <option value="all">Todos</option>
              <option value="api">API</option>
              <option value="created">Creados</option>
            </select>

            {selectedFilter === "temperament" && (
              <select
                value={searchQuery}
                onChange={(event) =>
                  handleFilterByTemperament(event.target.value)
                }
              >
                <option value="">{selectedTemp}</option>
                {temperaments.map((temperament) => (
                  <option key={temperament.id} value={temperament.name}>
                    {temperament}
                  </option>
                ))}
              </select>
            )}

            {selectedFilter === "name" && (
              <>
                <select
                  value={selectedOrder}
                  onChange={(event) => handleOrderSelection(event.target.value)}
                >
                  <option value="nameAsc">A - Z</option>
                  <option value="nameDesc">Z - A</option>
                </select>
              </>
            )}

            {selectedFilter === "weight" && (
              <>
                <select
                  value={selectedOrder}
                  onChange={(event) => handleOrderSelection(event.target.value)}
                >
                  <option value="weightAsc">min</option>
                  <option value="weightDesc">max</option>
                </select>
              </>
            )}

            {selectedFilter === "height" && (
              <>
                <select
                  value={selectedOrder}
                  onChange={(event) => handleOrderSelection(event.target.value)}
                >
                  <option value="heightAsc">min</option>
                  <option value="heightDesc">max</option>
                </select>
              </>
            )}

            {selectedFilter === "age" && (
              <>
                <select
                  value={selectedOrder}
                  onChange={(event) => handleOrderSelection(event.target.value)}
                >
                  <option value="ageAsc">min</option>
                  <option value="ageDesc">max</option>
                </select>
              </>
            )}

            <button onClick={handleButtonClick}>
              {isAscending ? "Ascendent" : "descendent"}
            </button>
            <br></br>
            <button onClick={handleClear}>clear</button>
            <br></br>

            {selectedFilter !== "temperament" && (
              <>
                <button onClick={handleApplyFilter}>Apply Filter</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
