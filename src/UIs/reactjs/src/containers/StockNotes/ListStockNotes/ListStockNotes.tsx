import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import * as actions from "../actions";
import AddStockNote from "../AddStockNote/AddStockNote";
import ViewStockNote from "../ViewStockNote/ViewStockNote";

class ListStockNotes extends Component<any, any> {
  state = {
    pageTitle: "StockNote List",
    showImage: false,
    showDeleteModal: false,
    deletingStockNote: {
      name: null
    },
    listFilter: "",
    showAddNote: false,
    showListNote: true,
    stockNoteId: null,
  };

  toggleAddNote = () => {
    this.setState({ showListNote: this.state.showAddNote, showAddNote: !this.state.showAddNote });
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.stockNotes.filter(
      (stockNote) => stockNote.title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  deleteStockNote = (stockNote) => {
    this.setState({ showDeleteModal: true, deletingStockNote: stockNote });
  };

  editStockNote = (stockNote) => {
    this.props.updateStockNote(stockNote);
    this.toggleAddNote();
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingStockNote: null });
  };

  deleteConfirmed = async () => {
    await this.props.deleteStockNote(this.state.deletingStockNote);
    this.setState({ showDeleteModal: false, deletingStockNote: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  AddStockNote = () => {
    this.toggleAddNote();
    this.props.updateStockNote({
      stockCode: this.props.stock.code,
      stockName: this.props.stock.name,
    });
  };

  componentDidMount() {
  }

  render() {
    const filteredStockNotes = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stockNotes;

    const rows = filteredStockNotes?.map((stockNote) => (
      <tr key={stockNote.id}>
        <td>
          <NavLink to={"/stockNotes/" + stockNote.id}>{stockNote.title}</NavLink>
        </td>
        <td>{stockNote.contents}</td>
        <td>{stockNote.price || (5).toFixed(2)}</td>
        <td>
          <Button variant="primary" onClick={() => this.editStockNote(stockNote)}>
            Edit
          </Button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteStockNote(stockNote)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.stockNotes ? (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;

    const addStockNote = (
      <div hidden={!this.state.showAddNote}>
        <AddStockNote back={() => this.toggleAddNote()} stockNoteId={this.state.stockNoteId}></AddStockNote>
      </div>
    );

    return (
      <div>
        <div hidden={!this.state.showListNote} className="card">
          <div className="card-header">
            {this.state.pageTitle}
            <Button variant="primary" style={{ float: "right" }} onClick={this.AddStockNote}>Add StockNote</Button>
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
        {addStockNote}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stockNotes: state.stockNote.stockNotes,
    stock: state.stockNote.stock,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStockNote: (stockNote) => dispatch(actions.deleteStockNote(stockNote)),
    updateStockNote: stockNote => dispatch(actions.updateStockNote(stockNote)),
    resetStockNote: () => dispatch(actions.resetStockNote()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockNotes);
