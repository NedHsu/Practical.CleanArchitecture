import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Menu.module.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Translation } from "react-i18next";

type Props = {
  authService: any
}

class Menu extends Component<Props> {
  render() {
    return (
      <Translation>
        {
          (t) => (
            <Nav variant="pills">
              <Nav.Item>
                <NavLink className="nav-link" to="/stocks">{t("stocks.stocks")}</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/legalperson">{t("stocks.legalPerson")}</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/revenues">{t("stocks.revenues")}</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/stockStickyNotes">{t("stocks.notes")}</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/stockSeminars">{t("stocks.seminars")}</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/stockEPS">{t("stocks.EPS")}</NavLink>
              </Nav.Item>
              <Nav className="justify-content-end">
                {this.props.children}
              </Nav>
            </Nav>
          )
        }
      </Translation>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    authService: state.auth.authService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
