// eslint-disable jsx-a11y/click-events-have-key-events
import { useEffect, useState } from "react";
import {advancedData} from '../../App';
import {AdvancedSearchBox} from './AdvancedSearchBox';

interface SearchBoxProps {
  setQuery: (query: string) => void;
  query: string;
  handleAdvanced: (data: advancedData) => void;
  onDemo: boolean;
}

export function SearchBox(props: SearchBoxProps) {
  const [input, setInput] = useState<string>("");

  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);

  function handleSearch() {
    if(props.onDemo) return;

    props.setQuery(input);
  }

  function handleAdvancedSearch(data: advancedData) {
    if(props.onDemo) return;

    props.handleAdvanced(data);
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
  
      <button onClick={() => setAdvancedOpen(true)} className="advanced-search-btn">Advanced search query</button>
    </div>

    <AdvancedSearchBox open={advancedOpen} setOpen={setAdvancedOpen} handleAdvancedSearch={handleAdvancedSearch} />

    </>
  );
}
