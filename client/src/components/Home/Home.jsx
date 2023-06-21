import React, { useEffect, useState } from "react";
import "./Home.css";
import CardList from "../CardList/CardList";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, FilterByTemperament } from "../../redux/actions/actions";
import cheems from "../../recourses/Loadming.png";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageRange = 2; // Número de páginas mostradas a cada lado de la página actual
    const pages = [];
    let startPage = Math.max(1, currentPage - pageRange);
    let endPage = Math.min(totalPages, currentPage + pageRange);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [selectedTemperament, setSelectedTemperament] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDog, setIsLoadingDog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsToShow = 16; // Establece la cantidad de tarjetas a mostrar

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDogs());
      await dispatch(getTemperaments());
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(FilterByTemperament(selectedTemperament));
  }, [dispatch, selectedTemperament]);

  const handleDogClick = () => {
    setIsLoadingDog(true);
  };

  const totalDogs = allDogs.length;
  const totalPages = Math.ceil(totalDogs / cardsToShow);

  const indexOfLastDog = currentPage * cardsToShow;
  const indexOfFirstDog = indexOfLastDog - cardsToShow;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to the dog's page!</h1>
      {isLoading ? (
        <div className="loading-spinner">
          <img src={cheems} alt="Loading" />
          <p>Loadming...</p>
        </div>
      ) : (
        <>
          <CardList allDogs={currentDogs} onDogClick={handleDogClick} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default Home;
