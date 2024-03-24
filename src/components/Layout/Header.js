import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import "../../App.css"
import { Link } from 'react-router-dom'

const Header = () => {
  

 
  return (
    <Navbar className='navBar' expand="md" >
      <Container>
        <Navbar.Brand href="/dashboard">The Best ToDO App Ever!!!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {<div>Welcome Back</div>}
      
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           
            <>
            <Link to="/" className='nav-link'>
              SignIn
              </Link>
              <Link to="/register" className='nav-link'>
                SignUp
                </Link>
                </>
                
                <Link to="" className='nav-link' >SignOut</Link>



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
