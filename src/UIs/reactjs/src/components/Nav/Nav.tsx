import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Submarine from "../Submarine/Submarine";

import classes from "./Nav.module.css";

type Props = {
  authService: any
}

class Nav extends Component<Props> {
  render() {
    const pageTitle = "ClassifiedAds.React";
    return (
      <nav
        className={"navbar navbar-expand navbar-dark " + classes.Nav}
      >
        <a className="navbar-brand" href="/">
          {pageTitle + " " + React.version}
        </a>
        <ul className="nav nav-pills">
          <li>
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/files">
              Files
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/matches">
              Matches
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/stocks">
              Stocks
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/illustrations">
              Illustration
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/auditlogs">
              Audit Logs
            </NavLink>
          </li>

          {!this.props.authService.isAuthenticated() ? (
            <li>
              <NavLink
                className="nav-link"
                to="/login"
                onClick={this.props.authService.login}
                href="javascript:void(0)"
              >
                Login
              </NavLink>
            </li>
          ) : null}

          {this.props.authService.isAuthenticated() ? (
            <li>
              <NavLink
                className="nav-link"
                to="/logout"
                onClick={this.props.authService.logout}
                href="javascript:void(0)"
              >
                Logout
              </NavLink>
            </li>
          ) : null}
        </ul>
        <Submarine />
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    authService: state.auth.authService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
