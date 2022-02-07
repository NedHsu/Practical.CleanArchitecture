import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import { checkValidity } from "../../../shared/utility";

type Props = {
  resetJobSrc: any,
  match: any,
  fetchJobSrc: any,
  jobSrc: any,
  saveJobSrc: any,
  updateJobSrc: any,
  saved: any
}

class AddJobSrc extends Component<Props, any> {
  state = {
    title: "Add JobSrc",
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
      provider: {
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
      src: {
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
    this.props.resetJobSrc();
    const provider = this.props.match?.params?.provider;
    const name = this.props.match?.params?.name;
    if (provider && name) {
      this.setState({ title: "Edit JobSrc" });
      this.props.fetchJobSrc(provider, name);
    }
  }

  fieldChanged = event => {
    const jobSrc = {
      ...this.props.jobSrc,
      [event.target.name]: event.target.value
    };

    this.checkFieldValidity(event.target.name, event.target.value);

    this.props.updateJobSrc(jobSrc);
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
        this.checkFieldValidity(fieldName, this.props.jobSrc[fieldName]) &&
        isValid;
    }

    if (isValid) {
      this.props.saveJobSrc(this.props.jobSrc);
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
              <label htmlFor="provider" className="col-sm-2 col-form-label">
                Provider
              </label>
              <div className="col-sm-10">
                <input
                  id="provider"
                  name="provider"
                  className={
                    "form-control " +
                    (this.state.submitted && !this.state.controls["provider"].valid
                      ? "is-invalid"
                      : "")
                  }
                  value={this.props.jobSrc?.provider}
                  onChange={event => this.fieldChanged(event)}
                />
                <span className="invalid-feedback">
                  {this.state.controls["provider"].error.required ? (
                    <span>Enter a provider</span>
                  ) : null}
                  {this.state.controls["provider"].error.maxLength ? (
                    <span>The provider must be less than 10 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
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
                  value={this.props.jobSrc?.name}
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
              <label htmlFor="src" className="col-sm-2 col-form-label">
                Src
              </label>
              <div className="col-sm-10">
                <input
                  id="src"
                  name="src"
                  className={
                    "form-control " +
                    (this.state.submitted &&
                      !this.state.controls["src"].valid
                      ? "is-invalid"
                      : "")
                  }
                  placeholder="path\file.ex"
                  value={this.props.jobSrc?.src}
                  onChange={event => this.fieldChanged(event)}
                />
                <span className="invalid-feedback">
                  {this.state.controls["src"].error.required ? (
                    <span>Enter a src</span>
                  ) : null}
                  {this.state.controls["src"].error.maxLength ? (
                    <span>The provider must be less than 100 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="src"
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
            to="/jobSrcs"
            style={{ width: "80px" }}
          >
            <i className="fa fa-chevron-left"></i> Back
          </NavLink>
        </div>
      </div>
    );

    return this.state.submitted && this.props.saved ? (
      <Redirect to={"/jobSrcs/" + this.props.jobSrc.id} />
    ) : (
      form
    );
  }
}

const mapStateToProps = state => {
  return {
    jobSrc: state.jobSrc.jobSrc,
    saved: state.jobSrc.saved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchJobSrc: (provider, name) => dispatch(actions.fetchJobSrc(provider, name)),
    updateJobSrc: jobSrc => dispatch(actions.updateJobSrc(jobSrc)),
    resetJobSrc: () => dispatch(actions.resetJobSrc()),
    saveJobSrc: jobSrc => dispatch(actions.saveJobSrc(jobSrc))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddJobSrc);
