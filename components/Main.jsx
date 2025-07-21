import { useEffect, useState } from "react";
import filmData from "../data/filmData";

export default function Main() {
    const [films, setFilms] = useState(filmData); 
    const [genres, setGenres] = useState([]); 
    const [selectedGenre, setSelectedGenre] = useState(""); 
    const [filteredFilms, setFilteredFilms] = useState([]); 
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const uniqueGenres = filmData.map((film) => film.genre).filter((value, index, self) => self.indexOf(value) === index);
        setGenres(uniqueGenres);
    }, []);

    useEffect(() => {
        const filtered = films.filter((film) => {
            // filter genre if selected
            const genreMatch = selectedGenre === "" || film.genre === selectedGenre;
            //filter tilte if written
            const titleMatch = film.title.toLowerCase().includes(searchQuery.toLowerCase());
            // use both filters
            return genreMatch && titleMatch;
        });
        setFilteredFilms(filtered);
    }, [selectedGenre, searchQuery, films]);



    function handleGenreChange(e) {
        setSelectedGenre(e.target.value); 
    }

    function handleSearchChange(e) {
        setSearchQuery(e.target.value); 
    }

  return (
    <>
        <div className="d-flex mb-3 ">
            <input type="text" className="form-control w-75" placeholder="Cerca per titolo" value={searchQuery} onChange={handleSearchChange}/>
            <select className="form-select w-25" aria-label="Default select example" onChange={handleGenreChange}  value={selectedGenre}>
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
