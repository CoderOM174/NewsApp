import React, { useState } from 'react'
import NavBar from './component/navbar';
import News from './component/news';
import SearchPage from './component/searchPage';

import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NewsState from './context/NewsState';
import FavrioutNews from './component/FavrioutNews';
import Login from './component/Login';
import Signup from './component/Signup';
import Alert from './component/Alert';

const Home=()=> {


  const [mode, setmode] = useState('light')
  const [color, setcolor] = useState(' Dark mode')
  const [alert, setAlert] = useState(null)
  const [progress, setprogress] = useState(10)
 
  const showAlert =(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
 }
  const toggleMode = ()=>{
    if(mode==='light'){
      setmode('dark')
      setcolor(' Dark mode')
      showAlert("Success: dark mode has been enabled", "success")
      document.body.style.backgroundColor=  '#212529';
      document.body.style.color=  'white';
    }else{
      setmode('light')
      setcolor(' Light mode')
      showAlert("Success: light mode has been enabled", "success")
      document.body.style.backgroundColor=  'white';
      document.body.style.color=  'black';
    }
  }
  const setProgress = (progress) => {
    setprogress(progress)
  }

    return (

      <div>
        <NewsState>
          <Router>

            <NavBar mode={mode} togglemode={toggleMode} color={color} />
            <LoadingBar
              color='#f11946'
              progress={progress}

            />
            <Alert alert={alert} />

            <Routes>
              <Route exact path="/" element={<News setProgress={setProgress} key="general" country="us" pageSize="16" category="general" mode={mode} showAlert={showAlert} />}></Route>
              <Route exact path="/business" element={<News setProgress={setProgress} key="business" country="us" pageSize="16" category="business" mode={mode} showAlert={showAlert} />}></Route>
              <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" country="us" pageSize="16" category="entertainment" mode={mode} showAlert={showAlert} />}></Route>
              <Route exact path="/health" element={<News setProgress={setProgress} key="health" country="us" pageSize="16" category="health" mode={mode} showAlert={showAlert} />}></Route>
              <Route exact path="/science" element={<News setProgress={setProgress} key="science" country="us" pageSize="16" category="science" mode={mode} showAlert={showAlert} />}></Route>
              <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" country="us" pageSize="16" category="sports" mode={mode} showAlert={showAlert} />}></Route>
              <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" country="us" pageSize="16" category="technology" mode={mode} showAlert={showAlert} />}></Route>
              <Route exact path="/search" element={<SearchPage setProgress={setProgress} key="technology" country="us" pageSize="16" category="technology" mode={mode} showAlert={showAlert} />}></Route>
              <Route exact path="/favnews" element={<FavrioutNews setProgress={setProgress}  mode={mode} showAlert={showAlert} />}></Route>
              <Route exact path="/login" element={<Login mode={mode} showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<Signup mode={mode} showAlert={showAlert} />}></Route>
            </Routes>
          </Router>
        </NewsState>
      </div>

    )
  }

export default Home