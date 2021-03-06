import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {signout,isAuthenticated} from '../auth';

const isActive = (history, path) =>{
  if(history.location.pathname === path){
    return {color: "#ff9900"}
  }else{
    return {color: "#ffffff"}
  }
}



const Menu = ({history}) => (

    <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
      </li>
      {!isAuthenticated() &&(
        <>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history,"/SignIn")} to="/SignIn">Sign-In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history,"/SignUp")} to="/SignUp">Sign-Up</Link>
        </li>
        </>
      )}
      {isAuthenticated() && (
        <>
        <li className="nav-item">
          <a className="nav-link" style={isActive(history,"/SignOut"),{cursor:"pointer",color:"#fff"}} onClick={() => signout(() =>history.push('/'))}>Sign-Out</a>
        </li>
        <li className="nav-item">

        <Link to ={`/user/${isAuthenticated().user._id}`} style={{cursor:"pointer",color:"#fff"}} className="nav-link">
        {`${isAuthenticated().user.name}'s profile`}
        </Link>
        
        </li>
        </>
      )}

    </ul>
    </div>
);


export default withRouter(Menu);
