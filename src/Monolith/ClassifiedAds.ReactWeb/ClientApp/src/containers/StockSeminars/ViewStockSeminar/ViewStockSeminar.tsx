import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../../logo.svg";
import Star from "../../../components/Star/Star";
import * as actions from "../actions";

class ViewStockSeminar extends Component<any, any> {
  state = {
    stockSeminar: {
      name: "",
      code: "",
      description: ""
    },
    submitted: false,
    errorMessage: null
  };

  componentDidMount() {
    this.props.fetchStockSeminar(this.props.match.params.id);
  }

  back = () => {
    this.props.history.push("/stockSeminars");
  };

  render() {
    const page = this.props.stockSeminar ? (
      <div className="card">
        <div className="card-header">
          {"StockSeminar Detail: " + this.props.stockSeminar.name}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">Name:</div>
                <div className="col-md-8">{this.props.stockSeminar.name}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Code:</div>
                <div className="col-md-8">{this.props.stockSeminar.code}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Description:</div>
                <div className="col-md-8">{this.props.stockSeminar.description}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Price:</div>
                <div className="col-md-8">{this.props.stockSeminar.price || 5}</div>
              </div>
              <div className="row">
                <div className="col-md-4">5 Star Rating:</div>
                <div className="col-md-8">
                  <Star rating={this.props.stockSeminar.starRating || 4} />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <img
                className="center-block img-responsive"
                style={{ width: "200px", margin: "2px" }}
                src={this.props.stockSeminar.imageUrl || logo}
                title={this.props.stockSeminar.name}
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
            to={"/stockSeminars/edit/" + this.props.stockSeminar.id}
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
    stockSeminar: state.stockSeminar.stockSeminar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStockSeminar: id => dispatch(actions.fetchStockSeminar(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStockSeminar);
