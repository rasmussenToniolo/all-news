import { countriesArr } from "../config";
import { Selector } from "./Selector";
import { SearchBox } from "./SearchComponents/SearchBox";
import {advancedData} from '../App';
import { useState } from "react";

interface NavbarProps {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  setSelectedCountry: (country: string) => void;
  selectedCountry: string;
  category: string;
  setCategory: (cat: string) => void;
  backHome: () => void;
  advancedSearch: (data: advancedData) => void;
}

export const Navbar = (props: NavbarProps) => {
  const categories = [
    "General",
    "Business",
    "Technology",
    "Science",
    "Health",
    "Entertainment",
    "Sports",
  ];

  const [catOpen, setCatOpen] = useState<boolean>(false);

  return (
    <div className="navbar">
      <div className="navbar__selector">
        <Selector
          selectedCountry={props.selectedCountry}
          countries={countriesArr}
          setCountry={props.setSelectedCountry}
        />
      </div>

      <h1 onClick={props.backHome} className="navbar__title">All News</h1>

      <div className="navbar__search-box">
        <SearchBox query={props.searchQuery} setQuery={props.setSearchQuery} handleAdvanced={props.advancedSearch} />
      </div>

      <div className="navbar__categories">
        <button onClick={() => setCatOpen(prev => !prev)} className="navbar__categories--expand-btn hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <ul className={`navbar__categories-list ${catOpen ? 'visible' : ''}`}>
          {categories.map((cat) => (
            <li
              className={`navbar__categories-list--item${
                props.category === cat.toLowerCase() ? " selected-cat" : ""
              }`}
              key={cat.toLowerCase()}
              onClick={() => props.setCategory(cat.toLowerCase())}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}