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
