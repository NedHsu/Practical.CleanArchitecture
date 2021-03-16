import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";

import Bicycle from "../../../components/Bicycle/Bicycle";
import Spaceship from "../../../components/Spaceship/Spaceship";
import * as actions from "../actions";

class ViewIllustration extends Component<any, any> {
  state = {

  };

  componentDidMount() {
  }

  render() {
    const page = (
      <div>
        <Tabs defaultActiveKey="Bicycle" id="uncontrolled-tab-example">
          <Tab eventKey="Bicycle" title="Bicycle">
            <Bicycle />
          </Tab>
          <Tab eventKey="Spaceship" title="Spaceship">
            <Spaceship />
          </Tab>
        </Tabs>
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
