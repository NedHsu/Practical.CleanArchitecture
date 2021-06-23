import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button, Row, Col, FormControl } from "react-bootstrap";
import ListNotes from "../../StockNotes/ListStockNotes/ListStockNotes";
import Menu from "../Menu/Menu";
import TrendLine from "../TrendLine/TrendLine";
import GroupModal from "../GroupModal/GroupModal";
import Spinner from "../../../components/Spinner/Spinner";

import * as actions from "../actions";
import styles from "./ListStocks.module.scss";
import * as noteActions from "../../StockNotes/actions";
import * as groupActions from "../../StockGroups/actions";
import * as groupItemActions from "../../StockGroupItems/actions";
import * as daysActions from "../../StockDays/actions";
import { IoMdAddCircle, IoMdClose, IoMdCheckmark, IoIosTrash } from "react-icons/io"
import { GrList, GrNotes } from "react-icons/gr";

class ListStocks extends Component<any, any> {
  groupTitleField: any;
  filterTimer: any;
  constructor(props) {
    super(props);
    this.groupTitleField = React.createRef();
  }

  state = {
    pageTitle: "Stock List",
    showTrendLine: false,
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

  toggleTrendLine = () => {
    if (!this.state.showTrendLine) {
      let endDate = new Date();
      let startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 6);

      this.props.fetchStocksDays({
        stockCodes: this.props.stocks.map(x => x.code),
        startDate: startDate,
        endDate: endDate,
      });
    }
    this.setState({ showTrendLine: !this.state.showTrendLine });
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
    this.setState({ stockGroupIds: stockGroupIds });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.stocks.filter(
      (stock) => (stock.name + stock.code).toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

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

  componentDidMount() {
    console.log("componentDidMount");
    this.selectGroup({});
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
    this.setState({ showTrendLine: false, listFilter: "", });
  }

  editGroups = (stock) => {
    this.setState({ showGroupsModal: true, stock: stock, });
    this.props.fetchStockGroupItems(stock);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stockGroupItems !== this.props.stockGroupItems) {
      var stockGroupIds = this.props.stockGroupItems.map(x => x.groupId);
      this.setState({ stockGroupIds: stockGroupIds });
    }
    if (prevProps.stockGroupItemDeleting && !this.props.stockGroupItemDeleting && this.props.stockGroupItemDeleted && this.props.stockGroupItem) {
      this.props.removeListStock(this.props.stockGroupItem.stockCode);
      console.log(this.props.stockGroupItem, "stockGroupItem deleted");
    }
  }

  render() {
    const filteredStocks = this.state.listFilter && this.props.stockGroup?.id
      ? this.performFilter(this.state.listFilter)
      : this.props.stocks;

    const rows = filteredStocks?.map((stock) => (
      <tr key={"S" + stock.code}>
        <td>
          {this.state.showTrendLine && this.props.stockDayMaps && this.props.stockDayMaps[stock.code] ? (
            <div>
              <TrendLine id={`tl-${stock.code}`} data={this.props.stockDayMaps[stock.code]}></TrendLine>
            </div>
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
          <GrNotes onClick={() => this.viewNotes(stock)} title="View Notes"></GrNotes>
          &nbsp;
          <GrList onClick={() => this.editGroups(stock)} title="Edit Groups"></GrList>
        </td>
      </tr>
    ));

    const table = this.props.stocks ? (
      <table className="table">
        <thead>
          <tr>
            <th>
              <button className="btn btn-primary" onClick={this.toggleTrendLine}>
                {this.state.showTrendLine ? "Hide" : "Show"} Lines
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
      <Modal size="xl" show={this.state.showNotesModal} onHide={() => this.setState({ showNotesModal: false })} >
        <ListNotes>
        </ListNotes>
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
            <Menu />
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
                  <Col md={9}>
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
                  <Col md={3}>
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
              <div className="col"></div>
              <NavLink
                className="btn btn-primary"
                style={{ float: "right", marginRight: "10px" }}
                to="/stocks/add"
              >
                Add Stock
              </NavLink>
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
        {deleteModal}
        {listNoteModal}
        <GroupModal showGroupsModal={this.state.showGroupsModal} stock={this.state.stock} hide={() => this.setState({ showGroupsModal: false })} />
        <Spinner loading={this.props.stockLoading || this.props.groupLoading || this.props.stockGroupItemLoading} fullscreen />
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
    stockGroupItem: state.stockGroupItem.stockGroupItem,
    stockGroupItemDeleting: state.stockGroupItem.deleting,
    stockGroupItemDeleted: state.stockGroupItem.deleted,
    stockTotalCount: state.stock.totalCount,
    stockTotalPage: state.stock.totalPage,
    stockLoading: state.stock.loading,
    stockDayMaps: state.stockDay.stockDayMaps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: (options) => dispatch(actions.fetchStocks(options)),
    fetchGroupStocks: (group) => dispatch(actions.fetchGroupStocks(group)),
    removeListStock: (stockCode) => dispatch(actions.removeListStock(stockCode)),
    deleteStock: (stock) => dispatch(actions.deleteStock(stock)),
    fetchStockNotes: (stock) => dispatch(noteActions.fetchStockNotes(stock)),
    fetchStockGroups: () => dispatch(groupActions.fetchStockGroups()),
    saveStockGroup: (stockGroup) => dispatch(groupActions.saveStockGroup(stockGroup)),
    updateStockGroup: (stockGroup) => dispatch(groupActions.updateStockGroup(stockGroup)),
    resetStockGroup: () => dispatch(groupActions.resetStockGroup()),
    deleteStockGroup: (stockGroup) => dispatch(groupActions.deleteStockGroup(stockGroup)),
    fetchStockGroupItems: (stock) => dispatch(groupItemActions.fetchStockGroupItems(stock)),
    deleteStockGroupItem: (stockGroupItem) => dispatch(groupItemActions.deleteStockGroupItem(stockGroupItem)),
    fetchStocksDays: (options) => dispatch(daysActions.fetchStocksDays(options)),
    resetStockNote: () => dispatch(noteActions.resetStockNote()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStocks);
