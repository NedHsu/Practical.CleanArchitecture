import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import Menu from "../Menu/Menu";
import GroupModal from "../GroupModal/GroupModal";
import ListNotes from "../../StockNotes/ListStockNotes/ListStockNotes";

import * as actions from "../actions";
import * as daysActions from "../../StockDays/actions";
import * as noteActions from "../../StockNotes/actions";
import * as groupActions from "../../StockGroups/actions";
import * as groupItemActions from "../../StockGroupItems/actions";
import styles from "./Revenue.module.scss";
import TrendLine from "../TrendLine/TrendLine";
import { GrNotes, GrList } from "react-icons/gr";

class Revenue extends Component<any, any> {
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
    showNotesModal: false,
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
        stockCodes: this.props.stockRevenues.map(x => x.stockCode),
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
    const stockRevenues = this.props.stockRevenues;

    const rows = stockRevenues?.map((stock) => (
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
        <td>{stock.industry}</td>
        <td className={styles.number}>{stock.closePrice || "--"}</td>
        <td className={styles.number}>{stock.moM}</td>
        <td className={styles.number}>{stock.yoY}</td>
        <td className={styles.number}>{stock.totalYoY}</td>
        <td>{stock.remarks}</td>
        <td>
          <GrNotes onClick={() => this.viewNotes(stock)} title="View Notes"></GrNotes>
          &nbsp;
          <GrList onClick={() => this.editGroups(stock)} title="Edit Groups"></GrList>
        </td>
      </tr>
    ));

    const listNoteModal = (
      <Modal size="xl" show={this.state.showNotesModal} onHide={() => this.setState({ showNotesModal: false })} >
        <ListNotes>
        </ListNotes>
      </Modal>
    );

    const table = this.props.stockRevenues ? (
      <table className={`table ${styles.table}`}>
        <thead>
          <tr>
            <th>

            </th>
            <th>Stock</th>
            <th>Industry</th>
            <th className={styles.number}>Price</th>
            <th className={styles.number}>MoM(%)</th>
            <th className={styles.number}>YoY(%)</th>
            <th className={styles.number}>Total YoY(%)</th>
            <th>Remarks</th>
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
              <div className={styles.tableTools}>
                <button className="btn btn-primary" onClick={this.toggleTrendLine}>
                  {this.state.showTrendLine ? "Hide" : "Show"} Trend
                </button>
              </div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stockGroups: state.stockGroup.stockGroups,
    stockRevenues: state.stock.stockRevenues,
    stockTotalCount: state.stock.totalCount,
    stockTotalPage: state.stock.totalPage,
    stockLoading: state.stock.loading,
    stockDayMaps: state.stockDay.stockDayMaps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: (options) => dispatch(actions.fetchStockRevenues(options)),
    fetchStocksDays: (options) => dispatch(daysActions.fetchStocksDays(options)),
    fetchStockGroups: () => dispatch(groupActions.fetchStockGroups()),
    fetchStockGroupItems: (stock) => dispatch(groupItemActions.fetchStockGroupItems(stock)),
    fetchStockNotes: (stock) => dispatch(noteActions.fetchStockNotes(stock)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
