import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Menu from "../pages/Menues/Menu";
import Orders from "../pages/Orders/Orders";
import Login from "../pages/Login/login";
import Resto from "../pages/Resto/Resto";
import Finance from "../pages/Finance/Finance";
import NFT from "../pages/NFT/NFT";
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/menus" component={Menu} />
      <Route path="/orders" component={Orders} />
      <Route path="/login" component={Login} />
      <Route path="/resto" component={Resto} />
      <Route path="/Finance" component={Finance} />
      <Route path="/nft" component={NFT} />
      <Route
        path="/marketplace"
        component={() => {
          window.location.href = "http://172.17.3.219:3005";
          return null;
        }}
      />
    </Switch>
  );
};

export default Routes;
