import React, { Component } from "react";
import { connect } from "react-redux";

import Bicycle from "../../../components/Bicycle/Bicycle";
import * as actions from "../actions";

class ViewIllustration extends Component<any, any> {
  state = {

  };

  componentDidMount() {
  }

  render() {
    const page = (
      <div>
        <Bicycle />
      </div>
    );
    return page;
  }
}

const mapStateToProps = state => {
  return {
    // illustration: state.illustration.illustration
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchIllustrations: () => dispatch(actions.fetchIllustrations())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewIllustration);
