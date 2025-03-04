import { useAuth0 } from '@auth0/auth0-react';
import { Container, Nav, Offcanvas } from 'react-bootstrap';
import { IoLogOut } from 'react-icons/io5';
import Navbar from 'react-bootstrap/Navbar';
import {
  BsChatTextFill,
  BsCollectionFill,
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
      className="bg-bg-body-secondary mb-5 custom-navbar sticky-top d-flex align-items-center"
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
              isPacifico={true}
            />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Offcanvas
          style={{ backgroundColor: Colors.paynesGray }}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <CustomHeader
                size="lg"
                text={Constants.name}
                color={Colors.ivory}
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
                href="/"
                onClick={() => logout({ logoutParams: { returnTo: '/' } })}
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
