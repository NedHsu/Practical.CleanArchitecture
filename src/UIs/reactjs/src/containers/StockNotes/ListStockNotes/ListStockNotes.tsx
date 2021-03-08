import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import logo from "../../../logo.svg";
import * as actions from "../actions";
import Star from "../../../components/Star/Star";
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

  toggleImage = () => {
    this.setState({ showImage: !this.state.showImage });
  };

  toggleAddNote = () => {
    console.log("toggleAddNote");
    this.setState({ showListNote: this.state.showAddNote, showAddNote: !this.state.showAddNote });
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.stocknotes.filter(
      (stocknote) => stocknote.title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked = (event) => {
    const pageTitle = "StockNote List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  deleteStockNote = (stocknote) => {
    this.setState({ showDeleteModal: true, deletingStockNote: stocknote });
  };

  editStockNote = (stocknote) => {
    this.props.updateStockNote(stocknote);
    this.toggleAddNote();
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingStockNote: null });
  };

  deleteConfirmed = () => {
    this.props.deleteStockNote(this.state.deletingStockNote);
    this.setState({ showDeleteModal: false, deletingStockNote: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    //this.props.fetchStockNotes();
  }

  render() {
    const filteredStockNotes = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stocknotes;

    const rows = filteredStockNotes?.map((stocknote) => (
      <tr key={stocknote.id}>
        <td>
          <NavLink to={"/stocknotes/" + stocknote.id}>{stocknote.title}</NavLink>
        </td>
        <td>{stocknote.contents}</td>
        <td>{stocknote.price || (5).toFixed(2)}</td>
        <td>
          <Star
            rating={stocknote.starRating || 4}
            ratingClicked={(event) => this.onRatingClicked(event)}
          ></Star>
        </td>
        <td>
          <Button variant="primary" onClick={() => this.editStockNote(stocknote)}>
            Edit
          </Button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteStockNote(stocknote)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.stocknotes ? (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Price</th>
            <th>5 Star Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;

    const deleteModal = (
      <Modal show={this.state.showDeleteModal} onHide={this.deleteCanceled}>
        <Modal.Header closeButton>
          <Modal.Title>Delete StockNote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingStockNote?.name}</strong>
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
            <Button variant="primary" style={{ float: "right" }} onClick={() => this.toggleAddNote()}>Add StockNote</Button>
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
        {addStockNote}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocknotes: state.stockNote.stocknotes,
    auditLogs: state.stockNote.auditLogs,
    stock: state.stockNote.stock,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockNotes: (stock) => dispatch(actions.fetchStockNotes(stock)),
    deleteStockNote: (stocknote) => dispatch(actions.deleteStockNote(stocknote)),
    updateStockNote: stocknote => dispatch(actions.updateStockNote(stocknote)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockNotes);
