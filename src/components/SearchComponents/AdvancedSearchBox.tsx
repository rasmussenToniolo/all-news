import { useState } from 'react';
import {advancedData} from '../../App';
// titleOnly: boolean;
// query?: string;
// exact?: string;
// skipWords?: string[];
// mustWords?: string[];
// onlyDomains?: string[];
// skipDomains?: string[];
// lang?: string;
// sort?: string;
// date?: {
//   from?: string;
//   to?: string;
// };

interface AdvancedSearchBoxData {
  handleAdvancedSearch: (data: advancedData) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export function AdvancedSearchBox(props: AdvancedSearchBoxData) {

  const [searchData, setSearchData] = useState<advancedData>({
    titleOnly: false,
    skipWords: [],
    mustWords: [],
    skipDomains: [],
    mustDomains: [],
  });

  const [skippedWord, setSkippedWord] = useState<string>('');
  const [mustWord, setMustWord] = useState<string>('');
  const [skippedDomain, setSkippedDomain] = useState<string>('');
  const [mustDomain, setMustDomain] = useState<string>('');


  // Create states for each input box ///
  // Add value / onChange to inputs ///
  // Add onClick to 'add' button so that the respective input state is pushed to the respective array ///
  // Handle repeated tags ///
  // Add function to close button of tag //
  // When the advanced search box is opened, focus it
  // Make the advanced box be in the body on top of data

  function setInvalidInputBorder(target: any) {
    target.style.border = '1px solid red';

    setTimeout(() => {
      target.style.border = null;
    }, 3000);
  }

  // BUG BUG BUG
  // When enter is pressed on inputs other than the filter out words one, an 'undefined' is added to the filter out words tags 

  function handleSkippedWordAdd(e: any) {
    e.preventDefault();
    if(searchData.skipWords && searchData.skipWords.some((word) => word === skippedWord)) {
      // Set input border to red for 3 seconds
      const inputBox = e.target.previousSibling;

      setInvalidInputBorder(inputBox);

      return;
    };

    setSearchData(prev => ({...prev, skipWords: [...(prev.skipWords ? [...prev.skipWords] : []), skippedWord]}));
    setSkippedWord('');
  }

  function handleMustWordAdd(e: any) {
    e.preventDefault();
    if(searchData.mustWords && searchData.mustWords.some((word) => word === mustWord)) {
      // Set input border to red for 3 seconds
      const inputBox = e.target.previousSibling;

      setInvalidInputBorder(inputBox);

      return;
    };

    setSearchData(prev => ({...prev, mustWords: [...(prev.mustWords ? [...prev.mustWords] : []), mustWord]}));
    setMustWord('');
  }

  function handleSkippedDomainAdd(e: any) {
    e.preventDefault();
    if(searchData.skipDomains && searchData.skipDomains.some((domain) => domain === skippedDomain)) {
      // Set input border to red for 3 seconds
      const inputBox = e.target.previousSibling;

      setInvalidInputBorder(inputBox);

      return;
    };

    setSearchData(prev => ({...prev, skipDomains: [...(prev.skipDomains ? [...prev.skipDomains] : []), skippedDomain]}));
    setSkippedDomain('');
  }

  function handleMustDomainAdd(e: any) {
    e.preventDefault();
    if(searchData.mustDomains && searchData.mustDomains.some((domain) => domain === mustDomain)) {
      // Set input border to red for 3 seconds
      const inputBox = e.target.previousSibling;

      setInvalidInputBorder(inputBox);

      return;
    };

    setSearchData(prev => ({...prev, mustDomains: [...(prev.mustDomains ? [...prev.mustDomains] : []), mustDomain]}));
    setMustDomain('');
  }

  function handleCloseTag(e: any, box: string) {
    const targetWord = e.target.closest('.keywords-box__tags-tag--close-btn').previousSibling.textContent;

    switch(box) {
      case 'skipWords':
        setSearchData(prev => ({...prev, skipWords: prev.skipWords?.filter(word => word !== targetWord)}));
        break;
      
      case 'mustWords':
        setSearchData(prev => ({...prev, mustWords: prev.mustWords?.filter(word => word !== targetWord)}));
        break;
      
      case 'skipDomains':
        setSearchData(prev => ({...prev, skipDomains: prev.skipDomains?.filter(word => word !== targetWord)}));
        break;

      case 'mustDomains':
        setSearchData(prev => ({...prev, mustDomains: prev.mustDomains?.filter(word => word !== targetWord)}));
        break;
      
      default:
        return;
    }
  }
  

  function onSearch(e: any) {
    e.preventDefault();
    props.handleAdvancedSearch(searchData);
    props.setOpen(false);
    console.log(searchData);
  }

  return (
    <div className={`advanced-search-box${!props.open ? ' hidden' : ''}`}>
      <div className="search-container">
        <button onClick={() => props.setOpen(false)} className="search-container__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <form action="#" className="search-form">
          <input value={searchData?.query || ''} onChange={(e: any) => setSearchData(prev => ({...prev, query: e.target.value}))} id="query" type="text" className="search__query--input input" placeholder="Query" />
          <label htmlFor="query" className="search__query--label input-label">Query</label>

          <input value={searchData?.exact || ''} onChange={(e: any) => setSearchData(prev => ({...prev, exact: e.target.value}))} id="exact-query" type="text" className="search__exact-query--input input" placeholder="Exact phrase" />
          <label htmlFor="exact-query" className="search__exact-query--label input-label">Exact phrase</label>
          
          <div className="checkbox">
            <input checked={searchData.titleOnly} onChange={() => setSearchData(prev => ({...prev, titleOnly: !prev.titleOnly}))} id="title-only" type="checkbox" className="search__title-only--check" />
            <label htmlFor="title-only" className="search__title-only--label">Title search only</label>
          </div>

          <div className="selectors">
            <div className="selector">
              <label htmlFor="lang-selector" className="search__language--label">Language</label>

              <select value={searchData.lang || 'default'} onChange={(e: any) => {setSearchData(prev => ({...prev, lang: e.target.value}))}} name="lang" id="lang-selector" className="search__language--selector">
                <option value="default" className="search__language--option">All</option>
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

              <select value={searchData.sort || 'publishedAt'} onChange={(e: any) => {setSearchData(prev => ({...prev, sort: e.target.value}))}} name="sort" id="sort-selector" className="search__sort--selector">
                <option value="publishedAt" className="search__sort--option">Date</option>
                <option value="relevancy" className="search__sort--option">Relevancy</option>
                <option value="popularity" className="search__sort--option">Popularity</option>
              </select>
            </div>
          </div>

          <p className="keywords-box-container__title">Tags</p>

          <div className="keywords-box-container">
            <div className="keywords-box">
              <p className="keywords-box__title">Filter out words</p>
              <div className="keywords-box__input">
                <input value={skippedWord} onChange={(e: any) => {setSkippedWord(e.target.value)}} type="text" className="keywords-box__input--input" placeholder="Word to filter out..." />
                <button onClick={handleSkippedWordAdd} className="keywords-box__input--add-btn">Add</button>
              </div>

              <div className="keywords-box__tags">
                {searchData.skipWords?.map(word => (
                  <div key={`skipWords-${word}`} className="keywords-box__tags-tag">
                    <p className="keywords-box__tags-tag--text">{word}</p>
                    <span onClick={(e: any) => {handleCloseTag(e, 'skipWords')}} className="keywords-box__tags-tag--close-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="keywords-box">
              <p className="keywords-box__title">Must words</p>
              <div className="keywords-box__input">
                <input value={mustWord} onChange={(e: any) => {setMustWord(e.target.value)}} type="text" className="keywords-box__input--input" placeholder="Word that is a must..." />
                <button onClick={handleMustWordAdd} className="keywords-box__input--add-btn">Add</button>
              </div>

              <div className="keywords-box__tags">
                {searchData.mustWords?.map(word => (
                  <div key={`mustWords-${word}`} className="keywords-box__tags-tag">
                    <p className="keywords-box__tags-tag--text">{word}</p>
                    <span onClick={(e: any) => {handleCloseTag(e, 'mustWords')}} className="keywords-box__tags-tag--close-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="keywords-box">
              <p className="keywords-box__title">Filter out domains</p>
              <div className="keywords-box__input">
                <input value={skippedDomain} onChange={(e: any) => {setSkippedDomain(e.target.value)}} type="text" className="keywords-box__input--input" placeholder="Domain to filter out..." />
                <button onClick={handleSkippedDomainAdd} className="keywords-box__input--add-btn">Add</button>
              </div>

              <div className="keywords-box__tags">
                {searchData.skipDomains?.map(word => (
                  <div key={`skipDomains-${word}`} className="keywords-box__tags-tag">
                    <p className="keywords-box__tags-tag--text">{word}</p>
                    <span onClick={(e: any) => {handleCloseTag(e, 'skipDomains')}} className="keywords-box__tags-tag--close-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="keywords-box">
              <p className="keywords-box__title">Must domains</p>
              <div className="keywords-box__input">
                <input value={mustDomain} onChange={(e: any) => {setMustDomain(e.target.value)}} type="text" className="keywords-box__input--input" placeholder="Domain that is a must..." />
                <button onClick={handleMustDomainAdd} className="keywords-box__input--add-btn">Add</button>
              </div>

              <div className="keywords-box__tags">
                {searchData.mustDomains?.map(word => (
                  <div key={`mustDomains-${word}`} className="keywords-box__tags-tag">
                    <p className="keywords-box__tags-tag--text">{word}</p>
                    <span onClick={(e: any) => {handleCloseTag(e, 'mustDomains')}} className="keywords-box__tags-tag--close-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={onSearch} className="search__search-btn">Search</button>
        </form>
      </div>
    </div>
  )
}
