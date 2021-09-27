import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../../logo.svg";
import Star from "../../../components/Star/Star";
import * as actions from "../actions";

class ViewStockFunder extends Component<any, any> {
  state = {
    stockfunder: {
      name: "",
      code: "",
      description: ""
    },
    submitted: false,
    errorMessage: null
  };

  componentDidMount() {
    this.props.fetchStockFunder(this.props.match.params.code);
  }

  back = () => {
    this.props.history.push("/stockfunders");
  };

  render() {
    const page = this.props.stockfunder ? (
      <div className="card">
        <div className="card-header">
          {"StockFunder Detail: " + this.props.stockfunder.name}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">Name:</div>
                <div className="col-md-8">{this.props.stockfunder.name}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Code:</div>
                <div className="col-md-8">{this.props.stockfunder.code}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Description:</div>
                <div className="col-md-8">{this.props.stockfunder.description}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Price:</div>
                <div className="col-md-8">{this.props.stockfunder.price || 5}</div>
              </div>
              <div className="row">
                <div className="col-md-4">5 Star Rating:</div>
                <div className="col-md-8">
                  <Star rating={this.props.stockfunder.starRating || 4} />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <img
                alt=""
                className="center-block img-responsive"
                style={{ width: "200px", margin: "2px" }}
                src={this.props.stockfunder.imageUrl || logo}
                title={this.props.stockfunder.name}
              />
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button
            className="btn btn-outline-secondary"
            onClick={this.back}
            style={{ width: "80px" }}
          >
            <i className="fa fa-chevron-left"></i> Back
          </button>
          &nbsp;
          <NavLink
            className="btn btn-primary"
            to={"/stockfunders/edit/" + this.props.stockfunder.id}
          >
            Edit
          </NavLink>
        </div>
      </div>
    ) : null;
    return page;
  }
}

const mapStateToProps = state => {
  return {
    stockfunder: state.stockfunder.stockfunder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStockFunder: (code, startDate, endDate) => dispatch(actions.fetchStockFunders(code, startDate, endDate))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStockFunder);
