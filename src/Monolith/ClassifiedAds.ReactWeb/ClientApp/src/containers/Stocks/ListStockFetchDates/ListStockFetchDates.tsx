import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import * as actions from "../actions";

class StockFetchDates extends Component<any, any> {
  state = {
  };

  componentDidMount() {
    this.props.fetchStockFetchDates();
  }

  render() {
    return (
      <div>
        <Row>
          <Col>Day: {this.props.stockFetchDates.stockDay}</Col>
          <Col>Funder: {this.props.stockFetchDates.stockFunder}</Col>
          <Col>Revenue: {this.props.stockFetchDates.stockRevenue}</Col>
          <Col>Fundamental: {this.props.stockFetchDates.stockFundamental}</Col>
          <Col>Margin: {this.props.stockFetchDates.stockMargin}</Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stockFetchDates: state.stock.stockFetchDates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockFetchDates: () => dispatch(actions.fetchStockFetchDates()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StockFetchDates);
