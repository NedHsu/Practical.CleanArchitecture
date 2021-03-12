import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button, Row, Col, Form, FormControl, Card, Spinner } from "react-bootstrap";

import logo from "../../../logo.svg";
import * as actions from "../actions";
import Star from "../../../components/Star/Star";
import styles from "./ListStocks.module.scss";
import * as noteActions from "../../StockNotes/actions";
import ListNotes from "../../StockNotes/ListStockNotes/ListStockNotes";
import * as groupActions from "../../StockGroups/actions";
import * as groupItemActions from "../../StockGroupItems/actions";
import { IoMdAddCircle, IoMdClose, IoMdCheckmark, IoIosTrash } from "react-icons/io"

class ListStocks extends Component<any, any> {
  groupTitleField: any;
  filterTimer: any;
  constructor(props) {
    super(props);
    this.groupTitleField = React.createRef();
  }

  state = {
    pageTitle: "Stock List",
    showImage: false,
    showDeleteModal: false,
    deletingStock: {
      name: null
    },
    listFilter: "",
    showNotesModal: false,
    showGroupEditor: false,
    showGroupsModal: false,
    stockGroupIds: Array<string>(),
    stock: {
      code: "",
      name: "",
    },
    pageIndex: 1,
    pageSize: 50,
  };

  toggleImage = () => {
    this.setState({ showImage: !this.state.showImage });
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
    if (this.props.stockGroup.id) {
      return;
    }

    if (this.filterTimer !== undefined) {
      clearTimeout(this.filterTimer);
    }

    this.filterTimer = setTimeout(() => {
      this.props.fetchStocks({
        pageSize: this.state.pageSize,
        pageIndex: 1,
        keyword: this.state.listFilter,
      })
    }, 500);
  };

  groupCheckChanged = (event) => {
    var stockGroupIds = this.state.stockGroupIds;
    if (event.target.checked) {
      stockGroupIds.push(event.target.value);
    } else {
      stockGroupIds.splice(stockGroupIds.indexOf(event.target.value), 1);
    }
    this.setState({ stockGroupIds: stockGroupIds })
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

  viewNotes = (stock) => {
    this.props.fetchStockNotes(stock);
    this.setState({ showNotesModal: true });
  };

  deleteStock = (stock) => {
    this.props.deleteStockGroupItem({ stockCode: stock.code, groupId: this.props.stockGroup.id });
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
    this.props.fetchStocks({
      pageSize: this.state.pageSize,
      pageIndex: this.state.pageIndex,
    });
    this.props.fetchStockGroups();
  }

  showStockGroupEditor(stockGroup) {
    this.props.updateStockGroup({ ...this.props.stockGroup, ...stockGroup });
    this.groupTitleField.current.focus();
    this.setState({ showGroupEditor: true });
  }

  closeStockGroupEditor() {
    this.setState({ showGroupEditor: false });
  }

  saveStockGroup() {
    this.props.saveStockGroup(this.props.stockGroup);
    this.closeStockGroupEditor();
  }

  deleteStockGroup() {
    this.props.deleteStockGroup(this.props.stockGroup);
    this.closeStockGroupEditor();
  }

  stockGroupChanged = event => {
    this.props.updateStockGroup({
      ...this.props.stockGroup,
      [event.target.name]: event.target.value
    });
  }

  selectGroup(stockGroup) {
    if (stockGroup?.id) {
      this.props.updateStockGroup(stockGroup);
      this.props.fetchGroupStocks(stockGroup);
    } else {
      this.props.resetStockGroup();
      this.props.fetchStocks({
        pageIndex: 1,
        pageSize: this.state.pageSize,
      });
      this.closeStockGroupEditor();
    }
  }

  editGroups = (stock) => {
    this.setState({ showGroupsModal: true, stock: stock, });
    this.props.fetchStockGroupItems(stock);
  };

  saveStockGroups() {
    this.props.saveStockGroupItems(this.state.stock.code, this.state.stockGroupIds);
    this.setState({ showGroupsModal: false, });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stockGroupItems !== this.props.stockGroupItems) {
      var stockGroupIds = this.props.stockGroupItems.map(x => x.groupId);
      this.setState({ stockGroupIds: stockGroupIds });
    }
  }

