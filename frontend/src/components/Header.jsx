import React from 'react'
import { Badge, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/userApiSlice'
import {logout} from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const  {cartItems} = useSelector((state)=> state.cart)
  const {userInfo} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async ()=>{
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/signin');
    }
    catch(e){
      console.log(e);
    }
  }

  console.log(cartItems);
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md"
        collapseOnSelect>
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand>
            ecommerce
          </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav' className="justify-content-end">
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
            <Nav.Link>
              <i className="fas fa-shopping-cart"></i>{" "}Cart
              <Badge pill bg='success' style={{marginLeft: '5px'}}>
                {cartItems.reduce((a,c)=> a + c.qty, 0)}
              </Badge>
              </Nav.Link>
            </LinkContainer>
            {
              userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ):
              (
            <LinkContainer to="/signin">
            <Nav.Link href="/login">
              <i className="fas fa-user"></i>{" "}Sign in
              </Nav.Link>
            </LinkContainer>
            )
            }
            
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
