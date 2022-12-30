### Create react app:

- $ rails new `<app-name>` -d postgresql -T
- $ cd `<app-name>`
- $ rails db:create
- $ rails s
- $ git remote add origin `<url-from-gitHub>`
- $ gst
- $ ga .
- $ gcmsg "first commit"
- $ git branch -m main
- $ git push -u origin main
- $ code .

### Add dependencies to support react components:

- $ bundle add webpacker
- $ bundle add react-rails
- $ rails webpacker:install
- $ rails webpacker:install:react
- $ yarn add @babel/preset-react
- $ yarn add @rails/activestorage
- $ yarn add @rails/ujs

## Generate the appropriate files and folders

- $ rails generate react:install
- $ rails generate react:component App
```javascript
  //boiler plate for basic functional component
  import React from "react"

  const App = () => {
    return (
      <>
        <h1>Hello World!</h1>
      </>
    )
  }

  export default App 
```

## Rails controller and view

- $ rails generate controller Home index
- Render the component in the browser through the Rails view
```ruby
  # app/views/home/index.html.erb
  <%= react_component 'App' %>
```
- Allow webpacker to compile JavaScript
```ruby
  # app/views/layouts/application.html.erb
  # Find this line:
  <%= javascript_importmap_tags %>
```
```ruby
  # And replace it with this:
  <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
```
- Route to the index file for the view
```ruby
  # config/routes.rb
  Rails.application.routes.draw do
    # Direct all HTML requests to React app
    get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }
    root 'home#index'
  end
```

## Add Reactstrap to the application

- $ bundle add bootstrap
- $ mv app/assets/stylesheets/application.css app/assets/stylesheets/application.scss
- $ yarn add reactstrap
- Add the following code to app/assets/stylesheets/application.scss
  - @import "bootstrap";

## Add Devise to the application

- $ bundle add devise
- $ rails generate devise:install
- $ rails generate devise User
- $ rails db:migrate

- Devise will handle the forms for the user sign up and sign in, the rest of the views will come from React. Pass information from Rails and Devise into the React App.js component
```ruby
  # app/views/home/index.html.erb
  <%= react_component 'App', {
    logged_in: user_signed_in?,
    current_user: current_user,
    new_user_route: new_user_registration_path,
    sign_in_route: new_user_session_path,
    sign_out_route: destroy_user_session_path
  } %>
```
```javascript
  // app/javascript/components/App.js
  // Access the object through props
  const App = ({
    logged_in,
    current_user,
    new_user_route,
    sign_in_route,
    sign_out_route
  }) => {
    // Use logs to see the data
    console.log("logged_in:", logged_in)
    console.log("current_user:", current_user)
    console.log("new_user_route:", new_user_route)
    console.log("sign_in_route:", sign_in_route)
    console.log("sign_out_route:", sign_out_route)
    return (
```
- Set up the default url options for the Devise mailer in our development environment 
```ruby
  # config/environments/development.rb
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```
- Instruct Devise to listen for logout requests via a get request instead of the default delete
```ruby
  # config/initializers/devise.rb
  # Find this line:
  config.sign_out_via = :delete
  # And replace it with this:
  config.sign_out_via = :get
```

### React Components
- Create three directories in your React application `app/javascript/components`: assets(image files), components(helper components), and pages(control the views sent to UI)

- App.js handles "big picture" logic. Basic navigation will be placed in a Header component. The navigation can include internal links to other React components as well as the routes to the Devise forms. 
```javascript
  // Use the spread operator to pass all the Devise data coming into App.js on to Header component call.
  import Header from "./components/Header"

  const App = (props) {
    return (
      <>
        <h1>Devise a Different View Point</h1>
        <Header {...props} />
```
- Reference the routes by destructing them out of props.
```javascript 
  // app/javascript/components/components/Header.js
  import React from "react"
  // use reactstrap for styling
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
    // create conditional rendering to show the appropriate navigation links to Devise depending on whether the user is logged in or not
    return (
      <Nav>
        {
          !logged_in ? 
            <NavItem>
              <a href={sign_in_route}>
                Sign In
              </a>
            </NavItem> :
            <NavItem>
              <a href={sign_out_route}>
                Sign Out
              </a>
            </NavItem>
        }
      </Nav>
    )
  }

  export default Header
```

## Flash messages in app/views/layouts/application.html.erb.
```ruby
  <p class="notice"><%= notice %></p>
  <p class="alert"><%= alert %></p>
```

