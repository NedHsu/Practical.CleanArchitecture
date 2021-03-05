import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import { checkValidity } from "../../../shared/utility";
import { Button } from "react-bootstrap";
import { stat } from "fs/promises";

type Props = {
  resetStockNote: any,
  match: any,
  fetchStockNote: any,
  stocknote: any,
  saveStockNote: any,
  updateStockNote: any,
  saved: any,
  back: any,
  stockNoteId: any,
  stock: any,
}

class AddStockNote extends Component<Props, any> {
  state = {
    title: "Add StockNote",
    controls: {
      title: {
        validation: {
          required: true,
          minLength: 3
        },
        error: {
          required: false,
          minLength: false
        },
        valid: false,
        touched: false
      },
      stockCode: {
        validation: {
          required: true,
          maxLength: 10
        },
        error: {
          required: false,
          maxLength: false
        },
        valid: false,
        touched: false
      },
      contents: {
        validation: {
          required: true,
          maxLength: 500
        },
        error: {
          required: false,
          maxLength: false
        },
        valid: false,
        touched: false
      }
    },
    valid: false,
    submitted: false,
    errorMessage: null
  };

  static getDerivedStateFromProps(props, state) {
    if (props.stocknote?.id) {
      state.title = "Edit StockNote";
    } else if (!props.stocknote?.stockCode || props.stocknote?.stockCode !== props.stock.code) {
      props.updateStockNote({
        ...props.stocknote,
        stockCode: props.stock.code,
      });
    }
    return null;
  }

  fieldChanged = event => {
    const stocknote = {
      ...this.props.stocknote,
      [event.target.name]: event.target.value
    };

    this.checkFieldValidity(event.target.name, event.target.value);

    this.props.updateStockNote(stocknote);
  };

  checkFieldValidity = (name, value) => {
    const control = this.state.controls[name];
    const rules = control.validation;
    const validationRs = checkValidity(value, rules);

    this.setState(preState => {
      return {
        controls: {
          ...preState.controls,
          [name]: {
            ...preState.controls[name],
            error: validationRs,
            valid: validationRs.isValid
          }
        }
      };
    });

    return validationRs.isValid;
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
    let isValid = true;
    for (let fieldName in this.state.controls) {
      isValid =
        this.checkFieldValidity(fieldName, this.props.stocknote[fieldName]) &&
        isValid;
    }

    if (isValid) {
      this.props.saveStockNote(this.props.stocknote);
    }
  };

  render() {
    const form = (
      <div className="card">
        <div className="card-header">{this.state.title}</div>
        <div className="card-body">
          {this.state.errorMessage ? (
            <div
              className="row alert alert-danger"
            >
              {this.state.errorMessage}
            </div>
          ) : null}
          <form onSubmit={this.onSubmit}>
            <div className="form-group row">
              <label htmlFor="stockCode" className="col-sm-2 col-form-label">
                Code
              </label>
              <div className="col-sm-10">
                <input
                  id="stockCode"
                  name="stockCode"
                  className="form-control"
                  value={this.props.stocknote?.stockCode}
                  disabled={true}
                />
                <span className="invalid-feedback">
                  {this.state.controls["stockCode"].error.required ? (
                    <span>Enter a code</span>
                  ) : null}
                  {this.state.controls["stockCode"].error.maxLength ? (
                    <span>The code must be less than 10 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10">
                <input
                  id="title"
                  name="title"
                  className={
                    "form-control " +
                    (this.state.submitted && !this.state.controls["title"].valid
                      ? "is-invalid"
                      : "")
                  }
                  value={this.props.stocknote?.title}
                  onChange={event => this.fieldChanged(event)}
                />
                <span className="invalid-feedback">
                  {this.state.controls["title"].error.required ? (
                    <span>Enter a title</span>
                  ) : null}
                  {this.state.controls["title"].error.minLength ? (
                    <span>The title must be longer than 3 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="contents" className="col-sm-2 col-form-label">
                Content
              </label>
              <div className="col-sm-10">
                <textarea
                  id="contents"
                  name="contents"
                  className={
                    "form-control " +
                    (this.state.submitted &&
                      !this.state.controls["contents"].valid
                      ? "is-invalid"
                      : "")
                  }
                  value={this.props.stocknote?.contents}
                  onChange={event => this.fieldChanged(event)}
                />
                <span className="invalid-feedback">
                  {this.state.controls["contents"].error.required ? (
                    <span>Enter content</span>
                  ) : null}
                  {this.state.controls["contents"].error.maxLength ? (
                    <span>The content must be less than 500 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="contents"
                className="col-sm-2 col-form-label"
              ></label>
              <div className="col-sm-10">
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <Button variant="outline-secondary" style={{ width: "80px" }} onClick={this.props.back}>
            <i className="fa fa-chevron-left"></i> Back
          </Button>
        </div>
      </div>
    );

    return form;
  }
}

const mapStateToProps = state => {
  return {
    stocknote: state.stockNote.stocknote,
    saved: state.stockNote.saved,
    stock: state.stockNote.stock,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStockNote: id => dispatch(actions.fetchStockNote(id)),
    updateStockNote: stocknote => dispatch(actions.updateStockNote(stocknote)),
    resetStockNote: () => dispatch(actions.resetStockNote()),
    saveStockNote: stocknote => dispatch(actions.saveStockNote(stocknote))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStockNote);
