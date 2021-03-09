import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import { checkValidity } from "../../../shared/utility";

type Props = {
  resetStockGroupItem: any,
  match: any,
  fetchStockGroupItem: any,
  stockGroupItem: any,
  saveStockGroupItem: any,
  updateStockGroupItem: any,
  saved: any
}

class AddStockGroupItem extends Component<Props, any> {
  state = {
    title: "Add StockGroupItem",
    controls: {
      name: {
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
      code: {
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
      description: {
        validation: {
          required: true,
          maxLength: 100
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

  componentDidMount() {
    this.props.resetStockGroupItem();
    const id = this.props.match?.params?.id;
    if (id) {
      this.setState({ title: "Edit StockGroupItem" });
      this.props.fetchStockGroupItem(id);
    }
  }

  fieldChanged = event => {
    const stockGroupItem = {
      ...this.props.stockGroupItem,
      [event.target.name]: event.target.value
    };

    this.checkFieldValidity(event.target.name, event.target.value);

    this.props.updateStockGroupItem(stockGroupItem);
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
        this.checkFieldValidity(fieldName, this.props.stockGroupItem[fieldName]) &&
        isValid;
    }

    if (isValid) {
      this.props.saveStockGroupItem(this.props.stockGroupItem);
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
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  id="name"
                  name="name"
                  className={
                    "form-control " +
                    (this.state.submitted && !this.state.controls["name"].valid
                      ? "is-invalid"
                      : "")
                  }
                  value={this.props.stockGroupItem?.name}
                  onChange={event => this.fieldChanged(event)}
                />
                <span className="invalid-feedback">
                  {this.state.controls["name"].error.required ? (
                    <span>Enter a name</span>
                  ) : null}
                  {this.state.controls["name"].error.minLength ? (
                    <span>The name must be longer than 3 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="code" className="col-sm-2 col-form-label">
                Code
              </label>
              <div className="col-sm-10">
                <input
                  id="code"
                  name="code"
                  className={
                    "form-control " +
                    (this.state.submitted && !this.state.controls["code"].valid
                      ? "is-invalid"
                      : "")
                  }
                  value={this.props.stockGroupItem?.code}
                  onChange={event => this.fieldChanged(event)}
                />
                <span className="invalid-feedback">
                  {this.state.controls["code"].error.required ? (
                    <span>Enter a code</span>
                  ) : null}
                  {this.state.controls["code"].error.maxLength ? (
                    <span>The code must be less than 10 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-sm-10">
                <input
                  id="description"
                  name="description"
                  className={
                    "form-control " +
                    (this.state.submitted &&
                      !this.state.controls["description"].valid
                      ? "is-invalid"
                      : "")
                  }
                  value={this.props.stockGroupItem?.description}
                  onChange={event => this.fieldChanged(event)}
                />
                <span className="invalid-feedback">
                  {this.state.controls["description"].error.required ? (
                    <span>Enter a description</span>
                  ) : null}
                  {this.state.controls["description"].error.maxLength ? (
                    <span>The code must be less than 100 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="description"
                className="col-sm-2 col-form-label"
              ></label>
              <div className="col-sm-10">
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <NavLink
            className="btn btn-outline-secondary"
            to="/stockGroupItems"
            style={{ width: "80px" }}
          >
            <i className="fa fa-chevron-left"></i> Back
          </NavLink>
        </div>
      </div>
    );

    return this.state.submitted && this.props.saved ? (
      <Redirect to={"/stockGroupItems/" + this.props.stockGroupItem.id} />
    ) : (
        form
      );
  }
}

const mapStateToProps = state => {
  return {
    stockGroupItem: state.stockGroupItem.stockGroupItem,
    saved: state.stockGroupItem.saved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStockGroupItem: id => dispatch(actions.fetchStockGroupItem(id)),
    updateStockGroupItem: stockGroupItem => dispatch(actions.updateStockGroupItem(stockGroupItem)),
    resetStockGroupItem: () => dispatch(actions.resetStockGroupItem()),
    saveStockGroupItem: stockGroupItem => dispatch(actions.saveStockGroupItem(stockGroupItem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStockGroupItem);
