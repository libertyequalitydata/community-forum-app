import React from 'react';
import {
  Button, Nav, NavLink

} from 'reactstrap';

const Navbar=() => {
      const buttonString = () => {
        if (localStorage.getItem('userID') == null){
          return "Log In"
        } else {
          return "Log Out"
        }
        
      }

      function accountName() {
        if (localStorage.getItem('userName')!=null){
          return localStorage.getItem('userName')
        } else {
          return "Guest"
        }
      }
      

      
      return (
        <div>
            <p>Test Nav Bar</p>
            <p>Currently Signed in as {accountName()}</p>
            <Nav className='ml-auto' navbar >
                <NavLink className='text-white' href='/login'>
                  {buttonString()}
                </NavLink>
            </Nav>
        </div>
      );
  }

  export default Navbar;