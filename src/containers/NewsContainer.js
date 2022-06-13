import React, { useEffect, useState } from "react";
import ArticleSelector from "../components/ArticleSelector";
import ArticlesDisplay from "../components/ArticlesDisplay";

const NewsContainer = () => {

    const [latestStories, setLatestStories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [keyword, setKeyword] = useState("");
    // const [keywordDisplay, setKeywordDisplay] = useState("");
    const [displayHeading, setDisplayHeading] = useState("");
    const [loaded, setLoaded] = useState(false);
    
    const getLatestStories = () => {
        console.log("Getting Latest Stories");
        fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then( response => response.json())
        .then( storyIDs => {
            setLatestStories(storyIDs)
            const storyPromises = storyIDs.map((storyID) => {
                return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
                .then(response => response.json())})
            Promise.all(storyPromises)
            .then((combinedData) => {
                setArticles(combinedData.sort((a, b) => b.score - a.score))
            })
            .then(() => {
                setLoaded(true);
            })
            
        })
    };



    const selectArticleByTitle = (articleTitle) => {
        setFilteredArticles([articles.find(article => article.title === articleTitle)]);
        setDisplayHeading("Your chosen article:");
    }

    const getTopTen = () => {
        const topTenArray = []
        for (let i = 0; i < 10; i++) {
            topTenArray.push(articles[i])
        };
        setFilteredArticles(topTenArray);
        setDisplayHeading("Top ten articles:");
    }

    const getSearchTerm = (e) => {
            setKeyword(e.target.value);
    }

    const createArticlesByTitleArray = () => {
        if (keyword) {
            setFilteredArticles(articles.filter(article => article.title.includes(keyword)));
            setDisplayHeading(`Articles with ${keyword} in the title:`)
        }
    }

    const createArticlesByAuthorArray = (author) => {
        setFilteredArticles(articles.filter(article => article.by === author));
        setDisplayHeading(`Articles by ${author}:`);
    }

    useEffect(() => {
        getLatestStories();
    }, []);

    useEffect(()=> {
        articles.forEach(article => article.favourite = false);
    }, [articles])


    return (
        <>
            <ArticleSelector
            articles={articles}
            selectArticleByTitle={selectArticleByTitle}
            getTopTen={getTopTen}
            getSearchTerm={getSearchTerm}
            createArticlesByTitleArray={createArticlesByTitleArray}
            createArticlesByAuthorArray={createArticlesByAuthorArray}
            loaded={loaded}/>
            <div className="articles-display">
            <ArticlesDisplay
                filteredArticles={filteredArticles}
                displayHeading={displayHeading}
                />
            </div>
        </>
    )

};

export default NewsContainer;