import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

class ListFunderScores extends Component<any, any> {
  state = {

  };
  
  componentDidMount() {
    this.props.fetchFunderScores({startDate: "2021-10-1"});
  }

  render() {
    const filteredFunderScores = this.props.funderScores?.slice(0, 15);

    const rows = filteredFunderScores?.map((funderScore) => (
      <tr key={funderScore.code}>
        <td>
          <NavLink to={"/stocks/" + funderScore.code}>({funderScore.code}){funderScore.name}</NavLink>
        </td>
        <td>{funderScore.creditScore ?? '-'}</td>
        <td>{funderScore.foreignScore ?? '-'}</td>
      </tr>
    ));

    const table = this.props.funderScores ? (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Credit</th>
            <th>Foreign</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;

    return (
      <div>
        <div className="card">
          <div className="card-body">
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
}

const mapStateToProps = (state) => {
  return {
    funderScores: state.stockFunder.funderScores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFunderScores: (options) => dispatch(actions.fetchFunderScores(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFunderScores);
