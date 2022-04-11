import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import Menu from "../Menu/Menu";
import GroupModal from "../GroupModal/GroupModal";
import IndustryModal from "../IndustryModal/IndustryModal";
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
    industry: "",
  };

  toggleTrendLine = () => {
    if (!this.state.showTrendLine && this.props.stockRevenuePaged?.items) {
      let endDate = new Date();
      let startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 6);

      this.props.fetchStocksDays({
        stockCodes: this.props.stockRevenuePaged.items.map(x => x.stockCode),
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
  changeField = (e) => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  query = () => {
    this.props.fetchStockPaged({
      industry: this.state.industry,
      pageSize: this.state.pageSize,
      pageIndex: this.state.pageIndex,
    });
  };
  componentDidMount() {
    if (!(this.props.stockIndustrys?.length > 0)) {
      this.props.fetchIndustrys();
    }
    this.query();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stockGroupItems !== this.props.stockGroupItems) {
      var stockGroupIds = this.props.stockGroupItems.map(x => x.groupId);
      this.setState({ stockGroupIds: stockGroupIds });
    }
  }

  render() {
    const {
      props: {
        stockDayMaps,
        stockIndustrys,
        stockRevenuePaged,
      },
      state: {
        showTrendLine,
        showNotesModal,
        showGroupsModal,
        pageIndex,
        pageSize,
      },
    } = this;

    const rows = stockRevenuePaged?.items?.map((stock) => (
      <tr key={"L" + stock.stockCode}>
        <td>
          {showTrendLine && stockDayMaps && stockDayMaps[stock.stockCode] ? (
            <div>
              <TrendLine id={`tl-${stock.stockCode}`} data={stockDayMaps[stock.stockCode]}></TrendLine>
            </div>
          ) : null}
        </td>
        <td>
          <NavLink to={"/stocks/" + stock.stockCode}>({stock.stockCode}){stock.name}</NavLink>
        </td>
        <td>{stock.industry}</td>
        <td className={styles.number}>{stock.closePrice || "--"}</td>
        <td className={styles.number}>{stock.month}</td>
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
      <Modal size="xl" show={showNotesModal} onHide={() => this.setState({ showNotesModal: false })} >
        <ListNotes>
        </ListNotes>
      </Modal>
    );

    const table = (
      <Table hover striped className={`${styles.table}`}>
        <thead>
          <tr>
            <th>

            </th>
            <th>Stock</th>
            <th>Industry</th>
            <th className={styles.number}>Price</th>
            <th>Month</th>
            <th className={styles.number}>MoM(%)</th>
            <th className={styles.number}>YoY(%)</th>
            <th className={styles.number}>Total YoY(%)</th>
            <th>Remarks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <Menu />
          </div>
          <div className="card-body">
            <Row className={styles.tableTools}>
              <Col md={2}>
                <button className="btn btn-primary" onClick={this.toggleTrendLine}>
                  {showTrendLine ? "Hide" : "Show"} Trend
                </button>
              </Col>
              <Col md={2}>
                <Form.Select
                  value={this.state.industry}
                  onChange={this.changeField}
                  name="industry">
                  <option value="">--</option>
                  {
                    stockIndustrys?.map((item, i) => {
                      return (
                        <option value={item} key={i}>{item}</option>
                      )
                    })
                  }
                </Form.Select>
              </Col>
              <Col md={1}>
                <Form.Group as={Row}>
                  <Form.Label column sm="5">
                    Page
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control type="number" min={1} max={stockRevenuePaged.totalPages} name="pageIndex" value={pageIndex} onChange={this.changeField} />
                  </Col>
                </Form.Group>
              </Col>
              <Col md={1}>
                <Form.Group as={Row}>
                  <Form.Label column sm="5">
                    Size
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control type="number" min={1} max={1000} name="pageSize" value={pageSize} onChange={this.changeField} />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Button onClick={this.query}>Query</Button>
              </Col>
            </Row>
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
        <GroupModal showGroupsModal={showGroupsModal} stock={{ name: this.state.stock.name, code: this.state.stock.stockCode }} hide={() => this.setState({ showGroupsModal: false })} />
        <IndustryModal saveStockIndustryItems={() => { }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stockGroups: state.stockGroup.stockGroups,
    stockRevenuePaged: state.stock.stockRevenuePaged,
    stockIndustrys: state.stock.industrys,
    stockTotalCount: state.stock.totalCount,
    stockTotalPage: state.stock.totalPage,
    stockLoading: state.stock.loading,
    stockDayMaps: state.stockDay.stockDayMaps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockPaged: (options) => dispatch(actions.fetchStockRevenuePaged(options)),
    fetchIndustrys: () => dispatch(actions.fetchIndustrys()),
    fetchStocksDays: (options) => dispatch(daysActions.fetchStocksDays(options)),
    fetchStockGroups: () => dispatch(groupActions.fetchStockGroups()),
    fetchStockGroupItems: (stock) => dispatch(groupItemActions.fetchStockGroupItems(stock)),
    fetchStockNotes: (stock) => dispatch(noteActions.fetchStockNotes(stock)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
