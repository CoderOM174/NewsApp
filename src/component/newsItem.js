import React, { useContext } from 'react';
import newsPic from '../news.jpg';
import newsContext from '../context/newsContex';

const NewsItem=(props)=> {
 const context=useContext(newsContext);
  const {createNews}= context;
   const  handelClick=()=>{
    if(localStorage.getItem('token')){
      createNews(tittle,description,imgUrl,newsUrl,author,source);
      showAlert("Added to Saved Articles", "success");
    }else{
      showAlert("login First","danger");
    }
    }
  
    let { tittle, description, imgUrl, newsUrl, author, publish, mode ,source, showAlert } = props;
    return (
      <>
        <div className="card  ">
          <div>
          <span className="position-absolute badge rounded-pill bg-danger" style={{left:'0'}}>Source : {source}</span>
          </div>
       
          <img src={imgUrl ? imgUrl : newsPic} className="card-img-top" alt=" Not Available" />
          <button type="button" className="btn btn-outline-danger position-absolute" data-toggle="tooltip" data-placement="top" title="Click To Save News"  onClick={handelClick} style={{right:'0' ,top:'0'}}><i className="bi bi-bag-heart fs-6" ></i></button>
          
          <div className={`card-body text-center bg-${mode}`}>
       
            <h5 className="card-title">{tittle}...</h5>
            <h6 className={`card-subtitle mb-2 text-${mode === 'light' ? 'muted' : 'white-50'} `} >Author: {!author ? source : author}</h6>
            <p className={`card-text text-${mode === 'light' ? 'muted' : 'white-50'}`}><small>Published At: {new Date(publish).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</small></p>
            <p className="card-text "> {!description ? "The past six months have been challenging for Twitter employees, who have primarily foll." : description}... </p>
           
            <a rel="noreferrer" href={newsUrl} target="_blank" className={`btn btn-${mode === 'light' ? 'secondary' : 'light'} rounded-pill `}>Read More</a>
          </div>
        </div>
      </>
    )
  }


export default NewsItem