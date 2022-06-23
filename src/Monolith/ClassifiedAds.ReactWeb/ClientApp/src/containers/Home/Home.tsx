import React from "react";
import "./Home.css";
import ListFunderScores from "../StockFunders/ListFunderScores/ListFunderScores";
import StockFetchDatees from "../Stocks/ListStockFetchDates/ListStockFetchDates";
import { Col, Row } from "react-bootstrap";

function Home() {
  const date = new Date();
  return (
    <div className="card">
      <div className="card-header">
        Welcome ClassifiedAds React version: {React.version}
      </div>
      <div className="card-body">
        <div className="container-fluid">
          <div className="text-center">
            <Row>
              <Col>
                <ListFunderScores />
              </Col>
              <Col>

              </Col>
              <Col>

              </Col>
            </Row>
          </div>
          <StockFetchDatees />
          <div className="text-center">
            <strong>react v{React.version}</strong>
          </div>
          <div className="text-center">{date.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
