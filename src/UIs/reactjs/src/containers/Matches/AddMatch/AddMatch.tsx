import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import { checkValidity } from "../../../shared/utility";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

type Props = {
  resetMatch: any,
  match: any,
  fetchMatch: any,
  saveMatch: any,
  updateMatch: any,
  saved: any
}

class AddMatch extends Component<Props, any> {
  state = {
    title: "Add Match",
    controls: {
      title: {
        validation: {
          required: true,
          minLength: 3,
          maxLength: 50
        },
        error: {
          required: false,
          minLength: false,
          maxLength: false
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
    this.props.resetMatch();
    const id = this.props.match?.params?.id;
    if (id) {
      this.setState({ title: "Edit Match" });
      this.props.fetchMatch(id);
    }
  }

  fieldChanged = event => {
    const match = {
      ...this.props.match,
      [event.target.name]: event.target.value
    };

    this.checkFieldValidity(event.target.name, event.target.value);

    this.props.updateMatch(match);
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
        this.checkFieldValidity(fieldName, this.props.match[fieldName]) &&
        isValid;
    }

    if (isValid) {
      this.props.saveMatch(this.props.match);
    }
  };

  render() {
    const form0 = (
      <Card>
        <Card.Header>
          {this.state.title}
        </Card.Header>
        <Card.Body>
          {this.state.errorMessage ? (
            <div
              className="row alert alert-danger"
            >
              {this.state.errorMessage}
            </div>
          ) : null}
          <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>標題</Form.Label>
              <Col sm={10}>
                <Form.Control type="text" required value={this.props.match?.title} name="title" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>開始時間</Form.Label>
              <Col sm={2}>
                <Form.Control type="date" />
              </Col>
              <Col sm={2}>
                <Form.Control type="time" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>結束時間</Form.Label>
              <Col sm={2}>
                <Form.Control type="date" />
              </Col>
              <Col sm={2}>
                <Form.Control type="time" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={2}></Col>
              <Col sm={10}>
                <Button type="submit">Save</Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          <NavLink
            className="btn btn-outline-secondary"
            to="/matches"
            style={{ width: "80px" }}
          >
            <i className="fa fa-chevron-left"></i> Back
          </NavLink>
        </Card.Footer>
      </Card>
    );
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
                    (this.state.submitted && !this.state.controls["title"].valid
                      ? "is-invalid"
                      : "")
                  }
                  value={this.props.match?.name}
                  onChange={event => this.fieldChanged(event)}
                />
                <span className="invalid-feedback">
                  {this.state.controls["title"].error.required ? (
                    <span>Enter a name</span>
                  ) : null}
                  {this.state.controls["title"].error.minLength ? (
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
                  value={this.props.match?.code}
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
                  value={this.props.match?.description}
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
            to="/matches"
            style={{ width: "80px" }}
          >
            <i className="fa fa-chevron-left"></i> Back
          </NavLink>
        </div>
      </div>
    );

    return this.state.submitted && this.props.saved ? (
      <Redirect to={"/matches/" + this.props.match.id} />
    ) : (
        form0
      );
  }
}

const mapStateToProps = state => {
  return {
    match: state.match.match,
    saved: state.match.saved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMatch: id => dispatch(actions.fetchMatch(id)),
    updateMatch: match => dispatch(actions.updateMatch(match)),
    resetMatch: () => dispatch(actions.resetMatch()),
    saveMatch: match => dispatch(actions.saveMatch(match))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMatch);
