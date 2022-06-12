import { useState } from "react";

const ArticleSelector = ({articles, authors, loaded, selectArticleByTitle, getTopTen, createArticlesByTitleArray, createArticlesByAuthorArray, getSearchTerm}) => {

    if (!loaded) {
        return <p>Loading...</p>
    };


    const articlesOptions = articles.map((article) => {
        return (
        <option >{article.title}</option>
        )
    }
    );

    const authorsOptions = authors.map((author) => {
        return (
        <option>{author}</option>
        )
    }
    );
    
    const handleSeeAllSubmit = (e) => {
        selectArticleByTitle(e.target.value)
        e.target.selectedIndex = 0;
    }

    const handleTopTenRequest = () => {
        getTopTen();
    }

    const handleSearchInput = (e) => {
        getSearchTerm(e);
    };
    
    const handleKeywordFormSubmit = (e) => {
        e.preventDefault();
        createArticlesByTitleArray();
        e.target.reset();
    }

    const handleAuthorSubmit = (e) => {
        createArticlesByAuthorArray(e.target.value);
        e.target.selectedIndex = 0;
    }
    

    return (
        <>

            <fieldset className="filters-container">
                <legend>Filter articles</legend>
        
                <button type="submit" onClick={handleTopTenRequest}>View Top Ten</button>
                
                <form onSubmit={handleKeywordFormSubmit}>
                    <input type="text" id="keyword" name="keyword" placeholder="Search by key word..." onChange={handleSearchInput}/>
                    <input type="submit" value="Search"/>
                </form>

                <select onChange={handleAuthorSubmit}>
                    <option >Search by author:</option>
                    {authorsOptions}
                </select>

            </fieldset>

            <select onChange={handleSeeAllSubmit}>
                <option value="null">Or choose from all titles:</option>
                {articlesOptions}
            </select>
       
    
        </>
    )
    }

export default ArticleSelector;