  render() {
    const filteredStocks = this.state.listFilter && this.props.stockGroup.id
      ? this.performFilter(this.state.listFilter)
      : this.props.stocks;

    const rows = filteredStocks?.map((stock) => (
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
        <td>{stock.industry}</td>
        <td className={styles.test}>{stock.closePrice || "--"}</td>
        <td>
          {stock.fivePrice}/{stock.tenPrice}/{stock.twentyPrice}/{stock.sixtyPrice}
        </td>
        <td>{stock.fetchDate}</td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/stocks/edit/" + stock.code}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            hidden={!this.props.stockGroup.id}
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteStock(stock)}
          >
            Delete
          </button>
          &nbsp;
          <Button onClick={() => this.viewNotes(stock)} variant="secondary">
            View Notes
          </Button>
          &nbsp;
          <Button onClick={() => this.editGroups(stock)}>
            Edit Groups
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
            <th>Industry</th>
            <th>Price</th>
            <th>5/10/20/60</th>
            <th>Fetch Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;

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

    const GroupOptions = this.props.stockGroups?.map((item) => (
      <Col key={`check-${item.id}`} md={4}>
        <Form.Check
          custom
          type="checkbox"
          id={`group-check-${item.id}`}
          label={item.groupTitle}
          checked={this.state.stockGroupIds.indexOf(item.id) > -1}
          value={item.id}
          onChange={this.groupCheckChanged}
        />
      </Col>
    ));

    const GroupOptionsModal = (
      <Modal show={this.state.showGroupsModal} onHide={() => this.setState({ showGroupsModal: false })}>
        <Card>
          <Card.Header>
            ({this.state.stock.code}) {this.state.stock.name}
          </Card.Header>
          <Card.Body>
            <Form>
              <Row>
                {GroupOptions}
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showGroupsModal: false })}>
              No
            </Button>
            &nbsp;
            <Button onClick={() => this.saveStockGroups()} disabled={this.props.stockGroupItemLoading}>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                hidden={!this.props.stockGroupItemLoading}
              />
              Save
            </Button>
          </Card.Footer>
        </Card>
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
              <Col md={1} className={styles.groupTags}>
                <Button
                  variant="outline-dark"
                  active={!this.props.stockGroup?.id}
                  block
                  onClick={() => this.selectGroup({})}>
                  All
                </Button>
              </Col>
              {stockGroupTags}
              <Col md={2} hidden={!this.state.showGroupEditor} className={styles.groupTags}>
                <Row>
                  <Col md={10}>
                    <FormControl
                      id="groupTitle"
                      name="groupTitle"
                      className="mb-2"
                      type="text"
                      placeholder=""
                      ref={this.groupTitleField}
                      value={this.props.stockGroup?.groupTitle}
                      onChange={this.stockGroupChanged}
                      onKeyPress={(event) => { if (event.charCode === 13) { this.saveStockGroup() } }}>
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button variant="link" onClick={() => this.saveStockGroup()} style={{ color: "#43A047" }}>
                      <IoMdCheckmark size="1.5rem"></IoMdCheckmark>
                    </Button>
                    <Button variant="link" onClick={() => this.closeStockGroupEditor()} style={{ color: "red" }}>
                      <IoMdClose size="1.5rem"></IoMdClose>
                    </Button>
                    <Button variant="link" onClick={() => this.deleteStockGroup()} hidden={!this.props.stockGroup?.id}>
                      <IoIosTrash size="1.5rem"></IoIosTrash>
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
        <div onScroll={(event) => console.log(event)}>
        </div>
        {
          this.props.errorMessage ? (
            <div className="alert alert-danger">
              Error: {this.props.errorMessage}
            </div>
          ) : null
        }
        { deleteModal}
        { listNoteModal}
        { GroupOptionsModal}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state.stock.stocks,
    stockGroups: state.stockGroup.stockGroups,
    stockGroup: state.stockGroup.stockGroup,
    groupLoading: state.stockGroup.loading,
    stockGroupItems: state.stockGroupItem.stockGroupItems,
    stockGroupItemLoading: state.stockGroupItem.loading,
    stockTotalCount: state.stock.totalCount,
    stockTotalPage: state.stock.totalPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: (options) => dispatch(actions.fetchStocks(options)),
    fetchGroupStocks: (group) => dispatch(actions.fetchGroupStocks(group)),
    deleteStock: (stock) => dispatch(actions.deleteStock(stock)),
    fetchStockNotes: (stock) => dispatch(noteActions.fetchStockNotes(stock)),
    fetchStockGroups: () => dispatch(groupActions.fetchStockGroups()),
    saveStockGroup: (stockGroup) => dispatch(groupActions.saveStockGroup(stockGroup)),
    updateStockGroup: (stockGroup) => dispatch(groupActions.updateStockGroup(stockGroup)),
    resetStockGroup: () => dispatch(groupActions.resetStockGroup()),
    deleteStockGroup: (stockGroup) => dispatch(groupActions.deleteStockGroup(stockGroup)),
    fetchStockGroupItems: (stock) => dispatch(groupItemActions.fetchStockGroupItems(stock)),
    saveStockGroupItems: (stockCode, groupIds) => dispatch(groupItemActions.saveStockGroupItems(stockCode, groupIds)),
    deleteStockGroupItem: (stockGroupItem) => dispatch(groupItemActions.deleteStockGroupItem(stockGroupItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStocks);
