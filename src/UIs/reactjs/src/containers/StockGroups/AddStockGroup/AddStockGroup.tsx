import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import { checkValidity } from "../../../shared/utility";

type Props = {
  resetStockGroup: any,
  match: any,
  fetchStockGroup: any,
  stockGroup: any,
  saveStockGroup: any,
  updateStockGroup: any,
  saved: any
}

class AddStockGroup extends Component<Props, any> {
  state = {
    title: "Add StockGroup",
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
    this.props.resetStockGroup();
    const id = this.props.match?.params?.id;
    if (id) {
      this.setState({ title: "Edit StockGroup" });
      this.props.fetchStockGroup(id);
    }
  }

  fieldChanged = event => {
    const stockGroup = {
      ...this.props.stockGroup,
      [event.target.name]: event.target.value
    };

    this.checkFieldValidity(event.target.name, event.target.value);

    this.props.updateStockGroup(stockGroup);
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
        this.checkFieldValidity(fieldName, this.props.stockGroup[fieldName]) &&
        isValid;
    }

    if (isValid) {
      this.props.saveStockGroup(this.props.stockGroup);
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
                  value={this.props.stockGroup?.name}
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
                  value={this.props.stockGroup?.code}
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
                  value={this.props.stockGroup?.description}
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
            to="/stockGroups"
            style={{ width: "80px" }}
          >
            <i className="fa fa-chevron-left"></i> Back
          </NavLink>
        </div>
      </div>
    );

    return this.state.submitted && this.props.saved ? (
      <Redirect to={"/stockGroups/" + this.props.stockGroup.id} />
    ) : (
        form
      );
  }
}

const mapStateToProps = state => {
  return {
    stockGroup: state.stockGroup.stockGroup,
    saved: state.stockGroup.saved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStockGroup: id => dispatch(actions.fetchStockGroup(id)),
    updateStockGroup: stockGroup => dispatch(actions.updateStockGroup(stockGroup)),
    resetStockGroup: () => dispatch(actions.resetStockGroup()),
    saveStockGroup: stockGroup => dispatch(actions.saveStockGroup(stockGroup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStockGroup);
