import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Menu from "../Menu/Menu";
import GroupModal from "../GroupModal/GroupModal";

import * as actions from "../actions";
import * as daysActions from "../../StockDays/actions";
import * as groupActions from "../../StockGroups/actions";
import * as groupItemActions from "../../StockGroupItems/actions";
import styles from "./LegalPerson.module.scss";
import TrendLine from "../TrendLine/TrendLine";

class LegalPerson extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  state = {
    pageTitle: "Stock List",
    showTrendLine: false,
    deletingStock: {
      name: null
    },
    showGroupEditor: false,
    showGroupsModal: false,
    stockGroupIds: Array<string>(),
    stock: {
      stockCode: "",
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
        stockCodes: this.props.stockfunders.map(x => x.stockCode),
        startDate: startDate,
        endDate: endDate,
      });
    }
    this.setState({ showTrendLine: !this.state.showTrendLine });
  };

  viewNotes = (stock) => {
    this.props.fetchStockNotes(stock);
    this.setState({ showNotesModal: true });
  };

  editGroups = (stock) => {
    if (!(this.props.stockGroups?.length > 0)) {
      this.props.fetchStockGroups();
    }
    this.setState({ showGroupsModal: true, stock: stock, });
    this.props.fetchStockGroupItems({ code: stock.stockCode });
  };

  componentDidMount() {
    this.props.fetchStocks({});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stockGroupItems !== this.props.stockGroupItems) {
      var stockGroupIds = this.props.stockGroupItems.map(x => x.groupId);
      this.setState({ stockGroupIds: stockGroupIds });
    }
  }

  render() {
    const stockFunders = this.props.stockfunders;

    const rows = stockFunders?.map((stock) => (
      <tr key={"L" + stock.stockCode}>
        <td>
          {this.state.showTrendLine && this.props.stockDayMaps && this.props.stockDayMaps[stock.stockCode] ? (
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

    const table = this.props.stockfunders ? (
      <table className={`table ${styles.table}`}>
        <thead>
          <tr>
            <th>
              <button className="btn btn-primary" onClick={this.toggleTrendLine}>
                {this.state.showTrendLine ? "Hide" : "Show"} Trend
              </button>
            </th>
            <th>Stock</th>
            <th>Price</th>
            <th>Buy/Sell/Sum</th>
            <th className={styles.number}>Total</th>
            <th>Fetch Date</th>
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
            <Menu />
          </div>
          <div className="card-body">
            <div className="row">

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
        <GroupModal showGroupsModal={this.state.showGroupsModal} stock={{ name: this.state.stock.name, code: this.state.stock.stockCode }} hide={() => this.setState({ showGroupsModal: false })} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stockGroups: state.stockGroup.stockGroups,
    stockfunders: state.stock.stockfunders,
    stockTotalCount: state.stock.totalCount,
    stockTotalPage: state.stock.totalPage,
    stockLoading: state.stock.loading,
    stockDayMaps: state.stockDay.stockDayMaps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: (options) => dispatch(actions.fetchStockFunders(options)),
    fetchStocksDays: (options) => dispatch(daysActions.fetchStocksDays(options)),
    fetchStockGroups: () => dispatch(groupActions.fetchStockGroups()),
    fetchStockGroupItems: (stock) => dispatch(groupItemActions.fetchStockGroupItems(stock)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalPerson);
