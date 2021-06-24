// eslint-disable jsx-a11y/click-events-have-key-events
import { useEffect, useState } from "react";
import {advancedData} from '../App';

interface SearchBoxProps {
  setQuery: (query: string) => void;
  query: string;
  handleAdvanced: (data: advancedData) => void;
}

export function SearchBox(props: SearchBoxProps) {
  const [input, setInput] = useState<string>("");

  function handleSearch() {
    props.setQuery(input);
  }

  function handleAdvancedSearch(e: any) {
    e.preventDefault();
    console.log('advanced');
    props.handleAdvanced({titleOnly: false});
  }

  useEffect(() => {
    setInput(props.query);
  }, [props.query]);

  return (
    <>
    <div className="search-container">
      <div className="search-box">
        <input
          onKeyPress={(e: any) => (e.key === "Enter" ? handleSearch() : "")}
          onChange={(e: any) => setInput(e.target.value)}
          value={input}
          className="search-box__input"
          type="text"
          placeholder="Search..."
        />
  
        <div onClick={handleSearch} className="search-box__search-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
  
      </div>
  
      <button className="advanced-search-btn">Advanced search query</button>
    </div>

    <div className="advanced-search-box">
      <div className="search-container">
        <form action="#" className="search-form">
          <input id="query" type="text" className="search__query--input input" placeholder="Query" />
          <label htmlFor="query" className="search__query--label input-label">Query</label>

          <input id="exact-query" type="text" className="search__exact-query--input input" placeholder="Exact phrase" />
          <label htmlFor="exact-query" className="search__exact-query--label input-label">Exact phrase</label>
          
          <div className="checkbox">
            <input id="title-only" type="checkbox" className="search__title-only--check" />
            <label htmlFor="title-only" className="search__title-only--label">Title search only</label>
          </div>

          <div className="selectors">
            <div className="selector">
              <label htmlFor="lang-selector" className="search__language--label">Language</label>

              <select name="lang" id="lang-selector" className="search__language--selector">
                <option value="ar" className="search__language--option">Arabic</option>
                <option value="de" className="search__language--option">Deutsch</option>
                <option value="en" className="search__language--option">English</option>
                <option value="es" className="search__language--option">Spanish</option>
                <option value="fr" className="search__language--option">French</option>
                <option value="he" className="search__language--option">he</option>
                <option value="it" className="search__language--option">Italian</option>
                <option value="nl" className="search__language--option">nl</option>
                <option value="no" className="search__language--option">no</option>
                <option value="pt" className="search__language--option">Portuguese</option>
                <option value="re" className="search__language--option">Russian</option>
                <option value="se" className="search__language--option">se</option>
                <option value="ud" className="search__language--option">ud</option>
                <option value="zh" className="search__language--option">zh</option>
              </select>
            </div>
            
            <div className="selector">
              <label htmlFor="sort-selector" className="search__sort--label">Sort by</label>

              <select name="sort" id="sort-selector" className="search__sort--selector">
                <option value="publishedAt" className="search__sort--option">Date</option>
                <option value="relevancy" className="search__sort--option">Relevancy</option>
                <option value="popularity" className="search__sort--option">Popularity</option>
              </select>
            </div>
          </div>


          <button onClick={handleAdvancedSearch} className="search__search-btn">Search</button>
        </form>
      </div>
    </div>
    </>
  );
}
