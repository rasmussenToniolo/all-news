import './sass/main.scss';
import { useEffect, useState } from 'react';
import * as model from './model';
import { advancedData } from './model';
import {Navbar} from './components/Navbar';
import {Body} from './components/Body';

export type {advancedData}


export const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('us');

  const [searchQuery, setSearchQuery] = useState('');

  const [category, setCategory] = useState('general');

  const [newsData, setNewsData] = useState<model.SuccesfulNewsResponseArr>();

  const [error, setError] = useState<string>('');

  async function getNews(country: string, category: string) {
    setNewsData(undefined);
    setSearchQuery('');
    setError('');

    try{
      const data = await model.fetchNews(country, category);
      setNewsData(data);
    } catch(err) {
      setError(err.message);
    }
  }

  async function getSearchNews(query: string) {
    setNewsData(undefined);
    setError('');

    try {
      const data = await model.fetchQueryNews(query, category);
      setNewsData(data);
      console.log(data);
    } catch(err) {
      setError(err.message);
    }
  }

  async function handleAdvancedSearch(advancedData: advancedData) {
    console.log(advancedData);
    setNewsData(undefined);
    setSearchQuery('');
    setError('');

    try {
      const data = await model.fetchAdvanced(advancedData);
      setNewsData(data);
      console.log(data);

    } catch(err) {
      setError(err.message);
    }
  }

  function backHome() {
    setCategory('general');
    setSearchQuery('');
    setError('');
    getNews(selectedCountry, category);
  }


  useEffect(() => {
    getNews(selectedCountry, category);
  }, [selectedCountry, category]);

  useEffect(() => {
    if(searchQuery) getSearchNews(searchQuery);
  }, [searchQuery]);

  // Have a function that, once something is searched, when the user clicks on the search bar, all text on the search bar is selected so that the user can easily delete the query

  return (
    <>
      <Navbar
        backHome={backHome}
        category={category}
        setCategory={setCategory}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        advancedSearch={handleAdvancedSearch}
      />

      <Body
        backHome={backHome}
        searchQuery={searchQuery}
        data={newsData}
        category={category}
        error={error}
       />
    </>
  )
}
