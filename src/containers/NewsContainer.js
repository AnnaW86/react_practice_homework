import React, { useEffect, useState } from "react";
import ArticleSelector from "../components/ArticleSelector";
import ArticlesDisplay from "../components/ArticlesDisplay";

const NewsContainer = () => {

    const [latestStories, setLatestStories] = useState([]);
    const [articles, setArticles] = useState([]);
    let [loaded, setLoaded] = useState(false);
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
                // console.log(combinedData.sort((a, b) => b.score - a.score))
            })
            .then(() => setLoaded(true))
            
        })
    };

    const authors = [...new Set(unfilteredAuthors)].sort()
    // const authorsAlphabetical = authors.sort()

    const selectArticleByTitle = (articleTitle) => {
        setSelectedArticle(articles.find(article => article.title === articleTitle));
        setDisplayItem("selectedArticle")
    }

    const getTopTen = () => {
        const topTenArray = []
        for (let i = 0; i < 10; i++) {
            topTenArray.push(articles[i])
        };
        setTopTen(topTenArray);
        setDisplayItem("topTen");
        // console.log(topTen)
    }

    const getSearchTerm = (e) => {
        setKeyword(e.target.value);
    }

    const createArticlesByTitleArray = () => {
        setFilteredArticlesByTitle(articles.filter(article => article.title.includes(keyword)));
        setKeywordDisplay(keyword);
        setDisplayItem("keywordSearch")
        // setTopTen([]);
    }

    const createArticlesByAuthorArray = (author) => {
        setFilteredArticlesByAuthor(articles.filter(article => article.by === author));
        setAuthorDisplay(author)
        setDisplayItem("authorSearch");
    }

    useEffect(() => {
        getLatestStories();
    }, []);

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
                displayItem={displayItem} />
            </div>
        </>
    )

};

export default NewsContainer;