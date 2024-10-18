import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import logo from "../images/logo.png";
const NavBar = ({ search }) => {
  const onSearch = (word) => {
    search(word);
  };
  return (
    <div className="nav-style w-100">
      <Container>
        <div className="d-flex justify-content-center align-items-center">
          <a href="/movieproject">
            <img className="logo p-10" src={logo} alt="logo" />
          </a>

          <div className="search">
            <input
              onChange={(e) => onSearch(e.target.value)}
              type="text"
              className="form-control"
              placeholder="ابحث"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
