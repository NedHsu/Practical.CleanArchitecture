

import React, { Component } from 'react'
import { Modal, Card, Form, Row, Button, Spinner, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as groupItemActions from "../../StockGroupItems/actions";

type Props = {
    showGroupsModal: boolean;
    hide: () => number;
    stock;
    stockGroups: any[];
    stockGroupIds;
    stockGroupItemLoading;
    saveStockGroupItems;
    stockGroupItems;
}

export class GroupModal extends Component<Props, any> {
    state = {
        stockGroupIds: Array<string>(),
    };
    groupCheckChanged = (event) => {
        var stockGroupIds = this.state.stockGroupIds;
        if (event.target.checked) {
            stockGroupIds.push(event.target.value);
        } else {
            stockGroupIds.splice(stockGroupIds.indexOf(event.target.value), 1);
        }
        this.setState({ stockGroupIds: stockGroupIds });
    }
    saveStockGroups = () => {
        this.props.saveStockGroupItems(this.props.stock?.code, this.state.stockGroupIds);
        this.props.hide();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.stockGroupItems !== this.props.stockGroupItems) {
            var stockGroupIds = this.props.stockGroupItems.map(x => x.groupId);
            this.setState({ stockGroupIds: stockGroupIds });
        }
    }
    render() {
        const GroupOptions = this.props.stockGroups?.map((item) => (
            <Col key={`check-${item.id}`} md={4}>
                <Form.Check
                    custom
                    type="checkbox"
                    id={`group-check-${item.id}`}
                    label={item.groupTitle}
                    checked={this.state.stockGroupIds?.indexOf(item.id) > -1}
                    value={item.id}
                    onChange={this.groupCheckChanged}
                />
            </Col>
        ));
        return (
            <Modal show={this.props.showGroupsModal} onHide={() => this.props.hide()}>
                <Card>
                    <Card.Header>
                        ({this.props.stock?.code}) {this.props.stock?.name}
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Row>
                                {GroupOptions}
                            </Row>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="secondary" onClick={() => this.props.hide()}>
                            No
                        </Button>
                        &nbsp;
                        <Button onClick={this.saveStockGroups} disabled={this.props.stockGroupItemLoading}>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                hidden={!this.props.stockGroupItemLoading}
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
    stockGroups: state.stockGroup.stockGroups,
    stockGroup: state.stockGroup.stockGroup,
    stockGroupItemLoading: state.stockGroupItem.loading,
    stockGroupItems: state.stockGroupItem.stockGroupItems,
})

const mapDispatchToProps = (dispatch) => {
    return {
        saveStockGroupItems: (stockCode, groupIds) => dispatch(groupItemActions.saveStockGroupItems(stockCode, groupIds)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupModal)
