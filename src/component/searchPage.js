import React, { Component } from 'react'
import NewsItem from './newsItem'
import "../output.json";
import Spinner from './spinner';
import PropTypes from 'prop-types';


export class SearchPage extends Component {
    
  static defaultProps = {
    country: 'us',
    pageSize: 10,
    category: 'general',
    mode: 'dark'
  }
  propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    mode: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      search: " "
    }
    this.props.setProgress(100);
    document.title = `TRENDY NEWS - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
  }
  
   handleClick = async(e)=>{
    e.preventDefault();
     this.updateNews();
  }
  
  handelChnage=(e)=>{
    this.setState({search: e.target.value})
  }
  updateNews = async () => {
    this.props.setProgress(0);
    let url = ` https://newsapi.org/v2/everything?q=${this.state.search}&apiKey=5985b720c93a4618b8f05e3497252d85`;
    this.setState({ loading: true })
    this.props.setProgress(50);
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.props.setProgress(75);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }
  

  render() {
    return (
      <div>
        <div className="container mt-3">
        <form className="d-flex" role="search">
        <input className="form-control me-2 input" type="search" placeholder="Search" aria-label="Search" value={this.state.search} onChange={this.handelChnage} / >
        <button className="btn btn-outline-danger" type="submit" onClick={this.handleClick}>Search</button>
      </form>
      
          {this.state.loading && <Spinner />}
          <h2 className="my-2 font">TRENDY NEWS</h2>
          <div className="row ">
            {<h4 className="mt-2"> Top {this.state.search.toLowerCase().split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" ")} Headlines  </h4>}
            {
              !this.state.loading && this.state.articles.map((element) => {
                return <div className=" col-12 col-md-6 col-lg-3 mt-5" key={element.url}>
                  <NewsItem tittle={element.title ? element.title.slice(0, 45) : "No tittle"}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    publish={element.publishedAt}
                    mode={this.props.mode}
                    source={element.source.name}
                  />
                </div>
              })
            }
          </div>
        </div>
      
      </div>
      
    )
  }
}

export default SearchPage