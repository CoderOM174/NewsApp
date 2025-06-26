import React, { useState, useEffect } from 'react'
import NewsItem from './newsItem'
import "../output.json";
import Spinner from './spinner';


const News = (props) => {
  let { mode, setProgress, country, pageSize, category, showAlert } = props;


  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const updateNews = async () => {
    setProgress(0);
    let url = 'enter your api key'
    setLoading(true);
    setProgress(50);
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    setProgress(75);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    setProgress(100);
  }

  useEffect(() => {
    document.title = `TRENDY NEWS - ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    updateNews();
    // eslint-disable-next-line
  }, [])


  const handelNextClick = async () => {
    let url = 'enter your api key'
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setProgress(75);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    setPage(page + 1)
    setProgress(100);
  }

  const handelPrevClick = async () => {

    let url = 'enter your api key'
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setProgress(75);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    setPage(page - 1)
    setProgress(100);
  }



  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col">
            </div>
            <h2 className="my-2 font">TRENDY NEWS</h2>
            {<h4 className="mt-2"> Top {category.toLowerCase().split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" ")} Headlines  </h4>}
            {loading && <Spinner />}
          </div>
        </div>

      </section>
      <section>
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className=" col-12 col-md-6 col-lg-3 mt-5" key={element.url}>
                <NewsItem tittle={element.title ? element.title.slice(0, 45) : "No tittle"}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  publish={element.publishedAt}
                  mode={mode}
                  showAlert={showAlert}
                  source={element.source.name}
                /></div>
            })}
          </div>
        </div>
        <div className=" my-3 d-flex justify-content-between px-5">
          <button disabled={page <= 1} type="button" className={`btn btn-${mode === 'light' ? 'secondary' : 'light'}`} onClick={handelPrevClick}> &laquo; Previous </button>
          <button disabled={page + 1 > Math.ceil(totalResults / pageSize)} type="button" className={`btn btn-${mode === 'light' ? 'secondary' : 'light'}`} onClick={handelNextClick}>Next &raquo;</button>
        </div>
      </section>
    </>

  )
}


export default News