// URL's, constants

export const TIMEOUT_SEC = 15;

export const COUNTRIES_URL = (codes: string[]) => `https://restcountries.eu/rest/v2/alpha?codes=${codes.map(code => `${code};`).join('')}`;

const countries = 'aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza';

const countriesArr: string[] = [];

for(let i = 0; i < countries.length; i+=2) {
  countriesArr.push(`${countries[i]}${countries[i+1]}`);
}

const NEWS_API_KEY = '68a23fc789574f65a23b77c0de4e7aed';

export const NEWS_API_URL = (country: string, category: string) => `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=100&apiKey=${NEWS_API_KEY}`;

export const NEWS_API_SEARCH_URL = (query: string, category: string) => `https://newsapi.org/v2/top-headlines?q=${query}&category=${category}&apiKey=${NEWS_API_KEY}`

export {countriesArr}
