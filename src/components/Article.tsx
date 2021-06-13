export const Article = (article: any) => {
  const date = new Date(article.article.publishedAt);

  return(
    <div className={`article priority-${article.article.priority}`}>
      <div className="article__title">
        <p className="article__title-text">{article.article.title}</p>
      </div>

      <p className="article__date">{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</p>

      {article.article.urlToImage ?
        <img src={article.article.urlToImage} alt={article.article.title} className="article__image" />
      : ''}

      <p className="article__description">{article.article.description}</p>

      {/* <p className="article__source">{article.article.source.name}</p> */}

      {/* <a href={article.article.url} target="_blank" className="article__full-article-btn">See full article</a> */}
      <button className="article__full-article-btn">See full article</button>
    </div>
  )
}