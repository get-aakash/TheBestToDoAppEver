import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import "../../App.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-config/firebaseConfig'
import { setUser } from '../../redux/userSlice'
import { toast } from 'react-toastify'

const Header = () => {
  const { userInfo } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(setUser({}))
    }).catch(error => toast.error(error.message))
  }

  return (
    <Navbar className='navBar' expand="md" >
      <Container>
        <Navbar.Brand href="/dashboard">The Best ToDO App Ever!!!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {userInfo?.uid && <div>Welcome Back {userInfo?.displayName}</div>}

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
            ) : (<Link to="/" className='nav-link' onClick={handleLogOut}>SignOut</Link>)}






          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
