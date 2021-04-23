import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Menu from "../Menu/Menu";
import GroupModal from "../GroupModal/GroupModal";

import * as actions from "../actions";
import * as daysActions from "../../StockDays/actions";
import styles from "./LegalPerson.module.scss";
import TrendLine from "../TrendLine/TrendLine";

class LegalPerson extends Component<any, any> {
  groupTitleField: any;
  constructor(props) {
    super(props);
    this.groupTitleField = React.createRef();
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
        stockCodes: this.props.stockfunders.map(x => x.stockCode),
        startDate: startDate,
        endDate: endDate,
      });
    }
    this.setState({ showTrendLine: !this.state.showTrendLine });
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

  onRatingClicked = (event) => {
    const pageTitle = "Stock List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  viewNotes = (stock) => {
    this.props.fetchStockNotes(stock);
    this.setState({ showNotesModal: true });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  showStockGroupEditor(stockGroup) {
    this.props.updateStockGroup({ ...this.props.stockGroup, ...stockGroup });
    this.groupTitleField.current.focus();
    this.setState({ showGroupEditor: true });
  }

  closeStockGroupEditor() {
    this.setState({ showGroupEditor: false });
  }

  editGroups = (stock) => {
    this.setState({ showGroupsModal: true, stock: stock, });
    this.props.fetchStockGroupItems(stock);
  };

  saveStockGroups() {
    this.props.saveStockGroupItems(this.state.stock.code, this.state.stockGroupIds);
    this.setState({ showGroupsModal: false, });
  }

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
          <NavLink to={"/stocks/" + stock.stockcode}>({stock.stockCode}){stock.name}</NavLink>
        </td>
        <td className={styles.test}>{stock.closePrice || "--"}</td>
        <td>
          <div>C:{stock.creditBuy}/{stock.creditSell}/{stock.creditSum}</div>
          <div>F:{stock.foreignBuy}/{stock.foreignSelfSell}/{stock.foreignSum}</div>
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
        <GroupModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalPerson);
