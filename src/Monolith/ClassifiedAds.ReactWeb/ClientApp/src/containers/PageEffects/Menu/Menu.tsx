import React, { Component } from "react";
import { connect } from "react-redux";

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
          <NavLink className="nav-link" to="/effects/backgrounds">Backgrounds</NavLink>
          <NavLink className="nav-link" to="/effects/transitions">Transitions</NavLink>
          <NavLink className="nav-link" to="/effects/transition3Ds">Transition3Ds</NavLink>
        </Nav.Item>
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
