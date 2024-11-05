import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Nav, Offcanvas } from 'react-bootstrap';
import { IoLogOut } from 'react-icons/io5';
import Navbar from 'react-bootstrap/Navbar';
import {
  BsChatTextFill,
  BsCollectionFill,
  BsFillBookFill,
  BsFillHousesFill,
} from 'react-icons/bs';

import CustomHeader from '../header/CustomHeader';
import CustomIconButton from '../button/CustomIconButton';
import logoIcon from '../../assets/images/books.png';
import { Colors, Constants } from '../../config';

import './CustomNavbar.css';

const CustomNavbar = () => {
  const { logout } = useAuth0();

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary mb-5 custom-navbar sticky-top d-flex align-items-center"
    >
      <Container fluid className="d-flex justify-content-between">
        <Navbar.Brand className="d-flex align-items-center" href="/">
          <CustomIconButton
            src={logoIcon}
            size="lg"
            bgColor={Colors.wineRed}
            color={Colors.forestGreen}
          />
          <div className="mx-3">
            <CustomHeader
              size="lg"
              text={Constants.name}
              color={Colors.ivory}
            />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <CustomHeader
                size="lg"
                text={Constants.name}
                color={Colors.brunswickGreen}
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="align-items-center">
              <Nav.Link
                style={{ color: Colors.cream }}
                className="navbar-link"
                href="/"
              >
                <BsFillHousesFill
                  color={Colors.cream}
                  className="navbar-icon"
                  fontSize={30}
                />
                <span>Home</span>
              </Nav.Link>
              <Nav.Link
                style={{ color: Colors.cream }}
                className="navbar-link"
                href="/discover"
              >
                <BsFillBookFill className="navbar-icon" fontSize={30} />
                Discover
              </Nav.Link>
              <Nav.Link
                style={{ color: Colors.cream }}
                className="navbar-link"
                href="/mybookcase"
              >
                <BsCollectionFill className="navbar-icon" fontSize={30} />
                My Bookcase
              </Nav.Link>
              <Nav.Link
                style={{ color: Colors.cream }}
                className="navbar-link"
                href="/discussions"
              >
                <BsChatTextFill className="navbar-icon" fontSize={30} />
                My Discussions
              </Nav.Link>
              <Nav.Link
                style={{ color: Colors.cream }}
                className="navbar-link"
                href="/discussions"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                <IoLogOut className="navbar-icon" fontSize={30} />
                Logout
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
