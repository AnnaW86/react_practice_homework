const ArticlesDisplay = ({filteredArticles, displayHeading}) => {

    const getDisplayInfo = (article) => {
        return (
            <>
                    <div className="article-container">
                        <a href={article.url}>
                            <h4>{article.title}</h4>
                            <p>By: {article.by}</p>
                            <p>Rating: {article.score}</p>
                        </a>
                        
                        {/* <button onClick={() => toggleFavourite(article)}>
                            <span className="fa fa-star" {...!article.favourite ? {id:"unchecked"} : {id:"checked"}} ></span>
                        </button> */}
                    </div>
            </>
        )
    }

    const filteredArticlesDisplay = filteredArticles.map(article => getDisplayInfo(article))



    return (
        <>
            <h2>{displayHeading}</h2>
            <div className="list-container">
                {filteredArticlesDisplay}
            </div>
        </>
    )
}

export default ArticlesDisplay