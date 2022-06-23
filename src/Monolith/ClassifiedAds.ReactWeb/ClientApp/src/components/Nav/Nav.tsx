import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Submarine from "../Submarine/Submarine";

import classes from "./Nav.module.scss";
import { Form } from "react-bootstrap";
import { Translation } from "react-i18next";
import { resources, setI18nLanguage } from "../../i18n/config";
import i18n from 'i18next';

type Props = {
  authService: any;
};

class Nav extends Component<Props> {
  prevScrollpos: number = 0;
  navRef: any = React.createRef();
  state = {
    language: i18n.language,
    showTopButton: false,
    dragBottom: undefined,
    dragRight: undefined,
  };
  selectLanguage = e => {
    const language = e.target.value;
    setI18nLanguage(language);
    this.setState({
      language: language
    });
  };
  goToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };
  dragTop = (e) => {
    console.log({
      clientX: e.clientX,
      clientY: e.clientY,
      screenX: e.screenX,
      screenY: e.screenY,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
    });
    // this.setState({
    //   dragBottom: e.target.offsetHeight,
    //   dragRight: e.target.offsetWidth,
    // });
  };
  onWindowScroll = () => {
    const self = this;
    var currentScrollPos = window.pageYOffset;
    let nav = self.navRef.current;
    if (self.prevScrollpos > currentScrollPos) {
      nav.style.top = "0";
    } else {
      nav.style.top = "-50px";
    }

    self.prevScrollpos = currentScrollPos;
    self.setState({ showTopButton: currentScrollPos > 20 });
  };
  componentDidMount() {
    this.prevScrollpos = window.pageYOffset;
    window.addEventListener("scroll", this.onWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onWindowScroll);
  }
  render() {
    const pageTitle = "React";
    return (
      <Translation>
        {
          (t) => (
            <nav ref={this.navRef}
              className={"navbar navbar-expand navbar-dark " + classes.Nav}
            >
              <a className="navbar-brand" href="/">
                {pageTitle + " " + React.version}
              </a>
              <ul className="nav nav-pills">
                <li>
                  <NavLink className="nav-link" to="/home">
                    {t('navigations.home')}
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
                    {t('navigations.stock')}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/map">
                    {t('navigations.map')}
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
                {
                  /* <li>
                    <NavLink className="nav-link" to="/auditlogs">
                      Audit Logs
                    </NavLink>
                  </li> */
                }
                <li>
                  <NavLink className="nav-link" to="/jobs">
                    Jobs
                  </NavLink>
                </li>
                {!this.props.authService.isAuthenticated() ? (
                  <li>
                    <NavLink
                      className="nav-link"
                      to="/login"
                      onClick={this.props.authService.login}
                      href=""
                    >
                      {t('navigations.logoin')}
                    </NavLink>
                  </li>
                ) : null}
                <li>
                    <NavLink className="nav-link" to="/settings">
                        Settings
                    </NavLink>
                </li>
                {this.props.authService.isAuthenticated() ? (
                  <li>
                    <NavLink
                      className="nav-link"
                      to="/logout"
                      onClick={this.props.authService.logout}
                      href=""
                    >
                      {t('navigations.logout')}
                    </NavLink>
                  </li>
                ) : null}
                <li>
                  <Form.Select
                    value={this.state.language}
                    onChange={this.selectLanguage}>
                    {
                      Object.keys(resources).map(k => {
                        return (
                          <option value={k} key={k}>{resources[k].translation.language}</option>
                        )
                      })
                    }
                  </Form.Select>
                </li>
              </ul>
              <Submarine />
              <button className={classes["top-button"]} onClick={this.goToTop} title="Go to top" hidden={!this.state.showTopButton} style={{
                right: this.state.dragRight,
                bottom: this.state.dragBottom,
              }} draggable="true" onDragEnd={this.dragTop}>Top</button>
            </nav>
          )
        }
      </Translation>
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
