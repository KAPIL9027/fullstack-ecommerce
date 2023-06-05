import React from 'react'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
const Header = () => {
  const  {cartItems} = useSelector((state)=> state.cart)
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
            <LinkContainer to="/signin">
            <Nav.Link href="/login">
              <i className="fas fa-user"></i>{" "}Sign in</Nav.Link>
            </LinkContainer>
            
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
