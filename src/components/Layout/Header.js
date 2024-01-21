import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import "../../App.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../redux/userSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase-config'
import { toast } from 'react-toastify'

const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)

  const handleOnLogout = (e)=>{
    signOut(auth).then(()=>{
      dispatch(createUser({}))
    }).catch(error=>toast.error(error.message))
  }
  return (
    <Navbar className='navBar' expand="md" >
      <Container>
        <Navbar.Brand href="/dashboard">The Best ToDO App Ever!!!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {userInfo?.uid &&   <div>Welcome Back {userInfo.displayName}</div>}
      
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!userInfo?.uid ? (
            <>
            <Link to="/" className='nav-link'>
              SignIn
              </Link>
              <Link to="/register" className='nav-link'>
                SignUp
                </Link>
                </>
                ) : (
                <Link to="" className='nav-link' onClick={handleOnLogout}>SignOut</Link>)}



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
