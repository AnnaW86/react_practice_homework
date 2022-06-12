import React, { useEffect, useState } from "react";
import ArticleSelector from "../components/ArticleSelector";
import ArticlesDisplay from "../components/ArticlesDisplay";

const NewsContainer = () => {

    const [latestStories, setLatestStories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [unfilteredAuthors, setUnfilteredAuthors] = useState([]);
    const [filteredArticlesByTitle, setFilteredArticlesByTitle] = useState([]);
    const [filteredArticlesByAuthor, setFilteredArticlesByAuthor] = useState([]);
    const [authorDisplay, setAuthorDisplay] = useState("");
    const [keyword, setKeyword] = useState("");
    const [keywordDisplay, setKeywordDisplay] = useState("");
    const [topTen, setTopTen] = useState([]);
    const [displayItem, setDisplayItem] = useState("");
    const [selectedArticle, setSelectedArticle] = useState({});

    // const [authors, setAuthors] = useState([]);

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
                setUnfilteredAuthors(combinedData.map(article => article.by))
            })
            .then(() => {
                setLoaded(true);
            })
            
        })
    };

    const authors = [...new Set(unfilteredAuthors)].sort()

    const selectArticleByTitle = (articleTitle) => {
        setSelectedArticle(articles.find(article => article.title === articleTitle));
        setDisplayItem("selectedArticle");
        selectedArticle.favourite = true;
    }

    const getTopTen = () => {
        const topTenArray = []
        for (let i = 0; i < 10; i++) {
            topTenArray.push(articles[i])
        };
        setTopTen(topTenArray);
        setDisplayItem("topTen");
    }

    const getSearchTerm = (e) => {
            setKeyword(e.target.value);
    }

    const createArticlesByTitleArray = () => {
        if (keyword) {
            setFilteredArticlesByTitle(articles.filter(article => article.title.includes(keyword)));
            setKeywordDisplay(keyword);
            setDisplayItem("keywordSearch")
        }
    }

    const createArticlesByAuthorArray = (author) => {
        setFilteredArticlesByAuthor(articles.filter(article => article.by === author));
        setAuthorDisplay(author)
        setDisplayItem("authorSearch");
    }

    const toggleFavourite = (article) => {
        article.favourite = !article.favourite;
        // let favourite
        // (article.favourite? favourite = false: favourite = true)
        setSelectedArticle(article);
        console.log(article.favourite);
        // console.log(selectedArticle.favourite);
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
            authors={authors}
            selectArticleByTitle={selectArticleByTitle}
            getTopTen={getTopTen}
            getSearchTerm={getSearchTerm}
            createArticlesByTitleArray={createArticlesByTitleArray}
            createArticlesByAuthorArray={createArticlesByAuthorArray}
            loaded={loaded}/>
            <div className="articles-display">
            <ArticlesDisplay
                selectedArticle={selectedArticle}
                topTen={topTen}
                filteredArticlesByTitle={filteredArticlesByTitle}
                filteredArticlesByAuthor={filteredArticlesByAuthor}
                authorDisplay={authorDisplay}
                keywordDisplay={keywordDisplay}
                displayItem={displayItem}
                toggleFavourite={toggleFavourite} />
            </div>
        </>
    )

};

export default NewsContainer;