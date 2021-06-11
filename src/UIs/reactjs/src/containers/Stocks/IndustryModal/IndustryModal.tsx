

import React, { Component } from 'react'
import { Modal, Card, Form, Row, Button, Spinner, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as industryItemActions from "../actions";

type Props = {
    showIndustrysModal: boolean;
    hide: () => number;
    stock;
    stockIndustrys: any[];
    stockIndustryIds;
    saveStockIndustryItems: Function;
    stockIndustryItems;
}

export class IndustryModal extends Component<Props, any> {
    state = {
        stockIndustryIds: Array<string>(),
    };
    industryCheckChanged = (event) => {
        var stockIndustryIds = this.state.stockIndustryIds;
        if (event.target.checked) {
            stockIndustryIds.push(event.target.value);
        } else {
            stockIndustryIds.splice(stockIndustryIds.indexOf(event.target.value), 1);
        }
        this.setState({ stockIndustryIds: stockIndustryIds });
    }
    saveStockIndustrys = () => {
        this.props.saveStockIndustryItems(this.props.stock?.code, this.state.stockIndustryIds);
        this.props.hide();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.stockIndustryItems !== this.props.stockIndustryItems) {
            var stockIndustryIds = this.props.stockIndustryItems.map(x => x.industryId);
            this.setState({ stockIndustryIds: stockIndustryIds });
        }
    }
    render() {
        const IndustryOptions = this.props.stockIndustrys?.map((item) => (
            <Col key={`check-${item.id}`} md={4}>
                <Form.Check
                    custom
                    type="checkbox"
                    id={`industry-check-${item.id}`}
                    label={item.industryTitle}
                    checked={this.state.stockIndustryIds?.indexOf(item.id) > -1}
                    value={item.id}
                    onChange={this.industryCheckChanged}
                />
            </Col>
        ));
        return (
            <Modal show={this.props.showIndustrysModal} onHide={() => this.props.hide()}>
                <Card>
                    <Card.Header>
                        ({this.props.stock?.code}) {this.props.stock?.name}
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Row>
                                {IndustryOptions}
                            </Row>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="secondary" onClick={() => this.props.hide()}>
                            No
                        </Button>
                        &nbsp;
                        <Button onClick={this.saveStockIndustrys}>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Save
                        </Button>
                    </Card.Footer>
                </Card>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    stockIndustrys: state.stock.industrys,
})

const mapDispatchToProps = (dispatch) => {
    return {
        // saveStockIndustryItems: (stockCode, industryIds) => dispatch(industryItemActions.saveStockIndustryItems(stockCode, industryIds)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndustryModal)
