import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../../logo.svg";
import ValueChart from "../../Stocks/ValueChart/ValueChart";
import * as actions from "../actions";
import * as profitActions from "../../StockProfits/actions";
import * as revenueActions from "../../StockRevenues/actions";
import * as stockMarginActions from "../../StockMargins/actions";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";

class ViewStock extends Component<any, any> {
  state = {
    stock: {
      name: "",
      code: "",
      description: ""
    },
    submitted: false,
    errorMessage: null
  };

  componentDidMount() {
    const code = this.props.match.params.id;
    this.props.fetchStockExtra(code);
    this.props.fetchStockProfits(code);
    this.props.fetchStockRevenues(code);
    const endDate = dayjs();
    const startDate = endDate.add(-30, "days");
    this.props.fetchStockMarginFunders({ stockCode: code, startDate: startDate.format("YYYY-MM-DD"), endDate: endDate.format("YYYY-MM-DD") })
  }

  back = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      props: {
        stock,
        stockProfits,
        stockRevenues,
        stockMarginLoading,
        stockMarginFunders,
      }
    } = this;

    const profitTable = stockProfits?.length > 0 ? (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>年/季</th>
            <th className="td-number">營收(百萬元)</th>
            <th className="td-number">毛利率(%)</th>
            <th className="td-number">營業利益率(%)</th>
            <th className="td-number">稅前純益率(%)</th>
            <th className="td-number">稅後純益率(%)</th>
          </tr>
        </thead>
        <tbody>
          {stockProfits.map(x => (
            <tr key={`pf-${x.date}`}>
              <td>{x.date}</td>
              <td className="td-number">{x.revenue}</td>
              <td className="td-number">{x.gross}</td>
              <td className="td-number">{x.operatingProfit}</td>
              <td className="td-number">{x.untaxedNetProfit}</td>
              <td className="td-number">{x.netProfit}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : null;

    const revenueTable = stockRevenues?.length > 0 ? (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>年/月</th>
            <th className="td-number">當月營收(千元)</th>
            <th className="td-number">上月營收(千元)</th>
            <th className="td-number">去年當月營收(千元)</th>
            <th className="td-number">上月比較增減(%)</th>
            <th className="td-number">去年同月增減(%)</th>
            <th className="td-number">當月累計營收</th>
            <th className="td-number">去年累計營收</th>
            <th className="td-number">前期比較增減(%)</th>
            <th>備註</th>
          </tr>
        </thead>
        <tbody>
          {stockRevenues.map(x => (
            <tr key={`rv-${x.month}`}>
              <td>{x.month}</td>
              <td className="td-number">{x.currentMonth}</td>
              <td className="td-number">{x.preMonth}</td>
              <td className="td-number">{x.preYearMonth}</td>
              <td className="td-number">{x.moM}</td>
              <td className="td-number">{x.yoY}</td>
              <td className="td-number">{x.yearTotal}</td>
              <td className="td-number">{x.preYearTotal}</td>
              <td className="td-number">{x.totalYoY}</td>
              <td>{x.remarks}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : null;

    const page = stock ? (
      <div className="card">
        <div className="card-header">
          {"Stock Detail: " + stock.name}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-2">({stock.code}){stock.name}</div>
                <div className="col-md-2">{stock.industry}</div>
              </div>
              <div className="row">
                <div className="col-md-2">Year:</div>
                <div className="col-md-2">{stock.p_Year}</div>
                <div className="col-md-2">{stock.year}</div>
              </div>
              <div className="row">
                <div className="col-md-2">EPS:</div>
                <div className="col-md-2">{stock.p_EPS}</div>
                <div className="col-md-2">{stock.eps}</div>
              </div>
              <div className="row">
                <div className="col-md-2">PE:</div>
                <div className="col-md-2">{stock.p_PE || '-'}</div>
                <div className="col-md-2">{stock.pe || '-'}</div>
              </div>
              <div className="row">
                <div className="col-md-2">Price:</div>
                <div className="col-md-2">
                  {stock.closePrice}
                </div>
                <div className="col-md-2">
                  <div>5: {stock.fivePrice}</div>
                  <div>20: {stock.twentyPrice}</div>
                  <div>60: {stock.sixtyPrice}</div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <img
                alt=""
                className="center-block img-responsive"
                style={{ width: "200px", margin: "2px" }}
                src={stock.imageUrl || logo}
                title={stock.name}
              />
            </div>
          </div>
          {profitTable}
          {revenueTable}
          <div>
            {
              stockMarginLoading || stockMarginFunders.date.length === 0 ? null : (
                <ValueChart id="value-chart" data={{
                  k: stockMarginFunders.date,
                  n: 5,
                  yz: [stockMarginFunders.foreignSum, stockMarginFunders.creditSum, stockMarginFunders.selfSum, stockMarginFunders.securitiesBalance, stockMarginFunders.financingBalance],
                  groups: ["外資", "投信", "自營"]
                }} unit={1000} />
              )
            }
          </div>
        </div>

        <div className="card-footer">
          <button
            className="btn btn-outline-secondary"
            onClick={this.back}
            style={{ width: "80px" }}
          >
            <i className="fa fa-chevron-left"></i> Back
          </button>
          &nbsp;
          <NavLink
            className="btn btn-primary"
            to={"/stocks/edit/" + stock.code}
          >
            Edit
          </NavLink>
        </div>
      </div>
    ) : null;
    return page;
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock.stock,
    stockProfits: state.stockProfit.stockProfits,
    stockRevenues: state.stockRevenue.stockRevenues,
    stockDayMaps: state.stockDay.stockDayMaps,
    stockMarginFunders: state.stockMargin.stockMarginFunders,
    stockMarginLoading: state.stockMargin.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStock: code => dispatch(actions.fetchStock(code)),
    fetchStockExtra: code => dispatch(actions.fetchStockExtra(code)),
    fetchStockProfits: code => dispatch(profitActions.fetchStockProfits({ stockCode: code })),
    fetchStockRevenues: code => dispatch(revenueActions.fetchStockRevenues({ stockCode: code })),
    fetchStockMarginFunders: (options) => dispatch(stockMarginActions.fetchStockMarginFunders(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStock);
