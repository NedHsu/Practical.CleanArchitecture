import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Menu from "../Menu/Menu";
import GroupModal from "../GroupModal/GroupModal";

import logo from "../../../logo.svg";
import * as actions from "../actions";
import styles from "./LegalPerson.module.scss";

class LegalPerson extends Component<any, any> {
  groupTitleField: any;
  constructor(props) {
    super(props);
    this.groupTitleField = React.createRef();
  }

  state = {
    pageTitle: "Stock List",
    showImage: false,
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

  toggleImage = () => {
    this.setState({ showImage: !this.state.showImage });
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
          {this.state.showImage ? (
            <img
              src={stock.imageUrl || logo}
              title={stock.name}
              style={{ width: "50px", margin: "2px" }}
            />
          ) : null}
        </td>
        <td>
          <NavLink to={"/stocks/" + stock.stockcode}>({stock.stockCode}){stock.name}</NavLink>
        </td>
        <td>{stock.industry}</td>
        <td className={styles.test}>{stock.closePrice || "--"}</td>
        <td>
          {stock.fivePrice}/{stock.tenPrice}/{stock.twentyPrice}/{stock.sixtyPrice}
        </td>
        <td>{stock.fetchDate}</td>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: (options) => dispatch(actions.fetchStockFunders(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalPerson);
