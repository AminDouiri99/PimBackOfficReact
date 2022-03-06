import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Menu from '../pages/Menues/Menu'
import Orders from '../pages/Orders/Orders'
import Login from '../pages/Login/login'
import Resto from '../pages/Resto/Resto'
const Routes = () => {

    return (
        
        <Switch>
            <Route path='/' exact component={ Dashboard}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/menus' component={Menu}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/login' component={Login}/>
            <Route path='/resto' component={Resto}/>
        </Switch>
    )
}

export default Routes
