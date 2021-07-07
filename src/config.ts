// URL's, constants
import { advancedData } from "./model";

export const TIMEOUT_SEC = 30;

export const COUNTRIES_URL = (codes: string[]) => `https://restcountries.eu/rest/v2/alpha?codes=${codes.map(code => `${code};`).join('')}`;

const countries = 'aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza';

const countriesArr: string[] = [];

for(let i = 0; i < countries.length; i+=2) {
  countriesArr.push(`${countries[i]}${countries[i+1]}`);
}

const NEWS_API_KEY = '68a23fc789574f65a23b77c0de4e7aed';

export const NEWS_API_URL = (country: string, category: string) => `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=100&apiKey=${NEWS_API_KEY}2`;

export const NEWS_API_SEARCH_URL = (query: string, category: string) => `https://newsapi.org/v2/top-headlines?q=${query}&category=${category}&apiKey=${NEWS_API_KEY}`;

// To make sense of the advanced url, refer to https://newsapi.org/docs/endpoints/everything
export const NEWS_API_ADVANCED_URL = (data: advancedData) => `https://newsapi.org/v2/everything?${data.titleOnly ? 'qInTitle=' : 'q='}${data.query || ''}${data.exact ? `"${data.exact}"` : ''}${data.mustWords?.map(word => `+${word}`) || ''}${data.skipWords?.map(word => `-${word}`) || ''}${data.mustDomains ? `&domains=${data.mustDomains.join(',')}` : ''}${data.skipDomains ? `&excludeDomains=${data.skipDomains.join(',')}` : ''}${data.lang ? `&language=${data.lang}` : ''}${data.sort ? `&sortBy=${data.sort}` : ''}${data.date ? `${data.date.from ? `&from=${data.date.from}` : ''}${data.date.to ? `&to=${data.date.to}` : ''}` : ''}&apiKey=${NEWS_API_KEY}`;

export {countriesArr}
