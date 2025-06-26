import React,{useContext}from 'react';
import newsContext from '../context/newsContex';
import newsPic from '../news.jpg';

const FavNewsItem = (props) => {
    const context=useContext(newsContext);
    const {deleteNews}=context;
    const {news }=props
    const handelClick=()=>{
        deleteNews(news._id);
        props.showAlert("Deleted from Favourite","success");
        
    }
  return (
    <div>

<div className="card  ">
          <div>
          <span className="position-absolute badge rounded-pill bg-danger" style={{left:'0'}}>Source : {news.source}</span>
          </div>
       
          <img src={news.imgUrl ? news.imgUrl : newsPic} className="card-img-top" alt=" Not Available" />
          <button type="button" className="btn btn-outline-danger position-absolute" data-toggle="tooltip" data-placement="top" title="Click To Delete News" onClick={handelClick} style={{right:'0' ,top:'0'}}><i className="bi bi-trash3 fs-6" ></i></button>
          
          <div className={`card-body text-center bg-${props.mode}`}>
       
            <h5 className="card-title">{news.title}...</h5>
            <h6 className={`card-subtitle mb-2 text-${props.mode === 'light' ? 'muted' : 'white-50'} `} >Author: {!news.author ? news.source : news.author}</h6>
           
            <p className="card-text "> {!news.description ? "The past six months have been challenging for Twitter employees, who have primarily foll." : news.description}... </p>
           
            <a rel="noreferrer" href={news.newsUrl} target="_blank"  className={`btn btn-${props.mode === 'light' ? 'secondary' : 'light'} rounded-pill `}>Read More</a>
            
            
          </div>
        </div>
    </div>
  )
}

export default FavNewsItem