import './sass/main.scss';
import { useEffect, useState } from 'react';
import * as model from './model';
import {Navbar} from './components/Navbar';
import {Body} from './components/Body';

// Navbar: search!, countries!, categories!
// Body: cards
// Card: article popup
// Article popup: reccomendations

export const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('us');

  const [searchQuery, setSearchQuery] = useState('');

  const [category, setCategory] = useState('general');

  const [newsData, setNewsData] = useState<any>();

  async function getTopNews(country: string) {
    const data = await model.fetchTopNews(country);
    setNewsData(data);
    console.log(data);
  }

  useEffect(() => {
    // getTopNews(selectedCountry);
  }, [])

  // Have a function that, once something is searched, when the user clicks on the search bar, all text on the search bar is selected so that the user can easily delete the query

  return (
    <>
      <Navbar
        category={category}
        setCategory={setCategory}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        setSearchQuery={setSearchQuery}
      />

      <Body />
    </>
  )
}
