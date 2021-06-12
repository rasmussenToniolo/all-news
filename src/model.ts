import {getJSON, timeout} from './helpers';
import {TIMEOUT_SEC, COUNTRIES_URL, NEWS_API_URL} from './config';


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


export interface AnalyzedNewsArr {
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
    priority: number;
  }[];
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

function analyzeData(data: SuccesfulNewsResponseArr) {
  // Analyze data to determine how much real estate should the article occupy

  // Full article (image, description & content) 1
  // Articles with content and image but no description 2
  // Articles with content and description but no image 3
  // Articles with description but no image nor content 4
  // Articles only with title 5

  const analyzedDataArticles = data.articles.map(article => {
    // Algorithm to analyze article
    return {...article, priority: 1}
  });

  const analyzedData: AnalyzedNewsArr = {articles: analyzedDataArticles};

  return analyzedData;
}

export async function fetchNews(country: string, category: string) {
  try{
    const newsData: SuccesfulNewsResponseArr = await getJSON(NEWS_API_URL(country, category));

    const analyzedData: AnalyzedNewsArr = analyzeData(newsData);

    return analyzedData;

  } catch(err) {
    throw err;
  }
}