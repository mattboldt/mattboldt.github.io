---
layout: post
permalink: /:title/
title: Introduction to React-Rails Components
desc: "Refactoring a Rails form view into a React component"
date: 2017-12-04 23:00:00
categories: ruby, rails, reactjs, react
---

This post serves as a Rails / React primer for when you've got an existing rails application that you'd like to add React to. For this exercise I'm going to use a Rails form as an example of what can be done in a React component.

Now, Rails forms (especially when paired with `simple-form` and `cocoon`) are incredibly powerful, and typically don't need any JavaScript interference. In fact, the particular example I'm using would be ridiculous to write in the real world, and only a crazy person would use React for something so easy in Rails.

However, this example reveals something pretty damn powerful when pairing the two together. Often times complex UIs require you to manipulate Rails forms in very dirty ways, resulting in thousands of lines of JavaScript &mdash; I'll list some real-world examples towards below of how React can prevent this.

#### What I will be covering

 - Installing `react-rails` with the existing asset pipeline
 - Creating our first React component
 - Converting a Rails form into a React component


#### What I will _not_ be covering

 - Creating a single page app with React
 - Using Rails as an API for a React front end
 - AJAX requests
 - Managing state

-------

## Creating a Rails form

You can follow along with [my Rails app here.](https://github.com/mattboldt/react-rails-primer)

Let's assume you've already got a Rails app going. I'm on v5.1.4, but most Rails versions 4.x.x and up should work the same. First we're going to generate a scaffold to get our form going:

```
rails generate scaffold Post title:string content:text
```
After this we'll have our migration, model, controller, and views all set up. You know how scaffolds work... Here's the view I'm going to focus on:

```erb
<!-- app/views/posts/new.html.erb -->
<%= form_with(model: post, local: true) do |f| %>
  <%= f.label :title %>
  <%= f.text_field :title %>

  <%= f.label :content %>
  <%= f.text_area :content %>

  <%= f.submit %>
<% end %>
```

<img src="/assets/img/react-rails/rails-form.png" width="350" />

-------

## Installing [react-rails](https://github.com/reactjs/react-rails)

We're going to use `react-rails` with the asset pipeline, but there are other options such as `Webpacker` if you'd like a more custom install. With the asset pipeline, there's hardly any extra legwork required when compiling these components.

```ruby
# Gemfile
gem 'react-rails'
```
```
bundle && rails g react:install
```

`react-rails` sets up most everything for you automatically.

```
modified:
  Gemfile
  Gemfile.lock
  app/assets/javascripts/application.js
created:
  app/assets/javascripts/components.js
  app/assets/javascripts/components/
  app/assets/javascripts/server_rendering.js
  config/initializers/react_server_rendering.rb
```

-------

## Creating the React component

Your component will live in a `.jsx` file in the newly created `components` directory.

```jsx
// app/assets/javascripts/components/_post_form.jsx
class PostForm extends React.Component { }
```

To render this component, simply call `react_component` in your Rails view. Note that this is replacing the old form code.

```erb
<!-- app/views/posts/new.html.erb -->
<%= form_with(model: @post, local: true) do |form| %>
  <%= react_component 'PostForm', { post: @post } %>
<% end %>
```

Now let's populate our component with everything our Rails form had. Below is the whole file, but I'll explain each block after.

```jsx
// app/assets/javascripts/components/_post_form.jsx
class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.post.title,
      content: props.post.content
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }

  render() {
    return (
      <div>
        <label>Title</label>
        <input
          type="text"
          name="post[title]"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />

        <label>Content</label>
        <input
          type="text"
          name="post[content]"
          value={this.state.content}
          onChange={this.handleContentChange}
        />

        <input type="submit" value="Update Post" />
      </div>
    );
  }
}
```

### Initialization

#### Constructor

Every React component has a `constructor`, and every constructor must have `props` passed into it and `super(props)` called first. This props argument is the ruby hash passed when calling `<%= react_component 'PostForm', { post: @post } %>`. So `props.post` is our Rails post record.

#### State

A react component's state is the local object that gets updated from inside the component. Keeping with the "data down, actions up" philosophy, `props` will be sent down, and the component will send its `state` back up &mdash; we never want to edit `props` directly. As such, we build our empty state object with the `props` sent in from Rails.


[Read more about React state here](https://reactjs.org/docs/state-and-lifecycle.html)

#### Binding actions

When initializing a component, we need to bind our actions to `this` in the beginning so they have a reference to the current scope later.


[Read more about events here](https://reactjs.org/docs/handling-events.html)

```js
constructor(props) {
  super(props);
  this.state = {
    title: props.post.title,
    content: props.post.content
  };
  this.handleTitleChange = this.handleTitleChange.bind(this);
  this.handleContentChange = this.handleContentChange.bind(this);
}

handleTitleChange(e) {
  this.setState({ title: e.target.value });
}

handleContentChange(e) {
  this.setState({ content: e.target.value });
}
```

### Rendering the component

Last but not least, is the `render()` method. Here we return the Reactified HTML that shows up on our page.

```jsx
render() {
  return (
    <div></div>
  );
}
```

#### Form inputs

For our post params, we need a text field with a specific `name` attr. In our case, the `params` that rails expects in the controller looks like this:

```ruby
def post_params
  params.require(:post).permit(:title, :content)
end
```

```html
<label>Title</label>
<input
  type="text"
  name="post[title]"
  value={this.state.title}
  onChange={this.handleTitleChange}
/>
<input type="submit" value="Update Post" />
```

Here we have a text input who's initial `value` was passed down from the `props` to the `state`, which came from Rails. Each time we type in the input, `onChange` is called, and we update the component's local `state` object from the `handleTitleChange` action.

Afterwards, when we click the `submit` button, the original Rails form is posted to its resource url (something like `PUT /posts/1`). Inside that `POST` request, will be our form inputs `post[title]`, and `post[content]`.

-----

### Voila!

Our new form submits just as the old rails one did, but with about 5x the amount of code! _JavaScript is the future!_

Jokes aside, let's consider a few possibilities with our fancy React forms.

#### Dynamic [Material form chips](https://material.angularjs.org/latest/demo/chips)

Creating these inside a Rails form would be far from trivial, but with React, we could render a Chip component inline with the rest of the form. This could be a fantastic replacement for the usual checkboxes for `has_many` or HABTM relationships.

<img src="/assets/img/react-rails/material-chips.png" width="400" />

#### [Material modal forms](https://material.angularjs.org/latest/demo/dialog)

Rendering a modal for a particular record on an index page in Rails can also be difficult. You run the risk of having 100+ items on a page and a modal for each, and if you attempt to fix that, you end up requiring some complex JavaScript to ensure you're dealing with the correct records. In React, this becomes very simple.

<img src="/assets/img/react-rails/material-modal.png" width="400" />

#### Fancy Dropdown Inputs

HTML Select menus don't always serve as the best representation of your form values. Often times, UI elements such as GitHub's are far better for UX but wouldn't be as easy in Rails and JavaScript alone. And in GitHub's case, where labels and other inputs are saved before the form is even posted, a React component would help pave the way for sending AJAX requests prior to saving the record.

<img src="/assets/img/react-rails/fancy-dropdown.png" width="400" />

-----

### Fin

I'd like to keep this a living document, so if you've got more examples of rich UI inline with standard CRUD that can benefit from Rails &amp; React, send them my way! Thanks for reading.
