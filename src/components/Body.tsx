import { AnalyzedNewsArr } from '../model';
import {LoadingIcon} from './LoadingIcon';

interface BodyProps {
  data?: AnalyzedNewsArr;
}

export const Body = (props: BodyProps) => {
  console.log(props.data);
  return (
    <div className={`body${!props.data ? ' loading' : ''}`}>
      {!props.data ? <LoadingIcon /> :
        // Body with data
        props.data.articles.map(article => (
          'hi'
          ))
      }
    </div>
  )
}