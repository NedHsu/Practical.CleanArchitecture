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
  stockNote: any,
  saveStockNote: any,
  updateStockNote: any,
  saved: any,
  back: any,
  stockNoteId: any,
  stock: any,
}

class AddStockNote extends Component<Props, any> {
  state = {
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

  // static getDerivedStateFromProps(props, state) {
  //   if (!props.stockNote?.stockCode || props.stockNote?.stockCode !== props.stock.code) {
  //     console.log(props.stockNote, props.stock);
  //     var stockNote = Object.assign(props.stockNote, {
  //       stockCode: props.stock.code,
  //     });
  //     props.updateStockNote(stockNote);
  //   }
  //   return null;
  // }

  fieldChanged = event => {
    const stockNote = {
      ...this.props.stockNote,
      [event.target.name]: event.target.value
    };

    this.checkFieldValidity(event.target.name, event.target.value);

    this.props.updateStockNote(stockNote);
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

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ submitted: true });
    let isValid = true;
    for (let fieldName in this.state.controls) {
      isValid =
        this.checkFieldValidity(fieldName, this.props.stockNote[fieldName]) &&
        isValid;
    }

    if (isValid) {
      await this.props.saveStockNote(this.props.stockNote);
      this.props.back();
    }
  };

  render() {
    const form = (
      <div className="card">
        <div className="card-header">{this.props.stockNote?.id ? "Edit StockNote" : "Add StockNote"}</div>
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
                  value={this.props.stockNote?.stockCode}
                  disabled={true}
                />
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
                  value={this.props.stockNote?.title}
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
                  value={this.props.stockNote?.contents}
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
    stockNote: state.stockNote.stockNote,
    saved: state.stockNote.saved,
    stock: state.stockNote.stock,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStockNote: id => dispatch(actions.fetchStockNote(id)),
    updateStockNote: stockNote => dispatch(actions.updateStockNote(stockNote)),
    resetStockNote: () => dispatch(actions.resetStockNote()),
    saveStockNote: stockNote => dispatch(actions.saveStockNote(stockNote))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStockNote);
