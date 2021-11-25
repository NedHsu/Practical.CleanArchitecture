import React from "react";
import "./Home.css";
import ListFunderScores from "../StockFunders/ListFunderScores/ListFunderScores"
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

          <div className="text-center">Developed by:</div>
          <div className="text-center">
            <h3>Phong Nguyen</h3>
          </div>

          <div className="text-center">@phongnguyend</div>
          <div className="text-center">
            <a href="https://github.com/phongnguyend/Practical.CleanArchitecture">
              Practical.CleanArchitecture
            </a>
          </div>
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
