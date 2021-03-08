import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button, Row, Col, Form, FormControl } from "react-bootstrap";

import logo from "../../../logo.svg";
import * as actions from "../actions";
import Star from "../../../components/Star/Star";
import styles from "./ListStocks.module.scss";
import * as noteActions from "../../StockNotes/actions";
import ListNotes from "../../StockNotes/ListStockNotes/ListStockNotes";
import * as groupActions from "../../StockGroups/actions";
import { IoMdAddCircle, IoMdClose, IoMdCheckmark } from "react-icons/io"

class ListStocks extends Component<any, any> {
  state = {
    pageTitle: "Stock List",
    showImage: false,
    showDeleteModal: false,
    deletingStock: {
      name: null
    },
    listFilter: "",
    showAuditLogsModal: false,
    showNotesModal: false,
    showGroupEditor: false,
  };

  toggleImage = () => {
    this.setState({ showImage: !this.state.showImage });
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.stocks.filter(
      (stock) => (stock.name + stock.code).toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked = (event) => {
    const pageTitle = "Stock List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  viewAuditLogs = (stock) => {
    this.props.fetchAuditLogs(stock);
    this.setState({ showAuditLogsModal: true });
  };

  viewNotes = (stock) => {
    this.props.fetchStockNotes(stock);
    this.setState({ showNotesModal: true });
  };

  deleteStock = (stock) => {
    this.setState({ showDeleteModal: true, deletingStock: stock });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingStock: null });
  };

