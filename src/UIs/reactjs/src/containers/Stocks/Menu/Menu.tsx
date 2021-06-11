import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Menu.module.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

type Props = {
  authService: any
}

class Menu extends Component<Props> {
  render() {
    return (
      <Nav variant="pills">
        <Nav.Item>
          <NavLink className="nav-link" to="/stocks">Stocks</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" to="/legalperson">Legal person</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" to="/revenues">Revenues</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" to="/stockStickyNotes">Notes</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" to="/stockSeminars">Seminars</NavLink>
        </Nav.Item>
        <Nav className="justify-content-end">
          {this.props.children}
        </Nav>
      </Nav>
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
