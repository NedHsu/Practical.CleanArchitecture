import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Submarine from "../Submarine/Submarine";

import classes from "./Nav.module.scss";

type Props = {
  authService: any
}

class Nav extends Component<Props> {
  prevScrollpos: number = 0;
  navRef: any = React.createRef();
  componentDidMount() {
    const self = this;
    self.prevScrollpos = window.pageYOffset;

    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      let nav = self.navRef.current;
      if (self.prevScrollpos > currentScrollPos) {
        nav.style.top = "0";
      } else {
        nav.style.top = "-50px";
      }
      self.prevScrollpos = currentScrollPos;
    }
  }
  render() {
    const pageTitle = "ClassifiedAds.React";
    return (
      <nav ref={this.navRef}
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
          {/* <li>
            <NavLink className="nav-link" to="/files">
              Files
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
          </li> */}
          <li>
            <NavLink className="nav-link" to="/stocks">
              Stocks
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/map">
              Map
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/illustrations">
              Illustration
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/matches">
              Matches
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/locations">
              Locations
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/effects">
              Effects
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/D3s">
              D3s
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/chats/0">
              Chat
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/calendars">
              Calendar
            </NavLink>
          </li>
          {/* <li>
            <NavLink className="nav-link" to="/auditlogs">
              Audit Logs
            </NavLink>
          </li> */}

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
