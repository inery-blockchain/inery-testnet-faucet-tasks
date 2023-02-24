"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Header() {
  return (
    <Navbar bg="warning" expand="lg">
      <Container>
        <Navbar.Brand>Inery Blockchain Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav ">
          <Nav className="header_navlink">
            <Nav.Link className="route_link" as="div">
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                href={"/"}
              >
                Create
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link
                style={{
                  color: "black",

                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                href={"/read-data"}
              >
                Read
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
