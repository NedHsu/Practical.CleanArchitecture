import React, { Component, Ref } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button, FormControl, Table } from "react-bootstrap";
import Menu from "../../Stocks/Menu/Menu";
import styles from "./ListStockEPS.module.scss";
import { FaSort, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

import * as actions from "../actions";
import dayjs from "dayjs";
class ListStockEPS extends Component<any, any> {
  state = {
    pageTitle: "StockEPS List",
    showImage: false,
    showDeleteModal: false,
    showEditModal: false,
    deletingStockEPS: {
      name: null
    },
    editStockEPS: {
      code: "",
      name: "",
      year: null,
      eps: 0
    },
    listFilter: "",
    sort: "",
    sortDesc: false,
    year: dayjs().year() - 1911,
    growthRatio: 1.0,
  };
  table: Ref<HTMLTableElement> | undefined;

  constructor(props) {
    super(props);
    this.table = React.createRef();
  }

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  changeEditValues = event => {
    this.setState({
      editStockEPS: {
        ...this.state.editStockEPS,
        [event.target.name]: event.target.value
      }
    });
  }

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.stockEPSList.filter(
      (stockEPS) => (stockEPS.name + stockEPS.stockCode).toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  deleteStockEPS = (stockEPS) => {
    this.setState({ showDeleteModal: true, deletingStockEPS: stockEPS });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingStockEPS: null });
  };

  edit = (eps) => {
    this.setState({
      showEditModal: true,
      editStockEPS: {
        ...this.state.editStockEPS,
        ...eps
      }
    });
  };

  editCanceled = () => {
    this.setState({ showEditModal: false });
  };

  deleteConfirmed = () => {
    this.props.deleteStockEPS(this.state.deletingStockEPS);
    this.setState({ showDeleteModal: false, deletingStockEPS: null });
  };

  editConfirmed = () => {
    this.props.saveStockEPS(this.state.editStockEPS);
    this.setState({ showEditModal: false });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchStockEPSes({
      year: this.state.year,
      growthRatio: this.state.growthRatio
    });
    console.log(this.table);
  }

  render() {
    const {
      listFilter,
      sort,
      sortDesc,
    } = this.state;

    let filteredStockEPSes = listFilter
      ? this.performFilter(listFilter)
      : this.props.stockEPSList;
    const priceDiff = (num, den) => {
      return Math.round((num - den) / den * 10000) / 100;
    };
    const priceClass = (diff) => {
      return diff > 0 ? styles.posText : styles.negText;
    };

    if (sort) {
      filteredStockEPSes = filteredStockEPSes?.sort((a, b) => {
        const va = a[sort];
        const vb = b[sort];
        if (va < vb) {
          return sortDesc ? 1 : -1;
        }
        if (va > vb) {
          return sortDesc ? -1 : 1;
        }
        return 0;
      });
    }

    const rows = filteredStockEPSes?.map((stockEPS) => {
      let twentyDiff = priceDiff(stockEPS.twentyPrice, stockEPS.closePrice);
      let sixtyDiff = priceDiff(stockEPS.sixtyPrice, stockEPS.closePrice);
      return (
        <tr key={stockEPS.stockCode}>
          <td>
            <NavLink to={"/stocks/" + stockEPS.stockCode}>({stockEPS.stockCode}){stockEPS.name}</NavLink>
          </td>
          <td>{stockEPS.industry}</td>
          <td>{stockEPS.closePrice}</td>
          <td>
            <div>20: {stockEPS.twentyPrice} / <span className={priceClass(-twentyDiff)}>{Math.abs(twentyDiff)}</span></div>
            <div>60: {stockEPS.sixtyPrice} / <span className={priceClass(-sixtyDiff)}>{Math.abs(sixtyDiff)}</span></div>
          </td>
          <td>
            <div>{stockEPS.year}: <button className="btn btn-link" onClick={() => this.edit({ id: "1", code: stockEPS.stockCode, name: stockEPS.name, year: stockEPS.year, eps: stockEPS.eps })}>{stockEPS.eps}</button></div>
            <div>{stockEPS.p_Year}: <button className="btn btn-link" onClick={() => this.edit({ id: "1", code: stockEPS.stockCode, name: stockEPS.name, year: stockEPS.p_Year, eps: stockEPS.p_EPS })}>{stockEPS.p_EPS}</button></div>
          </td>
          <td>
            <div>{stockEPS.pe}</div>
            <div>{stockEPS.p_PE}</div>
          </td>
          <td>{stockEPS.dif_PE}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary btn-danger"
              onClick={() => this.deleteStockEPS(stockEPS)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    });

    const sortCol = (col: string) => {
      let sortIcon;
      if (sort === col) {
        const sortDescFn = () => { this.setState({ sortDesc: !sortDesc }); };
        sortIcon = sortDesc ?
          (<FaSortAlphaUp onClick={sortDescFn}></FaSortAlphaUp>) :
          (<FaSortAlphaDown onClick={sortDescFn}></FaSortAlphaDown>);
      } else {
        sortIcon = (<FaSort onClick={() => { this.setState({ sort: col, sortDesc: false }); }}></FaSort>)
      }
      return (
        <span className="order">
          {sortIcon}
        </span>
      )
    }

    const table = this.props.stockEPSList ? (
      <Table striped ref={this.table}>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Industry</th>
            <th>Price</th>
            <th>Average</th>
            <th>EPS {sortCol("eps")}</th>
            <th>PE {sortCol("pe")}</th>
            <th>
              Dif {sortCol("dif_PE")}
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    ) : null;

    const deleteModal = (
      <Modal show={this.state.showDeleteModal} onHide={this.deleteCanceled}>
        <Modal.Header closeButton>
          <Modal.Title>Delete StockEPS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingStockEPS?.name}</strong>
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

    const editModal = (
      <Modal show={this.state.showEditModal} onHide={this.editCanceled}>
        <Modal.Header closeButton>
          <Modal.Title>Edit StockEPS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ({this.state.editStockEPS.code}){this.state.editStockEPS.name}
          Year: <strong> {this.state.editStockEPS.year}</strong>
          <FormControl as="input" name="eps" value={this.state.editStockEPS.eps} onChange={this.changeEditValues} type="number" placeholder="Normal text" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.editCanceled}>
            No
          </Button>
          <Button variant="primary" onClick={this.editConfirmed}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <Menu />
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label style={{ marginRight: 10 }}>Filter by:</label>
                <input
                  type="text"
                  value={listFilter}
                  onChange={(event) => this.filterChanged(event)}
                />
              </div>
              <div className="col"></div>
              <NavLink
                className="btn btn-primary"
                style={{ float: "right", marginRight: "10px", width: "200px" }}
                to="/stockEPSList/add"
              >
                Add StockEPS
              </NavLink>
            </div>
            {listFilter ? (
              <div className="row">
                <div className="col-md-6">
                  <h4>Filtered by: {listFilter}</h4>
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
        {editModal}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stockEPSList: state.stockEPS.stockEPSList,
    auditLogs: state.stockEPS.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockEPSes: (options) => dispatch(actions.fetchStockEPSes(options)),
    deleteStockEPS: (stockEPS) => dispatch(actions.deleteStockEPS(stockEPS)),
    saveStockEPS: stockEPS => dispatch(actions.saveStockEPS(stockEPS)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockEPS);
