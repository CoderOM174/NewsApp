import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../trendynews.png';

const NavBar = (props) => {
  let navigation = useNavigate();
  const location = useLocation();

  const userEmail = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('email'); 
    navigation('/login');
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
              <div className="container">
                <Link className="navbar-brand" to="/">
                  <img src={logo} alt="" className='img-fluid' style={{ height: '60px', borderRadius: '10px' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/business' ? 'active' : ''}`} to="/business">Business</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/entertainment' ? 'active' : ''}`} to="/entertainment">Entertainment</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/health' ? 'active' : ''}`} to="/health">Health</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/science' ? 'active' : ''}`} to="/science">Science</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/sports' ? 'active' : ''}`} to="/sports">Sports</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/technology' ? 'active' : ''}`} to="/technology">Technology</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`} to="/search"><i className="bi bi-search"></i></Link>
                    </li>
                    <li className="nav-item">
                      {localStorage.getItem('token') ? <Link className={`nav-link ${location.pathname === '/favnews' ? 'active' : ''}`} to="/favnews">Saved Articles</Link> : " "}
                    </li>
                  </ul>

                  <div className="d-flex align-items-center">
                    {userEmail && (
                      <span className="navbar-text me-2">
                        <strong>{userEmail}</strong>
                      </span>
                    )}
                    {!localStorage.getItem('token')
                      ? (
                        <div className="d-flex">
                          <Link className={`mx-2 btn  btn-${props.mode === 'dark' ? 'secondary' : 'primary'} btn-color`} to="/login">Login</Link>
                          <Link className={`mx-2 btn  btn-${props.mode === 'dark' ? 'secondary' : 'primary'} btn-color`} to="/signup">Signup</Link>
                        </div>
                      )
                      : (
                        <button className={`mx-2 btn  btn-${props.mode === 'dark' ? 'secondary' : 'danger'} btn-color`} onClick={handleLogout}>Logout</button>
                      )}
                    <div className={`form-check form-switch mx-2`}>
                      <input className="form-check-input" onClick={props.togglemode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.color}</label>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