  deleteConfirmed = () => {
    this.props.deleteStock(this.state.deletingStock);
    this.setState({ showDeleteModal: false, deletingStock: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchStocks();
    this.props.fetchStockGroups();
  }

  showStockGroupEditor(stockGroup) {
    this.props.updateStockGroup({ ...this.props.stockGroup, ...stockGroup });
    this.setState({ showGroupEditor: true });
  }

  closeStockGroupEditor() {
    this.setState({ showGroupEditor: false });
  }

  async submitStockGroupForm() {
    await this.props.saveStockGroup(this.props.stockGroup);
    this.closeStockGroupEditor();
  }

  stockGroupChanged = event => {
    this.props.updateStockGroup({
      ...this.props.stockGroup,
      [event.target.name]: event.target.value
    });
  }

  selectGroup(stockGroup) {
    this.props.updateStockGroup(stockGroup);
  }

  render() {
    const filteredStocks = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stocks;

    const rows = filteredStocks?.slice(0, 10).map((stock) => (
      <tr key={stock.code}>
        <td>
          {this.state.showImage ? (
            <img
              src={stock.imageUrl || logo}
              title={stock.name}
              style={{ width: "50px", margin: "2px" }}
            />
          ) : null}
        </td>
        <td>
          <NavLink to={"/stocks/" + stock.code}>({stock.code}){stock.name}</NavLink>
        </td>
        <td>{stock.note}</td>
        <td className={styles.test}>{stock.price || "--"}</td>
        <td>
          <Star
            rating={stock.starRating || 4}
            ratingClicked={(event) => this.onRatingClicked(event)}
          ></Star>
        </td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/stocks/edit/" + stock.code}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-secondary"
            onClick={() => this.viewAuditLogs(stock)}
          >
            View Audit Logs
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteStock(stock)}
          >
            Delete
          </button>
          &nbsp;
          <Button onClick={() => this.viewNotes(stock)}>
            View Notes
          </Button>
        </td>
      </tr>
    ));

    const table = this.props.stocks ? (
      <table className="table">
        <thead>
          <tr>
            <th>
              <button className="btn btn-primary" onClick={this.toggleImage}>
                {this.state.showImage ? "Hide" : "Show"} Image
              </button>
            </th>
            <th>Stock</th>
            <th>Note</th>
            <th>Price</th>
            <th>5 Star Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;
    const auditLogRows = this.props.auditLogs?.map((auditLog) => (
      <tr key={auditLog.id}>
        <td>{this.formatDateTime(auditLog.createdDateTime)}</td>
        <td>{auditLog.userName}</td>
        <td>{auditLog.action}</td>
        <td style={{ color: auditLog.highLight.code ? "red" : "" }}>
          {auditLog.data.code}
        </td>
        <td style={{ color: auditLog.highLight.name ? "red" : "" }}>
          {auditLog.data.name}
        </td>
        <td style={{ color: auditLog.highLight.description ? "red" : "" }}>
          {auditLog.data.description}
        </td>
      </tr>
    ));
    const auditLogsModal = (
      <Modal
        size="xl"
        show={this.state.showAuditLogsModal}
        onHide={() => this.setState({ showAuditLogsModal: false })}
      >
        <Modal.Body>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Date Time</th>
                  <th>User Name</th>
                  <th>Action</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>{auditLogRows}</tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    );

    const deleteModal = (
      <Modal show={this.state.showDeleteModal} onHide={this.deleteCanceled}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingStock?.name}</strong>
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

    const listNoteModal = (
      <Modal size="xl" show={this.state.showNotesModal} onHide={() => this.setState({ showNotesModal: false })}>
        <ListNotes></ListNotes>
      </Modal>
    );

    const stockGroupTags = this.props.stockGroups?.map((item) => (
      <Col key={item.id} md={1} className={styles.groupTags}>
        <Button
          variant="outline-dark"
          active={this.props.stockGroup?.id === item.id}
          block
          onClick={() => this.selectGroup(item)}
          onDoubleClick={() => this.showStockGroupEditor(item)}>
          {item.groupTitle}
        </Button>
      </Col>
    ));

    return (
      <div>
        <div className="card">
          <div className="card-header">
            {this.state.pageTitle}
            <NavLink
              className="btn btn-primary"
              style={{ float: "right" }}
              to="/stocks/add"
            >
              Add Stock
            </NavLink>
          </div>
          <div className="card-body">
            <Row>
              <Col md={1} className={styles.groupTags}>
                Groups:
              </Col>
              {stockGroupTags}
              <Col md={2} hidden={!this.state.showGroupEditor} className={styles.groupTags}>
                <Row>
                  <Col md={10}>
                    <Form>
                      <FormControl id="groupTitle" name="groupTitle" className="mb-2" type="text" placeholder="" value={this.props.stockGroup?.groupTitle} onChange={this.stockGroupChanged}>
                      </FormControl>
                    </Form>
                  </Col>
                  <Col md={2}>
                    <Button variant="link" onClick={() => this.submitStockGroupForm()} style={{ color: "#43A047" }}>
                      <IoMdCheckmark size="1.5rem"></IoMdCheckmark>
                    </Button>
                    <Button variant="link" onClick={() => this.closeStockGroupEditor()} style={{ color: "red" }}>
                      <IoMdClose size="1.5rem"></IoMdClose>
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col className={styles.groupTags}>
                <Button variant="link" onClick={() => this.showStockGroupEditor({ id: null, groupTitle: "", sort: this.props.stockGroups?.length ?? 0 })}>
                  <IoMdAddCircle size="1.5rem" />
                </Button>
              </Col>
            </Row>
            <hr />
            <div className="row">
              <div className="col-md-1">Filter by:</div>
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
        {auditLogsModal}
        {listNoteModal}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state.stock.stocks,
    auditLogs: state.stock.auditLogs,
    stockGroups: state.stockGroup.stockGroups,
    stockGroup: state.stockGroup.stockGroup,
    groupLoading: state.stockGroup.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: () => dispatch(actions.fetchStocks()),
    deleteStock: (stock) => dispatch(actions.deleteStock(stock)),
    fetchAuditLogs: (stock) => dispatch(actions.fetchAuditLogs(stock)),
    fetchStockNotes: (stock) => dispatch(noteActions.fetchStockNotes(stock)),
    fetchStockGroups: () => dispatch(groupActions.fetchStockGroups()),
    saveStockGroup: (stockGroup) => dispatch(groupActions.saveStockGroup(stockGroup)),
    updateStockGroup: (stockGroup) => dispatch(groupActions.updateStockGroup(stockGroup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStocks);
