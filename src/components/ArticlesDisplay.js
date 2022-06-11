const ArticlesDisplay = ({selectedArticle, topTen, filteredArticlesByTitle, filteredArticlesByAuthor, authorDisplay, keywordDisplay, displayItem}) => {

    const getDisplayInfo = (article) => {
        return (
            <>
                <a href={article.url}>
                    <div className="article-container">
                        <h4>{article.title}</h4>
                        <p>By: {article.by}</p>
                        <p>Rating: {article.score}</p>
                    </div>
                </a>
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