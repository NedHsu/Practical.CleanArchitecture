import React, { Component, MouseEventHandler } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import { checkValidity } from "../../../shared/utility";
import { Button, Col, Form, FormControl } from "react-bootstrap";

type Props = {
  resetJob: any,
  match: any,
  fetchJob: any,
  fetchJobSrcs: any,
  job: any,
  jobSrcs: Array<any>,
  saveJob: any,
  updateJob: any,
  saved: any,
  back: MouseEventHandler<HTMLElement>,
}

class AddJob extends Component<Props, any> {
  static defaultProps = {
    back: () => {
      console.log("default back");
    }
  }

  state = {
    title: "Add Job",
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
        },
        error: {
          required: false,
        },
        valid: false,
        touched: false
      },
      arguments: {
        validation: {
          maxLength: 100
        },
        error: {
          maxLength: false
        },
        valid: false,
        touched: false
      }
    },
    valid: false,
    submitted: false,
    errorMessage: null,
    formValues: {
      provider: "",
      name: "",
      arguments: "",
    },
    jobNames: [] as Array<any>,
  };

  componentDidMount() {
    this.props.resetJob();
    this.props.fetchJobSrcs();
    const id = this.props.match?.params?.id;
    if (id) {
      this.setState({ title: "Edit Job" });
      this.props.fetchJob(id);
    }
  }

  fieldChanged = event => {
    const formValues = {
      ...this.state.formValues,
      [event.target.name]: event.target.value
    };

    this.checkFieldValidity(event.target.name, event.target.value);

    this.setState({
      formValues: formValues
    });
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
        this.checkFieldValidity(fieldName, this.state.formValues[fieldName]) &&
        isValid;
    }

    if (isValid) {
      await this.props.saveJob(this.state.formValues);
      console.log("saved");
    }
  };

  onSelectProvider = event => {
    this.setState({
      formValues: { ...this.state.formValues, provider: event.target.value },
      jobNames: this.props.jobSrcs.find(x => x.provider === event.target.value)?.items ?? []
    });
  }

  onSelectName = event => {
    this.setState({
      formValues: { ...this.state.formValues, name: event.target.value }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.jobSrcs !== this.props.jobSrcs) {
      if (this.props.jobSrcs.length > 0) {
        this.setState({
          jobNames: this.props.jobSrcs.length > 0 ? this.props.jobSrcs[0].items : [],
          formValues: {
            ...this.state.formValues,
            provider: this.props.jobSrcs[0].provider,
            name: this.props.jobSrcs[0].items[0]?.name
          },
        });
      }
    }
  }

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
              <label htmlFor="provider" className="col-sm-3 col-form-label">
                Provider
              </label>
              <div className="col-sm-9">
                <Form.Control
                  as="select"
                  name="provider"
                  value={this.state.formValues.provider}
                  onChange={this.onSelectProvider}>
                  <option key="default" value={""}>Select a provider</option>
                  {
                    this.props.jobSrcs?.map(x => {
                      return (
                        <option key={x.provider} value={x.provider}>{x.provider}</option>
                      )
                    })
                  }
                </Form.Control>
                <span className="invalid-feedback">
                  {this.state.controls["provider"].error.required ? (
                    <span>Enter a provider</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-3 col-form-label">
                Name
              </label>
              <div className="col-sm-9">
                <Form.Control
                  as="select"
                  name="name"
                  value={this.state.formValues.name}
                  onChange={this.onSelectName}>
                  {
                    this.state.jobNames?.map(x => {
                      return (
                        <option key={x.name} value={x.name}>{x.name}</option>
                      )
                    })
                  }
                </Form.Control>
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
              <label htmlFor="arguments" className="col-sm-3 col-form-label">
                Arguments
              </label>
              <div className="col-sm-9">
                <FormControl
                  id="arguments"
                  name="arguments"
                  as="textarea"
                  placeholder="arg1,arg2..."
                  rows={5}
                  onChange={event => this.fieldChanged(event)}
                  className={
                    (this.state.submitted &&
                      !this.state.controls["arguments"].valid
                      ? "is-invalid"
                      : "")
                  }>
                </FormControl>
                <span className="invalid-feedback">
                  {this.state.controls["arguments"].error.maxLength ? (
                    <span>The code must be less than 100 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <Col sm={{ span: 9, offset: 3 }}>
                <button className="btn btn-primary">Save</button>
              </Col>
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
    job: state.job.job,
    jobSrcs: state.job.jobSrcs,
    saved: state.job.saved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchJob: id => dispatch(actions.fetchJob(id)),
    fetchJobSrcs: () => dispatch(actions.fetchJobSrcs()),
    updateJob: job => dispatch(actions.updateJob(job)),
    resetJob: () => dispatch(actions.resetJob()),
    saveJob: job => dispatch(actions.saveJob(job)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);
