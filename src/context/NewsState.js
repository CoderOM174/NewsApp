import React,{useState} from 'react';
import newsContext from './newsContex';

const NewsState = (props) => {
    const host = ' http://localhost:7000';
    const newsInitial = []
    const [news, setNews] = useState(newsInitial)

    const getNews = async () => {

        const response = await fetch(`${host}/api/news/fetchfavnews`, {
            method: 'Get', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },

        });
        const json = await response.json()
        console.log(json)
        setNews(json);
    }
    const createNews = async (title, description, imgUrl,newsUrl,author,source) => {
 
        const response = await fetch(`${host}/api/news/addnews`, {
            method: 'Post', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                
            },

            body: JSON.stringify({title, description, imgUrl,newsUrl,author,source}) 
        });
        const fnews =await response.json()
        console.log(fnews);


        console.log("Adding a new news");
        
        setNews(news.concat(fnews));
        console.log("new news is added");
    }

    
      const deleteNews = async (id) => {

        const response = await fetch(`${host}/api/news/deletenews/${id}`, {
            method: 'Delete', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token':  localStorage.getItem('token')
            }
            
        });
        const json = response.json()
        console.log(json)

       
        console.log("not with id" + id + "has been deleted");
        const newNews = news.filter((fnews) => { return fnews._id !== id })
        setNews(newNews)
    }


  return (

    <div>
           <newsContext.Provider value={ { news,getNews, createNews,deleteNews}}>
        {props.children}
    </newsContext.Provider>
    </div>
  )

}

export default NewsState