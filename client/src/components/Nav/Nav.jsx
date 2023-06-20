import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getByName, FilterByWeight, FilterByHeight, FilterByOrigin, FilterByTemperament, FilterByName, getTemperaments } from "../../redux/actions/actions";
import "./Nav.css";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

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

  const handleFilterByOrigin = () => {
    if (selectedOrigin) {
      dispatch(FilterByOrigin(selectedOrigin));
    }
  };

  const handleFilterByTemperament = (temperament) => {
    dispatch(FilterByTemperament(temperament));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    if (filter === "temperament") {
      setSelectedOrigin("");
    }
  };

  const handleApplyFilter = () => {
    if (selectedFilter === "name") {
      dispatch(FilterByName(searchQuery));
    } else if (selectedFilter === "weight") {
      dispatch(FilterByWeight());
    } else if (selectedFilter === "height") {
      dispatch(FilterByHeight());
    } else if (selectedFilter === "temperament") {
      handleFilterByTemperament(searchQuery);
    }
  };

  return (
    <nav className="Nav">
      <div className="Nav-left">
        <Link to="/home" className="link-texts" onClick={handleHomeClick}>
          Home
        </Link>
        <div className="Nav-separator"></div>
        <Link to="/form" className="link-texts">
          Register dog
        </Link>
        <div className="Nav-separator"></div>
        <Link to="/form" className="link-texts">
          Your dogs
        </Link>
        <div className="Nav-separator"></div>
        <Link to="/random" className="link-texts">
          Random dog
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
              onChange={(event) => handleFilterSelection(event.target.value)}
            >
              <option value="">Select Filter</option>
              <option value="name">Name</option>
              <option value="weight">Weight</option>
              <option value="height">Height</option>
              <option value="temperament">Temperament</option>
            </select>
            {selectedFilter && selectedFilter === "temperament" && (
              <>
                <select
                  value={selectedOrigin}
                  onChange={(event) => setSelectedOrigin(event.target.value)}
                >
                  <option value="">Select Origin</option>
                  <option value="created">Created</option>
                  <option value="api">API</option>
                </select>
                <button onClick={handleFilterByOrigin}>Apply Origin</button>
              </>
            )}
            <button onClick={handleApplyFilter}>Apply Filter</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
