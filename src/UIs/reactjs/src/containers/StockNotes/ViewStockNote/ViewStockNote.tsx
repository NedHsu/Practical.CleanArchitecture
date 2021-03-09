import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../../logo.svg";
import Star from "../../../components/Star/Star";
import * as actions from "../actions";

class ViewStockNote extends Component<any, any> {
  state = {
    stockNote: {
      name: "",
      code: "",
      description: ""
    },
    submitted: false,
    errorMessage: null
  };

  componentDidMount() {
    this.props.fetchStockNote(this.props.match.params.id);
  }

  back = () => {
    this.props.history.push("/stockNotes");
  };

  render() {
    const page = this.props.stockNote ? (
      <div className="card">
        <div className="card-header">
          {"StockNote Detail: " + this.props.stockNote.name}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">Name:</div>
                <div className="col-md-8">{this.props.stockNote.name}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Code:</div>
                <div className="col-md-8">{this.props.stockNote.code}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Description:</div>
                <div className="col-md-8">{this.props.stockNote.description}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Price:</div>
                <div className="col-md-8">{this.props.stockNote.price || 5}</div>
              </div>
              <div className="row">
                <div className="col-md-4">5 Star Rating:</div>
                <div className="col-md-8">
                  <Star rating={this.props.stockNote.starRating || 4} />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <img
                className="center-block img-responsive"
                style={{ width: "200px", margin: "2px" }}
                src={this.props.stockNote.imageUrl || logo}
                title={this.props.stockNote.name}
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
            to={"/stockNotes/edit/" + this.props.stockNote.id}
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
    stockNote: state.stockNote.stockNote
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStockNote: id => dispatch(actions.fetchStockNote(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStockNote);
