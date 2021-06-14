import { useEffect, useState } from 'react';
import { SuccesfulNewsResponseArr } from '../model';
import {Card} from './Helpers/Card';
import {LoadingIcon} from './LoadingIcon';
import {Article} from './Article';

interface BodyProps {
  data?: SuccesfulNewsResponseArr;
  searchQuery: string;
  backHome: () => void;
  category: string;
  error: string;
}


export const Body = (props: BodyProps) => {

  const [fullImgUrl, setFullImgUrl] = useState<string>();

  const [fullImgDiv, setFullImgDiv] = useState<any>();

  const [bodyEl, setBodyEl] = useState<any>();

  const [leftDisabled, setLeftDisabled] = useState<boolean>(false);

  const [rightDisabled, setRightDisabled] = useState<boolean>(false);
  
  const rootEl = document.querySelector('body')!;
  
  let amountScrolled = 0;
  let bodyElTotalWidth: number;
  let bodyElWidth: number;
  let rootElHeight: number;


  function handleImageExpand(url: string) {
    console.log(url);
    if(!fullImgDiv) return;
    fullImgDiv.style.visibility = 'visible';
    fullImgDiv.style.opacity = '1';
    setFullImgUrl(url);
    // Lower the opacity and add blur to the rest of the page
  }

  function handleFullImgClose() {
    if(!fullImgDiv) return;
    fullImgDiv.style.opacity = '0';

    setTimeout(() => {
      fullImgDiv.style.visibility = 'hidden';
    }, 200)
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  function scrollToBottom() {
    window.scrollTo({
      top: +rootElHeight,
      behavior: 'smooth'
    })
  }

  function scrollLeft() {
    if(!bodyEl) return;

    bodyEl.scrollTo({
      left: +(amountScrolled - bodyElWidth),
      behavior: 'smooth'
    });
    
    if(amountScrolled > 0) {
      amountScrolled -= bodyElWidth;
      scrollToBottom();
    };
  }

  function scrollRight() {
    if(!bodyEl) return;

    bodyEl.scrollTo({
      left: +(amountScrolled + bodyElWidth),
      behavior: 'smooth'
    });

    if(amountScrolled < (bodyElTotalWidth - bodyElWidth)) {
      amountScrolled += +bodyElWidth;
      scrollToTop();
    };
  }

  function backHome() {
    props.backHome();
    amountScrolled = 0;
    scrollToTop();
  }

  useEffect(() => {
    bodyElTotalWidth = bodyEl?.scrollWidth;
    bodyElWidth = bodyEl?.clientWidth + 8; // The +8 is to account for border widths
    rootElHeight = rootEl?.scrollHeight;
    amountScrolled = 0;
  }, [props.data]);

  useEffect(() => {
    setFullImgDiv(document.querySelector('.body__full-img'));
    setBodyEl(document.querySelector('.body'));
    amountScrolled = 0;
  }, []); 
  

  return (
    <>
    <div className={`body${!props.data || props.data.articles.length === 0 ? ' loading' : ''}`}>
      {!props.data ?
        (props.error ?
          <div className="error">
            <p className="error__title">Something went wrong!</p>
            <p className="error__message">Error: {props.error}</p>
            <button onClick={backHome} className="error__btn home-btn">Retry</button>
          </div>
        : <LoadingIcon />)
        :
        props.data.articles.length === 0 ? 
        <div className="no-results">
          No results for <span className="no-results__query no-results__var">{props.searchQuery.length > 310 ? `${props.searchQuery.slice(0, 300)}...` : props.searchQuery}</span> in the <span className="no-results__category no-results__var">{props.category}</span> category.
          <button onClick={backHome} className="no-results__btn home-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to home page
          </button>
        </div>
      :
      props.data.articles.map(article => (
        <Card key={`${article.title} - ${new Date().getTime()}`}>
          <Article onImageExpand={handleImageExpand} article={article} />
        </Card>
      ))
    }
    </div>

    <div className="scroll-controls">
      <button disabled={leftDisabled} onClick={scrollLeft} className={`scroll-controls__left scroll-controls-btn${leftDisabled ? ' disabled' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
        </svg>
      </button>

      <button disabled={rightDisabled} onClick={scrollRight} className={`scroll-controls__right scroll-controls-btn${rightDisabled ? ' disabled' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
        </svg>
      </button>
    </div>

    <div className="body__full-img">
      <img className="body__full-img--img" src={fullImgUrl} alt={fullImgUrl} />
      <div onClick={handleFullImgClose} className="body__full-img--btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen-exit" viewBox="0 0 16 16">
          <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
        </svg>
      </div>
    </div>
    </>
  )
}