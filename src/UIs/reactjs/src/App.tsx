import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";
import './i18n/config';
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
import StickyStockNotes from "./containers/StockNotes/StickyStockNotes/StickyStockNotes";
import ViewStock from "./containers/Stocks/ViewStock/ViewStock";
import AddStock from "./containers/Stocks/AddStock/AddStock";
import LegalPerson from "./containers/Stocks/LegalPerson/LegalPerson";
import RevenueStock from "./containers/Stocks/Revenue/Revenue";
import ListStockSeminars from "./containers/StockSeminars/ListStockSeminars/ListStockSeminars";

import AddLocation from "./containers/Locations/AddLocation/AddLocation";
import ListLocations from "./containers/Locations/ListLocations/ListLocations";
import Maps from "./components/Map/Map";

import ViewIllustration from "./containers/Illustrations/ViewIllustration/ViewIllustration";
import Svg0 from "./containers/D3s/Svg0/Svg0";
import ListPageEffects from "./containers/PageEffects/ListPageEffects/ListPageEffects";
import BackgroundEffects from "./containers/PageEffects/Backgrounds/Background";
import Transitions from "./containers/PageEffects/Transitions/Transition";
import Transform3Ds from "./containers/PageEffects/Transform3Ds/Transform3D";
import ListD3s from "./containers/D3s/ListD3s/ListD3s";
import ViewChat from "./containers/Chats/ViewChat/ViewChat";
import ViewCalendar from "./containers/Calendars/ViewCalendar/ViewCalendar";
import ListJobs from "./containers/Jobs/ListJobs/ListJobs";
import ListJobSrcs from "./containers/JobSrcs/ListJobSrcs/ListJobSrcs";
import AddJobSrc from "./containers/JobSrcs/AddJobSrc/AddJobSrc";
import ListStockEPS from "./containers/StockEPS/ListStockEPS/ListStockEPS";
import AddStockEPS from "./containers/StockEPS/AddStockEPS/AddStockEpss";
import ListStockNews from "./containers/StockNews/ListStockNews/ListStockNews";
import AddStockNew from "./containers/StockNews/AddStockNew/AddStockNew";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
        <Route path="/legalperson" component={LegalPerson} />
        <Route path="/revenues" component={RevenueStock} />
        <Route path="/stocks/:id" component={ViewStock} />
        <Route path="/stocks" component={ListStocks} />
        <Route path="/stockStickyNotes" component={StickyStockNotes} />
        <Route path="/stockSeminars" component={ListStockSeminars} />
        <Route path="/stockEPS" component={ListStockEPS} />
        <Route path="/stockEPS/add" component={AddStockEPS} />
        <Route path="/stockNews" component={ListStockNews} />
        <Route path="/stockNews/add" component={AddStockNew} />
        <Route path="/illustrations" component={ViewIllustration} />
        <Route path="/users/add" component={AddUser} />
        <Route path="/users/edit/:id" component={AddUser} />
        <Route path="/users/:id" component={ViewUser} />
        <Route path="/users" component={ListUsers} />
        <Route path="/auditlogs" component={AuditLogs} />
        <Route path="/locations/add" component={AddLocation} />
        <Route path="/locations/edit/:id" component={AddLocation} />
        <Route path="/locations" component={ListLocations} />
        <Route path="/map" component={Maps} />
        <Route path="/D3s/svg0" component={Svg0} />
        <Route path="/D3s" component={ListD3s} />
        <Route path="/effects/backgrounds" component={BackgroundEffects} />
        <Route path="/effects/transitions" component={Transitions} />
        <Route path="/effects/transition3Ds" component={Transform3Ds} />
        <Route path="/effects" component={ListPageEffects} />
        <Route path="/chats/:id" component={ViewChat} />
        <Route path="/calendars" component={ViewCalendar} />
        <Route path="/jobs" component={ListJobs} />
        <Route path="/jobsrcs/add" component={AddJobSrc} />
        <Route path="/jobsrcs/edit/:provider/:name" component={AddJobSrc} />
        <Route path="/jobsrcs" component={ListJobSrcs} />
        <Redirect to="/home" />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
