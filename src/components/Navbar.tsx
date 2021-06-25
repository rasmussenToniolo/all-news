import { countriesArr } from "../config";
import { Selector } from "./Selector";
import { SearchBox } from "./SearchComponents/SearchBox";
import {advancedData} from '../App';

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
        <ul className="navbar__categories-list">
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