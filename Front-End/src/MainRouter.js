import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Profile from './user/Profile';
const MainRouter = ()=>(
  <div>
    <Menu />
    <Switch>
    <Route exact path="/SignUp" component={SignUp}/>
    <Route exact path="/SignIn" component={SignIn}/>
    <Route exact path="/user/:userId" component={Profile}/>
    <Route exact path="/" component={Home}/>

    </Switch>

  </div>
)

export default MainRouter;
