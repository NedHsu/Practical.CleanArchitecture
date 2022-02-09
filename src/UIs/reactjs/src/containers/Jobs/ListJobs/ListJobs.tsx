import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button, ModalBody } from "react-bootstrap";

import AddJob from "../AddJob/AddJob";
import * as actions from "../actions";
import dayjs from "dayjs";
import TimeZone from "dayjs/plugin/timezone";
dayjs.extend(TimeZone);

class ListJobs extends Component<any, any> {
  state = {
    pageTitle: "Job List",
    showImage: false,
    showDeleteModal: false,
    showAddModal: false,
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

  addCanceled = (reload) => {
    this.setState({ showAddModal: false, });
    if (reload) {
      this.props.fetchJobs();
    }
  };

  showAddModal = () => {
    this.setState({ showAddModal: true, });
  }

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
        <td>{job.provider}</td>
        <td>{job.arguments}</td>
        <td>{dayjs(job.createdAt).format("MMM DD HH:mm:ss")}-{job.expireAt ? dayjs(job.expireAt).format("MMM DD HH:mm:ss") : ""}</td>
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
            <th>Provider</th>
            <th>Arguments</th>
            <th>Time</th>
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

    const addModal = (
      <Modal show={this.state.showAddModal} onHide={() => this.addCanceled(false)}>
        <ModalBody>
          <AddJob back={this.addCanceled} />
        </ModalBody>
      </Modal>
    )

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <Button
              className="btn btn-secondary"
              active={true}
            >
              {this.state.pageTitle}
            </Button>
            <NavLink
              className="btn outline-info"
              to={"/jobsrcs/"}
            >
              Sripts
            </NavLink>
            <Button
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={this.showAddModal}
            >
              Add Job
            </Button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <label style={{ marginRight: 10 }}>Filter by:</label>
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
        {addModal}
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
