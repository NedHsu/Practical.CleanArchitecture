import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Menu from "../Menu/Menu";
import GroupModal from "../GroupModal/GroupModal";
import ListNotes from "../../StockNotes/ListStockNotes/ListStockNotes";

import * as actions from "../actions";
import * as daysActions from "../../StockDays/actions";
import * as noteActions from "../../StockNotes/actions";
import * as groupActions from "../../StockGroups/actions";
import * as groupItemActions from "../../StockGroupItems/actions";
import styles from "./LegalPerson.module.scss";
import TrendLine from "../TrendLine/TrendLine";
import { GrList, GrNotes } from "react-icons/gr";
import Spinner from "../../../components/Spinner/Spinner";

class LegalPerson extends Component<any, any> {
  state = {
    pageTitle: "Stock List",
    deletingStock: {
      name: null
    },
    showGroupEditor: false,
    showGroupsModal: false,
    showNotesModal: false,
    stockGroupIds: Array<string>(),
    stock: {
      stockCode: "",
      name: "",
    },
    checkedStocks: Array<any>(),
    selectedGroupId: "",
    pageIndex: 1,
    pageSize: 50,
  };

  toggleTrendLine = () => {
    if (!this.props.showTrendLine) {
      let endDate = new Date();
      let startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 6);

      this.props.fetchStocksDays({
        stockCodes: this.props.stockFunders.items.map(x => x.stockCode),
        startDate: startDate,
        endDate: endDate,
      });
    }
    this.props.toggleTrendLine();
  };

  viewNotes = (stock) => {
    this.props.fetchStockNotes(stock);
    this.setState({ showNotesModal: true });
  };

  editGroups = (stock) => {
    this.setState({ showGroupsModal: true, stock: stock, });
    this.props.fetchStockGroupItems({ code: stock.stockCode });
  };

  addToGroup = () => {
    if (!this.state.selectedGroupId) {
      toast("Please select a group", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
        type: toast.TYPE.ERROR
      });
      return;
    } else if (!(this.state.checkedStocks?.length > 0)) {
      toast("Please select a stock", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
        type: toast.TYPE.ERROR
      });
      return;
    }
    this.props.addStockGroupStocks(this.state.selectedGroupId, this.state.checkedStocks);
  }

  componentDidMount() {
    if (!(this.props.stockGroups?.length > 0)) {
      this.props.fetchStockGroups();
    }
    console.log(this.props.stockFunders);
    if (!(this.props.stockFunders?.totalCount > 0)) {
      this.props.fetchStocks({});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stockGroupItems !== this.props.stockGroupItems) {
      var stockGroupIds = this.props.stockGroupItems.map(x => x.groupId);
      this.setState({ stockGroupIds: stockGroupIds });
    }
  }

  toggleStock = event => {
    var stockCodes = this.state.checkedStocks;
    if (event.target.checked) {
      stockCodes.push(event.target.value);
    } else {
      stockCodes.splice(stockCodes.indexOf(event.target.value), 1);
    }
    this.setState({ checkedStocks: stockCodes });
  }

  toggleAllStock = event => {
    var stockCodes = this.state.checkedStocks;
    if (event.target.checked) {
      stockCodes = this.props.stockFunders.items.map(x => x.stockCode);
    } else {
      stockCodes = [];
    }
    this.setState({ checkedStocks: stockCodes });
  }

  selectGroup = item => {
    this.setState({ selectedGroupId: item.id });
  }

  render() {
    const stockFunders = this.props.stockFunders;

    const rows = stockFunders?.items?.map((stock) => (
      <tr key={"L" + stock.stockCode}>
        <td>
          {this.props.showTrendLine && this.props.stockDayMaps && this.props.stockDayMaps[stock.stockCode] ? (
            <div>
              <TrendLine id={`tl-${stock.stockCode}`} data={this.props.stockDayMaps[stock.stockCode]}></TrendLine>
            </div>
          ) : null}
        </td>
        <td>
          <NavLink to={"/stocks/" + stock.stockCode}>({stock.stockCode}){stock.name}</NavLink>
        </td>
        <td className={styles.test}>{stock.closePrice || "--"}</td>
        <td>
          <div>C:{stock.creditBuy}/{stock.creditSell}/{stock.creditSum}</div>
          <div>F:{stock.foreignBuy}/{stock.foreignSell}/{stock.foreignSum}</div>
          <div>S:{stock.selfBuy}/{stock.selfSell}/{stock.selfSum}</div>
        </td>
        <td className={styles.number}>{stock.total}</td>
        <td>{stock.date}</td>
        <td>
          <GrNotes onClick={() => this.viewNotes(stock)} title="View Notes"></GrNotes>
          &nbsp;
          <GrList onClick={() => this.editGroups(stock)} title="Edit Groups"></GrList>
        </td>
        <td>
          <Form.Check
            type="checkbox"
            id={`stock-check-${stock.stockCode}`}
            checked={this.state.checkedStocks?.indexOf(stock.stockCode) > -1}
            value={stock.stockCode}
            onChange={this.toggleStock}
            title={stock.name}
          />
        </td>
      </tr>
    ));

    const listNoteModal = (
      <Modal size="xl" show={this.state.showNotesModal} onHide={() => this.setState({ showNotesModal: false })} >
        <ListNotes>
        </ListNotes>
      </Modal>
    );

    const stockGroupTags = this.props.stockGroups?.map((item) => (
      <div key={item.id} className={styles.groupTags}>
        <Button
          className="btn-default-size"
          variant="outline-dark"
          active={this.state.selectedGroupId === item.id}
          onClick={() => this.selectGroup(item)}>
          {item.groupTitle}
        </Button>
      </div>
    ));

    const table = this.props.stockFunders ? (
      <table className={`table ${styles.table}`}>
        <thead>
          <tr>
            <th>
              <button className="btn btn-primary" onClick={this.toggleTrendLine}>
                {this.props.showTrendLine ? "Hide" : "Show"} Trend
              </button>
            </th>
            <th>Stock</th>
            <th>Price</th>
            <th>Buy/Sell/Sum</th>
            <th className={styles.number}>Total</th>
            <th>Fetch Date</th>
            <th>Edit</th>
            <th>
              <Form.Check
                type="checkbox"
                id="select-all"
                checked={this.state.checkedStocks?.length === stockFunders?.items?.length}
                onChange={this.toggleAllStock}
              />
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <Menu />
          </div>
          <div className="card-body">
            <div className="row">
              {stockGroupTags}
              <Col lg={1} md={2} sm={3}>
                <Button className="btn-default-size" onClick={this.addToGroup}>
                  Add to Group
                </Button>
              </Col>
            </div>
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
        {listNoteModal}
        <GroupModal showGroupsModal={this.state.showGroupsModal} stock={{ name: this.state.stock.name, code: this.state.stock.stockCode }} hide={() => this.setState({ showGroupsModal: false })} />
        <Spinner loading={this.props.stockLoading || this.props.groupLoading || this.props.stockGroupItemLoading} fullscreen />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    stockGroups: state.stockGroup.stockGroups,
    stockFunders: state.stock.stockFunders,
    stockTotalCount: state.stock.totalCount,
    stockTotalPage: state.stock.totalPage,
    stockLoading: state.stock.loading,
    stockGroupItemLoading: state.stockGroupItem.loading,
    groupLoading: state.stockGroup.loading,
    stockDayMaps: state.stockDay.stockDayMaps,
    showTrendLine: state.stock.showTrendLine,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: (options) => dispatch(actions.fetchStockFunders(options)),
    fetchStockFunderScores: (options) => dispatch(actions.fetchStockFunderScores(options)),
    fetchStocksDays: (options) => dispatch(daysActions.fetchStocksDays(options)),
    fetchStockGroups: () => dispatch(groupActions.fetchStockGroups()),
    fetchStockGroupItems: (stock) => dispatch(groupItemActions.fetchStockGroupItems(stock)),
    fetchStockNotes: (stock) => dispatch(noteActions.fetchStockNotes(stock)),
    addStockGroupStocks: (groupId, stocks) => dispatch(groupItemActions.addStockGroupStocks(groupId, stocks)),
    toggleTrendLine: () => dispatch(actions.toggleTrendLine()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalPerson);
