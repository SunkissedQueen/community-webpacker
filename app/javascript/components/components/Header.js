import React from "react"
import { Nav, NavItem } from "reactstrap"

const Header = ({
  logged_in,
  current_user,
  new_user_route,
  sign_in_route,
  sign_out_route
}) => {
  console.log("logged_in:", logged_in)
  console.log("current_user:", current_user)
  console.log("new_user_route:", new_user_route)
  console.log("sign_in_route:", sign_in_route)
  console.log("sign_out_route:", sign_out_route)
  return (
    <div className="header">
      <nav class="nav">
        <a class="nav-link" href={sign_in_route}>Devise a Different Point of View</a>
        {
          !logged_in ? 
          <a class="nav-link" href={sign_in_route}>Sign In</a> :
          <a class="nav-link" href={sign_out_route}>Sign Out</a>
        }
      </nav>
    </div>
  )
}

export default Header