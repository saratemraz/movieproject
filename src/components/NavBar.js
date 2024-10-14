import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import logo from '../images/logo.png'
const NavBar = ({ search }) => {

  const onSearch = (word) => {
    search(word)
  }
  return (
    <div className="nav-style w-100">
      <Container>
        <Row className="pt-2 ">
          <Col xs="3" lg="3">
            <a href="/movieproject">
              <img className="logo p-10" src={logo} alt="logo" />
            </a>
          </Col>
          <Col xs="8" lg="8" className=" d-flex align-items-center">
          <div className="search w-100">
  <i className="fa fa-search"></i>
  <input 
    onChange={(e) => onSearch(e.target.value)} 
    type="text" 
    className="form-control" 
    placeholder="ابحث" 
  />
</div>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBar;
