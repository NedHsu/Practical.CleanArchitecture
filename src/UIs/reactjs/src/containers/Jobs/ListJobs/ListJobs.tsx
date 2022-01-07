import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import * as actions from "../actions";

class ListJobs extends Component<any, any> {
  state = {
    pageTitle: "Job List",
    showImage: false,
    showDeleteModal: false,
    deletingJob: {
      name: null
    },
    listFilter: "",
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.jobs.filter(
      (job) => job.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked = (event) => {
    const pageTitle = "Job List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  deleteJob = (job) => {
    this.setState({ showDeleteModal: true, deletingJob: job });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingJob: null });
  };

  deleteConfirmed = () => {
    this.props.deleteJob(this.state.deletingJob);
    this.setState({ showDeleteModal: false, deletingJob: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchJobs();
  }

  render() {
    const filteredJobs = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.jobs;

    const rows = filteredJobs?.map((job) => (
      <tr key={job.id}>
        <td>
          <NavLink to={"/jobs/" + job.id}>{job.name}</NavLink>
        </td>
        <td>{job.code?.toLocaleUpperCase()}</td>
        <td>{job.description}</td>
        <td>{job.price || (5).toFixed(2)}</td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/jobs/edit/" + job.id}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteJob(job)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.jobs ? (
      <table className="table">
        <thead>
          <tr>
            <th>Job</th>
            <th>Code</th>
            <th>Description</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;

    const deleteModal = (
      <Modal show={this.state.showDeleteModal} onHide={this.deleteCanceled}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingJob?.name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.deleteCanceled}>
            No
          </Button>
          <Button variant="primary" onClick={this.deleteConfirmed}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div>
        <div className="card">
          <div className="card-header">
            {this.state.pageTitle}
            <NavLink
              className="btn btn-primary"
              style={{ float: "right" }}
              to="/jobs/add"
            >
              Add Job
            </NavLink>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">Filter by:</div>
              <div className="col-md-4">
                <input
                  type="text"
                  value={this.state.listFilter}
                  onChange={(event) => this.filterChanged(event)}
                />
              </div>
            </div>
            {this.state.listFilter ? (
              <div className="row">
                <div className="col-md-6">
                  <h4>Filtered by: {this.state.listFilter}</h4>
                </div>
              </div>
            ) : null}
            <div className="table-responsive">{table}</div>
          </div>
        </div>
        {this.props.errorMessage ? (
          <div className="alert alert-danger">
            Error: {this.props.errorMessage}
          </div>
        ) : null}
        {deleteModal}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.job.jobs,
    auditLogs: state.job.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJobs: () => dispatch(actions.fetchJobs()),
    deleteJob: (job) => dispatch(actions.deleteJob(job)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListJobs);
