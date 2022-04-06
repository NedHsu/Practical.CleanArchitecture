import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import { checkValidity } from "../../../shared/utility";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Translation } from "react-i18next";

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
    const form = (t) => (
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
            <Form.Group>
              <Form.Label></Form.Label>
              <Col>
                <Form.Control></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={2}></Col>
              <Col sm={10}>
                <Button type="submit">{t('labels.save')}</Button>
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

    return this.state.submitted && this.props.saved ? (
      <Redirect to={"/matches/" + this.props.match.id} />
    ) : (
      <Translation>
        {
          (t) => form(t)
        }
      </Translation>
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
