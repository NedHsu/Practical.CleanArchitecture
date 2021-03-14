import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";
import Nav from "./components/Nav/Nav";
import Home from "./containers/Home/Home";
import OidcLoginRedirect from "./containers/Auth/OidcLoginRedirect";
import ListProducts from "./containers/Products/ListProducts/ListProducts";
import AddProduct from "./containers/Products/AddProduct/AddProduct";
import ViewProduct from "./containers/Products/ViewProduct/ViewProduct";
import AuditLogs from "./containers/AuditLogs/AuditLogs";
import ListFiles from "./containers/Files/ListFiles/ListFiles";
import UploadFile from "./containers/Files/UploadFile/UploadFile";
import EditFile from "./containers/Files/EditFile/EditFile";
import ListUsers from "./containers/Users/ListUsers/ListUsers";
import AddUser from "./containers/Users/AddUser/AddUser";
import ViewUser from "./containers/Users/ViewUser/ViewUser";
import ListMatches from "./containers/Matches/ListMatches/ListMatches";
import AddMatch from "./containers/Matches/AddMatch/AddMatch";
import ViewMatch from "./containers/Matches/ViewMatch/ViewMatch";
import ListStocks from "./containers/Stocks/ListStocks/ListStocks";
import ViewStock from "./containers/Stocks/ViewStock/ViewStock";
import AddStock from "./containers/Stocks/AddStock/AddStock";
import ViewIllustration from "./containers/Illustrations/ViewIllustration/ViewIllustration";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/oidc-login-redirect" component={OidcLoginRedirect} />
        <Route path="/files/upload" component={UploadFile} />
        <Route path="/files/edit/:id" component={EditFile} />
        <Route path="/files" component={ListFiles} />
        <Route path="/products/add" component={AddProduct} />
        <Route path="/products/edit/:id" component={AddProduct} />
        <Route path="/products/:id" component={ViewProduct} />
        <Route path="/products" component={ListProducts} />
        <Route path="/matches/add" component={AddMatch} />
        <Route path="/matches/:id" component={ViewMatch} />
        <Route path="/matches" component={ListMatches} />
        <Route path="/stocks/edit/:id" component={AddStock} />
        <Route path="/stocks/add" component={AddStock} />
        <Route path="/stocks/:id" component={ViewStock} />
        <Route path="/stocks" component={ListStocks} />
        <Route path="/illustrations" component={ViewIllustration} />
        <Route path="/users/add" component={AddUser} />
        <Route path="/users/edit/:id" component={AddUser} />
        <Route path="/users/:id" component={ViewUser} />
        <Route path="/users" component={ListUsers} />
        <Route path="/auditlogs" component={AuditLogs} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default App;
