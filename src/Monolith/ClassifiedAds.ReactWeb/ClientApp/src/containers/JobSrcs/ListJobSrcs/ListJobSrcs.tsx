import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import { Button } from "react-bootstrap";
import { IoIosTrash } from "react-icons/io";
import { GrEdit } from "react-icons/gr";

class ListJobSrcs extends Component<any, any> {
  state = {
    pageTitle: "JobSrc List",
    deletingJobSrc: {
      name: null
    },
    listFilter: "",
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.jobSrcs.filter(
      (jobSrc) => jobSrc.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  componentDidMount() {
    this.props.fetchJobSrcs();
  }

  render() {
    const filteredJobSrcs = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.jobSrcs;

    const rows = filteredJobSrcs?.map((jobSrc) => (
      <tr key={jobSrc.provider + jobSrc.name}>
        <td>{jobSrc.provider}</td>
        <td>
          {jobSrc.name}
        </td>
        <td>{jobSrc.src}</td>
        <td>{jobSrc.createdAt}</td>
        <td>
          <NavLink
            to={`/jobSrcs/edit/${jobSrc.provider}/${jobSrc.name}`}
          >
            <GrEdit></GrEdit>
          </NavLink>
          <Button variant="link" onClick={() => this.deleteJobSrc(jobSrc)}>
            <IoIosTrash size="1.5rem"></IoIosTrash>
          </Button>
        </td>
      </tr>
    ));

    const table = this.props.jobSrcs ? (
      <table className="table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Name</th>
            <th>Src</th>
            <th>Create At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;

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
              to={"/jobs/"}
            >
              Job List
            </NavLink>
            <NavLink
              className="btn btn-primary"
              style={{ float: "right" }}
              to="/jobSrcs/add"
            >
              Add JobSrc
            </NavLink>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
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
      </div>
    );
  }
  deleteJobSrc(jobSrc): void {
    this.props.deleteJobSrc(jobSrc);
  }
}

const mapStateToProps = (state) => {
  return {
    jobSrcs: state.jobSrc.jobSrcs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJobSrcs: () => dispatch(actions.fetchJobSrcs()),
    deleteJobSrc: (jobSrc) => dispatch(actions.deleteJobSrc(jobSrc)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListJobSrcs);
