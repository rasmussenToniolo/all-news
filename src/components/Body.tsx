import { useEffect, useState } from 'react';
import { AnalyzedNewsArr } from '../model';
import {Card} from './Helpers/Card';
import {LoadingIcon} from './LoadingIcon';
import {Article} from './Article';

interface BodyProps {
  data?: AnalyzedNewsArr;
}


export const Body = (props: BodyProps) => {

  const [fullImgUrl, setFullImgUrl] = useState<string>();

  const [fullImgDiv, setFullImgDiv] = useState<any>();

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

  function scrollLeft() {
    // scroll body el left by 110rem
  }

  function scrollRight() {
    // scroll body el right by 110rem
  }

  useEffect(() => {
    setFullImgDiv(document.querySelector('.body__full-img')!)
  }, []); 

  return (
    <>
    <div className={`body${!props.data ? ' loading' : ''}`}>
      {!props.data ? <LoadingIcon /> :
        props.data.articles.map(article => (
          <Card key={article.title}>
            <Article onImageExpand={handleImageExpand} article={article} />
          </Card>
        ))
      }
    </div>

    <div className="scroll-controls">
      <button onClick={scrollLeft} className="scroll-controls__left scroll-controls-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
        </svg>
      </button>

      <button onClick={scrollRight} className="scroll-controls__right scroll-controls-btn">
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