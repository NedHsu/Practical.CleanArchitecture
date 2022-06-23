import { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";

import * as actions from "../actions";
import AddStockNote from "../AddStockNote/AddStockNote";
import StickyNote from "../../../components/StickyNote/StickyNote";
import Menu from "../../Stocks/Menu/Menu";
import dayjs from "dayjs";
import { GrEdit } from "react-icons/gr";
import styles from "./StickyStockNotes.module.scss";

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
    this.setState((prevState, props) => ({ showListNote: prevState.showAddNote, showAddNote: !prevState.showAddNote }));
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

  componentDidMount() {
    this.props.fetchAllStockNotes({
      pageIndex: 1,
      pageSize: 50,
    });
  }

  render() {
    console.log("render");
    const filteredStockNotes = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stockNotes;

    const cols = filteredStockNotes?.map((stockNote) => {
      return (
        <Col md="3" key={stockNote.id} onMouseEnter={() => { }}>
          <StickyNote title={`(${stockNote.stockCode})${stockNote.stockName} ${stockNote.title}`} content={stockNote.contents}>
            <span className={styles.noteContent}>{stockNote.contents}</span><br />
            <span className={styles.noteFooter}>{dayjs(stockNote.updated ?? stockNote.created).format("YYYY-MM-DD hh:mm")}</span>
            <GrEdit className={styles.editIcon} onClick={() => { this.editStockNote(stockNote) }} />
          </StickyNote>
        </Col>
      )
    });

    const board = this.props.stockNotes ? (
      <Row>
        {cols}
      </Row>
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
            <Menu />
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label style={{ marginRight: 10 }}>Filter by:</label>
                <input
                  id="listFilter"
                  type="text"
                  value={this.state.listFilter}
                  onChange={(event) => this.filterChanged(event)}
                />
              </div>
              <div className="col"></div>
              <Col>
                <Button variant="primary" style={{ float: "right", marginRight: "10px" }} onClick={() => { this.props.resetStockNote(); this.toggleAddNote(); }}>Add StockNote</Button>
              </Col>
            </div>
            {this.state.listFilter ? (
              <div className="row">
                <div className="col-md-6">
                  <h4>Filtered by: {this.state.listFilter}</h4>
                </div>
              </div>
            ) : null}
            {board}
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
    fetchAllStockNotes: (options) => dispatch(actions.fetchAllStockNotes(options)),
    deleteStockNote: (stockNote) => dispatch(actions.deleteStockNote(stockNote)),
    updateStockNote: stockNote => dispatch(actions.updateStockNote(stockNote)),
    resetStockNote: () => dispatch(actions.resetStockNote()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockNotes);
