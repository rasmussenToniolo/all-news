import { AnalyzedNewsArr } from '../model';
import {LoadingIcon} from './LoadingIcon';
import {Card} from './Helpers/Card';
import {Article} from './Article';

interface BodyProps {
  data?: AnalyzedNewsArr;
}

// Each priority will be assigned a width in base 10
// This number will be applied to the grid-column property of the article alongside the
// result of an algorithm that figures out where said article should start

// For the height, there will be an algorithm that figures out how many rows the body grid
// should have based on the amount of articles
// Or, it could be a 'static' page, with the articles being part of a slideshow, buttons 
// on the left and right of the body

// The 'static' page sounds easier to make and way faster, being that the amount of data
// per page is already known and the layout of the articles is easier to figure out
// This way you'll have 5 - 7 articles per page
// But the grid-template-rows of the body could be a bit difficult to figure out

export const Body = (props: BodyProps) => {
  console.log(props.data);

  return (
    <div className={`body${!props.data ? ' loading' : ''}`}>
      {!props.data ? <LoadingIcon /> :
        props.data.articles.map(article => (
          <Card key={article.title}>
            <Article article={article} />
          </Card>
        ))
      }
    </div>
  )
}