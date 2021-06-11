import {getJSON, timeout} from './helpers';
import {TIMEOUT_SEC, COUNTRIES_URL, NEWS_API_TOP_URL} from './config';

export function sayHi() {
  console.log('hi');
}

export async function getCountriesData(codes: string[]) {
  try {
    const countriesData = await Promise.race([getJSON(COUNTRIES_URL(codes)), timeout(TIMEOUT_SEC)]);
    
    const countriesDataArrObj: {name: string, flag: string, code: string}[] = countriesData.map((data: {nativeName: string, flag: string, alpha2Code: string})=> ({
      name: data.nativeName,
      flag: data.flag,
      code: data.alpha2Code.toLowerCase()
    }));

    return countriesDataArrObj;
  } catch(err) {
    throw err;
  }
}

export async function fetchTopNews(country: string) {
  try{
    const newsData = await getJSON(NEWS_API_TOP_URL(country));

    return newsData;

  } catch(err) {
    throw err;
  }
}