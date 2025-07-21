import { useEffect, useState } from "react";
import filmData from "../data/filmData";

export default function Main() {
    const [films, setFilms] = useState(filmData); 
    const [genres, setGenres] = useState([]); 
    const [selectedGenre, setSelectedGenre] = useState(""); 
    const [filteredFilms, setFilteredFilms] = useState([]); 

    useEffect(() => {
        const uniqueGenres = filmData.map((film) => film.genre).filter((value, index, self) => self.indexOf(value) === index);
        setGenres(uniqueGenres);
    }, []);

    useEffect(() => {
        if (selectedGenre === "") {
            setFilteredFilms(films); 
        } 
        else {
            const filtered = films.filter((film) => film.genre === selectedGenre);
            setFilteredFilms(filtered); 
        }
    }, [selectedGenre, films]); 

    function handleGenreChange(e) {
        setSelectedGenre(e.target.value); 
    }

  return (
    <>
        <div className="d-flex mb-3 w-50">
            <select className="form-select" aria-label="Default select example" onChange={handleGenreChange}  value={selectedGenre}>
                <option value="">Seleziona un genere</option>
                {genres.map((genre, index) => (
                    <option value={genre} key={index}> {genre} </option>
                ))}
            </select>
        </div>
        <div>
            <ul className="list-group">
                {filteredFilms.map((filmData, index) => (
                    <li className="list-group-item" key={index}> <h5>{filmData.title}</h5> </li>
                ))}
            </ul>
        </div>
    </>
  );
}
