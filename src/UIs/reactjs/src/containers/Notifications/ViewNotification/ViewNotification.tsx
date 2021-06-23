import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../../logo.svg";
import Star from "../../../components/Star/Star";
import * as actions from "../actions";

class ViewNotification extends Component<any, any> {
  state = {
    tmpItem: {
      name: "",
      code: "",
      description: ""
    },
    submitted: false,
    errorMessage: null
  };

  componentDidMount() {
    this.props.fetchNotification(this.props.match.params.id);
  }

  back = () => {
    this.props.history.push("/tmpItems");
  };

  render() {
    const page = this.props.tmpItem ? (
      <div className="card">
        <div className="card-header">
          {"Notification Detail: " + this.props.tmpItem.name}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">Name:</div>
                <div className="col-md-8">{this.props.tmpItem.name}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Code:</div>
                <div className="col-md-8">{this.props.tmpItem.code}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Description:</div>
                <div className="col-md-8">{this.props.tmpItem.description}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Price:</div>
                <div className="col-md-8">{this.props.tmpItem.price || 5}</div>
              </div>
              <div className="row">
                <div className="col-md-4">5 Star Rating:</div>
                <div className="col-md-8">
                  <Star rating={this.props.tmpItem.starRating || 4} />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <img
                className="center-block img-responsive"
                style={{ width: "200px", margin: "2px" }}
                src={this.props.tmpItem.imageUrl || logo}
                title={this.props.tmpItem.name}
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
            to={"/tmpItems/edit/" + this.props.tmpItem.id}
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
    tmpItem: state.tmpItem.tmpItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotification: id => dispatch(actions.fetchNotification(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewNotification);
