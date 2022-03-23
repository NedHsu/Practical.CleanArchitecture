import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../../logo.svg";
import Star from "../../../components/Star/Star";
import * as actions from "../actions";

class ViewStockNew extends Component<any, any> {
  state = {
    stockNew: {
      name: "",
      code: "",
      description: ""
    },
    submitted: false,
    errorMessage: null
  };

  componentDidMount() {
    this.props.fetchStockNew(this.props.match.params.id);
  }

  back = () => {
    this.props.history.push("/stockNews");
  };

  render() {
    const page = this.props.stockNew ? (
      <div className="card">
        <div className="card-header">
          {"StockNew Detail: " + this.props.stockNew.name}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">Name:</div>
                <div className="col-md-8">{this.props.stockNew.name}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Code:</div>
                <div className="col-md-8">{this.props.stockNew.code}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Description:</div>
                <div className="col-md-8">{this.props.stockNew.description}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Price:</div>
                <div className="col-md-8">{this.props.stockNew.price || 5}</div>
              </div>
              <div className="row">
                <div className="col-md-4">5 Star Rating:</div>
                <div className="col-md-8">
                  <Star rating={this.props.stockNew.starRating || 4} />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <img
                className="center-block img-responsive"
                style={{ width: "200px", margin: "2px" }}
                src={this.props.stockNew.imageUrl || logo}
                title={this.props.stockNew.name}
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
            to={"/stockNews/edit/" + this.props.stockNew.id}
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
    stockNew: state.stockNew.stockNew
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStockNew: id => dispatch(actions.fetchStockNew(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStockNew);
