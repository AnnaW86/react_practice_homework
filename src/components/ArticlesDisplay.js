const ArticlesDisplay = ({selectedArticle, topTen, filteredArticlesByTitle, filteredArticlesByAuthor, authorDisplay, keywordDisplay, displayItem, toggleFavourite, renderArticles}) => {

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

    const selectedArticleDisplay = getDisplayInfo(selectedArticle);

    const filteredArticlesByTitleDisplay = filteredArticlesByTitle.map(article => getDisplayInfo(article))

    const filteredArticlesByAuthorDisplay = filteredArticlesByAuthor.map(article => getDisplayInfo(article))

    const topTenDetails = topTen.map((article) => getDisplayInfo(article))


    return (
        <>

            {displayItem === "selectedArticle" &&
                <>
                    <h2>Your chosen article:</h2>
                    <div className="list-container">
                        {selectedArticleDisplay}
                    </div>
                </>
            }


            {displayItem === "topTen" &&
                <>
                    <h2>Top Ten Articles:</h2>
                    <div className="list-container">
                        {topTenDetails}
                    </div>
                </>
            }
        
            {displayItem === "keywordSearch" &&
                <>
                    <h2>Articles with <i>'{keywordDisplay}'</i> in the title:</h2>
                    <div className="list-container">
                        {filteredArticlesByTitleDisplay}
                    </div>
                    {filteredArticlesByTitleDisplay.length === 0 && keywordDisplay &&
                    <p>There are no articles with <i>'{keywordDisplay}'</i> in the title.</p>}
                </>
            }

            {displayItem === "authorSearch" &&
                <>
                    <h2>Articles by {authorDisplay}:</h2>
                    <div className="list-container">
                        {filteredArticlesByAuthorDisplay}
                    </div>
                </>
            }
        </>
    )
}

export default ArticlesDisplay