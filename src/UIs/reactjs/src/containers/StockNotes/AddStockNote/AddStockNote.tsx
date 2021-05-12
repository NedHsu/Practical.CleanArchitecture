import React, { Component, LegacyRef } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import * as stockActions from "../../Stocks/actions";
import { checkValidity } from "../../../shared/utility";
import { Button } from "react-bootstrap";
import AutoComplete from "../../../components/AutoComplete/AutoComplete";

type Props = {
  resetStockNote: any,
  match: any,
  fetchStockNote: any,
  fetchStockOptions: any,
  stockNote: any,
  saveStockNote: any,
  updateStockNote: any,
  saved: any,
  loading: boolean,
  back: any,
  stockNoteId: any,
  stock: any,
  stockOptions: any,
  optionsLoading: boolean,
}

const autoComplete = React.createRef<AutoComplete>();
class AddStockNote extends Component<Props, any> {
  state = {
    controls: {
      title: {
        validation: {
          maxLength: 50
        },
        error: {
          required: false,
          minLength: false
        },
        valid: false,
        touched: false
      },
      contents: {
        validation: {
          required: true,
          maxLength: 500
        },
        error: {
          required: false,
          maxLength: false
        },
        valid: false,
        touched: false
      }
    },
    valid: false,
    submitted: false,
    errorMessage: null
  };

  // static getDerivedStateFromProps(props, state) {
  //   if (!props.stockNote?.stockCode || props.stockNote?.stockCode !== props.stock.code) {
  //     console.log(props.stockNote, props.stock);
  //     var stockNote = Object.assign(props.stockNote, {
  //       stockCode: props.stock.code,
  //     });
  //     props.updateStockNote(stockNote);
  //   }
  //   return null;
  // }

  fieldChanged = event => {
    this.checkFieldValidity(event.target.name, event.target.value);

    this.setFieldValue({ [event.target.name]: event.target.value });
  };

  setFieldValue = (values) => {
    const stockNote = {
      ...this.props.stockNote,
      ...values,
    };
    this.props.updateStockNote(stockNote);
  }

  checkFieldValidity = (name, value) => {
    const control = this.state.controls[name];
    const rules = control.validation;
    const validationRs = checkValidity(value, rules);

    this.setState(preState => {
      return {
        controls: {
          ...preState.controls,
          [name]: {
            ...preState.controls[name],
            error: validationRs,
            valid: validationRs.isValid
          }
        }
      };
    });

    return validationRs.isValid;
  };

  loadStockData = (userInput) => {
    if (this.filterTimer !== undefined) {
      clearTimeout(this.filterTimer);
    }

    this.filterTimer = setTimeout(() => {
      this.props.fetchStockOptions({
        pageSize: 15,
        pageIndex: 1,
        keyword: userInput,
      });
    }, 500);
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ submitted: true });
    let isValid = true;
    for (let fieldName in this.state.controls) {
      isValid =
        this.checkFieldValidity(fieldName, this.props.stockNote[fieldName]) &&
        isValid;
    }

    if (isValid) {
      this.props.saveStockNote(this.props.stockNote);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      props: {
        stockNote
      }
    } = this;

    if (prevProps.stockNote?.stockCode != stockNote?.stockCode) {
      autoComplete.current?.setValue(stockNote?.stockCode ? { text: `(${stockNote?.stockCode})${stockNote?.stockName}`, value: stockNote?.stockCode } : { text: "", value: "" });
    }

    if (prevProps.loading && !prevProps.saved && !this.props.loading && this.props.saved) {
      this.props.back();
    }

    if (prevProps.optionsLoading && !this.props.optionsLoading) {
      autoComplete.current?.setItems(this.props.stockOptions.map(s => { return { text: `(${s.code})${s.name}`, value: s.code } }));
    }
  }

  filterTimer: NodeJS.Timeout | undefined;

  render() {
    const {
      props: {
        stockNote
      }
    } = this;

    const form = (
      <div className="card">
        <div className="card-header">{stockNote?.id ? "Edit StockNote" : "Add StockNote"}</div>
        <div className="card-body">
          {this.state.errorMessage ? (
            <div
              className="row alert alert-danger"
            >
              {this.state.errorMessage}
            </div>
          ) : null}
          <form onSubmit={this.onSubmit}>
            <div className="form-group row">
              <label htmlFor="stockCode" className="col-sm-2 col-form-label">
                Code
              </label>
              <div className="col-sm-10">
                <AutoComplete
                  suggestions={this.props.stockOptions}
                  loadData={this.loadStockData}
                  ref={autoComplete}
                  disabled={stockNote?.id}
                  className="form-control"
                  onValueChange={newValue => this.setFieldValue({ stockCode: newValue.value, stockName: newValue.text.substr(newValue.text.indexOf(")") + 1) })}
                ></AutoComplete>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10">
                <input
                  id="title"
                  name="title"
                  className={
                    "form-control " +
                    (this.state.submitted && !this.state.controls["title"].valid
                      ? "is-invalid"
                      : "")
                  }
                  value={stockNote?.title}
                  onChange={event => this.fieldChanged(event)}
                />
                <span className="invalid-feedback">
                  {this.state.controls["title"].error.required ? (
                    <span>Enter a title</span>
                  ) : null}
                  {this.state.controls["title"].error.minLength ? (
                    <span>The title must be longer than 3 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="contents" className="col-sm-2 col-form-label">
                Content
              </label>
              <div className="col-sm-10">
                <textarea
                  id="contents"
                  name="contents"
                  className={
                    "form-control " +
                    (this.state.submitted &&
                      !this.state.controls["contents"].valid
                      ? "is-invalid"
                      : "")
                  }
                  value={stockNote?.contents}
                  onChange={event => this.fieldChanged(event)}
                />
                <span className="invalid-feedback">
                  {this.state.controls["contents"].error.required ? (
                    <span>Enter content</span>
                  ) : null}
                  {this.state.controls["contents"].error.maxLength ? (
                    <span>The content must be less than 500 characters.</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="contents"
                className="col-sm-2 col-form-label"
              ></label>
              <div className="col-sm-10">
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <Button variant="outline-secondary" style={{ width: "80px" }} onClick={this.props.back}>
            <i className="fa fa-chevron-left"></i> Back
          </Button>
        </div>
      </div>
    );

    return form;
  }
}

const mapStateToProps = state => {
  return {
    stockNote: state.stockNote.stockNote,
    saved: state.stockNote.saved,
    loading: state.stockNote.loading,
    stock: state.stockNote.stock,
    stockOptions: state.stock.stockOptions,
    optionsLoading: state.stock.optionsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStockNote: id => dispatch(actions.fetchStockNote(id)),
    updateStockNote: stockNote => dispatch(actions.updateStockNote(stockNote)),
    resetStockNote: () => dispatch(actions.resetStockNote()),
    saveStockNote: stockNote => dispatch(actions.saveStockNote(stockNote)),
    fetchStockOptions: (options) => dispatch(stockActions.fetchStockOptions(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStockNote);
