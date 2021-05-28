import React, { Component } from "react";
import { connect } from "react-redux";

import ValueChart from "../../Stocks/ValueChart/ValueChart";
import * as stockMarginActions from "../../StockMargins/actions";

const d3 = require("d3")

class ListD3s extends Component<any, any> {
  state = {
  };

  componentDidMount() {
    this.props.fetchStockMarginFunders({ stockCode: "2330", startDate: "2021-05-01", endDate: "2021-05-24" });
  }

  render() {
    const {
      state: {
      },
      props: {
        stockMarginFunders,
        stockMarginLoading,
      }
    } = this;
    return (
      <div>
        {
          stockMarginLoading || stockMarginFunders.date.length == 0 ? null : (
            <ValueChart id="value-chart" data={{
              k: stockMarginFunders.date,
              n: 5,
              yz: [stockMarginFunders.foreignSum, stockMarginFunders.creditSum, stockMarginFunders.selfSum, stockMarginFunders.securitiesBalance, stockMarginFunders.financingBalance]
            }} />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stockMarginFunders: state.stockMargin.stockMarginFunders,
    stockMarginLoading: state.stockMargin.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockMarginFunders: (options) => dispatch(stockMarginActions.fetchStockMarginFunders(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListD3s);
