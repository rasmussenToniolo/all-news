import {getJSON, timeout} from './helpers';
import {TIMEOUT_SEC, COUNTRIES_URL, NEWS_API_URL, NEWS_API_SEARCH_URL, NEWS_API_ADVANCED_URL} from './config';


export interface SuccesfulNewsResponseArr {
  status: "ok";
  totalResults: number;
  articles: {
    source: {
      id?: string;
      name: string;
    },
    author?: string;
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
  }[];
}

export interface advancedData {
  titleOnly: boolean;
  query?: string;
  exact?: string;
  skipWords?: string[];
  mustWords?: string[];
  mustDomains?: string[];
  skipDomains?: string[];
  lang?: string;
  sort?: string;
  date?: {
    from?: string;
    to?: string;
  };
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


export async function fetchNews(country: string, category: string) {
  try{
    const newsData: SuccesfulNewsResponseArr = await Promise.race([getJSON(NEWS_API_URL(country, category)), timeout(TIMEOUT_SEC)]);
  
    return newsData;
  } catch(err) {
    throw err;
  }
}

export async function fetchQueryNews(query: string, category: string) {
  try {
    const newsData: SuccesfulNewsResponseArr = await Promise.race([getJSON(NEWS_API_SEARCH_URL(query, category)), timeout(TIMEOUT_SEC)]);

    return newsData;
  } catch(err) {
    throw err;
  }
}

export async function fetchAdvanced(data: advancedData) {
  try {
    const newsData: SuccesfulNewsResponseArr = await Promise.race([getJSON(NEWS_API_ADVANCED_URL(data)), timeout(TIMEOUT_SEC)]);

    return newsData;
  } catch(err) {
    throw err;
  }
}