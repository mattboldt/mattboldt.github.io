---
layout: post
title: Rails, React, & GraphQL (Part 2)
desc: "Building a React & Apollo Frontend With a Graphql Rails API Backend"
date: 2019-06-23 21:00:00
categories: rails, graphql, react, apollo, react-apollo
---

![rails and graphql](/assets/img/rails-and-graphql/rails_and_graphql.png)

This is a continuation of [Rails & GraphQL Part 1](https://mattboldt.com/2019/01/07/rails-and-graphql/), where we built the backend of our API in rails. This article will cover integrating React and Apollo (a JavaScript GraphQL framework) into the rails API. If you haven't read part 1 yet, please do so now!

## Rails API Setup

In order to use React with rails, we need to make some changes to the API.

```ruby
# Gemfile
gem 'rack-cors'
```

Then, open up `application.rb` and add the following settings. This will allow us to accept AJAX requests coming from React.

```ruby
# config/application.rb
# CORS config to allow ajax
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end
```

[View commit](https://github.com/mattboldt/rails_graphql_demo/commit/693f5f40dae3aecdc7d7c16f3632aeb153b2f83d)

##### Extra Seed Data

I added some extra data to the `Book` model so we'll have more to display in our frontend app. [View commit](https://github.com/mattboldt/rails_graphql_demo/commit/21ae42a6d5415810d7463cc59ad15d18ca2901d9)

```ruby
# app/graphql/types/book_type.rb
module Types
  class BookType < Types::BaseObject
    field :id, Integer, null: false
    field :title, String, null: false
    field :cover_url, String, null: true
    field :average_rating, Integer, null: true
  end
end
```



## React

In the Rails app folder, we're going to create a new react app using `create-react-app`. [See their README for setup guides](https://github.com/facebook/create-react-app). I'm using `yarn` here, but you can use `npm` if you'd like.

```
create-react-app frontend
cd frontend
yarn start
```

[View Commit](https://github.com/mattboldt/rails_graphql_demo/commit/5ae44f8607207c9eba439b1639b6273b7572d56c)

I deleted some the css, svg, and tests generated with create-react-app, as well as created `components` and `styles` folders to better organize things. Here's what my project looks like:

```
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── components
│   │   └── App.js
│   ├── index.js
│   ├── serviceWorker.js
│   └── styles
│       └── index.css
├── package.json
└── yarn.lock
```

Be sure to remove references of `App.css` and update the paths to point to `./components/App` 

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App'; // Updated path
import * as serviceWorker from './serviceWorker';
```

```diff
// src/components/App.js
import React, { Component } from 'react';
-import logo from '../logo.svg';
-import '../styles/App.css';
```

#### Styling

For some quick styling, add a link to [TailwindCSS](https://tailwindcss.com/docs/what-is-tailwind/).


```html
// src/index.html
<link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
```

**For user avatars**, we'll use Gravatar with `yarn add react-gravatar`.

## Apollo

- [`react-apollo`](https://github.com/apollographql/react-apollo) is a React-specific library for using Apollo in components

- [`apollo-boost`](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost) contains many utilities and libraries for Apollo to get you set up quickly
- and finally the javascript [`graphql`](https://github.com/graphql/graphql-js) library itself

```
yarn add apollo-boost react-apollo graphql
```

#### Setting up ApolloClient

We need to configure `ApolloClient` with our API and wrap our root `<App />` with the `ApolloProvider` higher-order component. 

```jsx
// src/index.js
// [truncated]
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql'
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
```

### Users Index View

Now that we have the client passed down from `index.js`, we can start writing queries. Create a new component in `src/components/Users.js` and import the following:

```javascript
// src/components/Users.js
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Gravatar from 'react-gravatar';
```

- `Query` is another higher-order component that we'll wrap all of our `Users` index page with
- `gql` will help us build queries to send to the API
- `Gravatar` is for quick user avatars

Now we can write our query to fetch `users` and return `id, name, email, booksCount` (just like the test queries against the Rails server using graphiql!). Place it after the imports but before the class definition.

```js
// Below imports in src/components/Users.js
const USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      booksCount
    }
  }
`;
```

And finally, we have the Users index component class with its render function. The `Query` component is passed the `USERS_QUERY` and it returns with loading states, error info (if any), and the API's response data rendered in jsx. Since this component is wrapped in `Query`, the API request will be sent immediately after it's rendered. Some styling from Tailwind has also been added to render users inside cards.

```jsx
// Below user query in src/components/Users.js
class Users extends Component {
  render() {
    return (
      <Query query={USERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          return (
            <div className="flex flex-wrap mb-4">
              {data.users.map((user) => {
                return <div key={user.id} className="m-4 w-1/4 rounded overflow-hidden shadow-lg">
                  <Gravatar email={user.email} size={150} className="w-full" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{user.name}</div>
                    <p className="text-grey-darker text-base">{user.email}</p>
                    <p className="text-grey-darker text-base">{user.booksCount} books</p>
                  </div>
                </div>
              })}
            </div>
          )
        }}
      </Query>
    )
  }
}
export default Users;
```

To see this component in action, we need to call it from our app's root component `App.js` 

```jsx
// src/components/App.js
import React, { Component } from 'react';
import Users from './Users';
class App extends Component {
  render() {
    return (
      <div className="container mx-auto px-4">
        <Users />
      </div>
    );
  }
}
export default App;
```

[View commit](https://github.com/mattboldt/rails_graphql_demo/commit/063463a3158e22f76511b5233088c6869a72aaf0)

![react user's index](/assets/img/rails-and-graphql/react_users_index.png)

### User Profile & Books View

Next, we'll need to create a user's profile page which includes their list of books. Since the index page only returns exactly what it needed to render, we'll need to send a new request to the API to get back all that user's data.

```jsx
// src/components/User.js
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UserAvatar from './UserAvatar';
import Books from './Books';

const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      books {
        id
        title
        coverUrl
        averageRating
      }
    }
  }
`;
```




```jsx
// src/components/User.js
const User = ({ user, selectUser }) => (
  <Query query={USER_QUERY} variables={{ id: user.id }}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching..</div>
      if (error) return <div>Error!</div>

      return (
        <Fragment>
          <div className="flex my-4">
            <button
              className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded"
              onClick={selectUser.bind(this, null)}>
              Back
            </button>
          </div>
          <div className="flex mb-4">
            <div className="my-4 w-1/4 rounded overflow-hidden">
              <UserAvatar user={user} />
            </div>
            <div className="my-4 px-4 w-3/4">
              <Books books={data.user.books} />
            </div>
          </div>
        </Fragment>
      )
    }}
  </Query>
);
export default User;
```

##### User Avatar

In this `User` component, I've added a `UserAvatar` and a `Books` component to help display the data in a reusable way. I'll also refactor the user avatar code on the Users index page to use the new component.

```jsx
// src/components/UserAvatar.js
import React, { Fragment } from 'react';
import Gravatar from 'react-gravatar';

const UserAvatar = ({ user }) => (
  <Fragment>
    <Gravatar email={user.email} size={150} className="w-full" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{user.name}</div>
      <p className="text-grey-darker text-sm">{user.email}</p>
      <p className="text-grey-darker text-base">{user.booksCount} books</p>
    </div>
  </Fragment>
)
export default UserAvatar;
```

```jsx
// ....
// src/components/Users.js
<div className="flex flex-wrap mb-4">
  {data.users.map((user) => {
    return <div key={user.id}
                className="m-4 w-1/4 rounded overflow-hidden shadow-lg"
                onClick={this.props.selectUser.bind(this, user)}>
      <UserAvatar user={user} />
    </div>
  })}
</div>
// ...
```

##### Books

```jsx
// src/components/Books.js
import React, { Fragment } from 'react';
const Books = ({ books }) => (
  <Fragment>
    {books.map((book) =>
      <div key={book.id} className="flex border-b border-solid border-grey-light">
        <div className="w-3/4 p-4">
          <h3>{book.title}</h3>
          <p className="text-grey-darker">
            {[...Array(book.averageRating).keys()].map((s) =>
              <span key={s}>&#9733;</span>
            )}
          </p>
        </div>
        <div className="w-1/4 p-4 text-right">
          <img src={book.coverUrl} alt={book.title} />
        </div>
      </div>
    )}
  </Fragment>
);
export default Books;
```

##### App

Then, we must call the User component from our main App component. In here, we can hook up the action to show & hide user profiles on click. We're also storing the selected customer profile in the state object.

```jsx
// src/components/App.js
import React, { Component } from 'react';
import Users from './Users';
import User from './User';

class App extends Component {
  state = {
    selectedUser: null
  };

  selectUser = (user) => {
    this.setState({ selectedUser: user })
  }

  render() {
    return (
      <div className="container mx-auto px-4">
        {this.state.selectedUser ?
          <User user={this.state.selectedUser} selectUser={this.selectUser} /> :
          <Users selectUser={this.selectUser} />}
      </div>
    );
  }
}
export default App;

```

[View commit](https://github.com/mattboldt/rails_graphql_demo/commit/c833221eb018c8d2894e47af716488fb7d71ccc9)

### Creating a New User

To create users via mutations, we need a new component in `src/components/CreateUser.js`. Here we will need to import the Apollo `Mutation` and write the query.

```jsx
// src/components/CreateUser.js
import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      user {
        id
        name
        email
        booksCount
      }
      errors
    }
  }
`;
```

Then, we define our component and its initial state.

```jsx
// src/components/CreateUser.js
class CreateUser extends Component {
  state = {
    name: '',
    email: ''
  }
  onSubmit = () => {
    // We'll implement this later
  }
  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        <!-- implemented later -->
      </Mutation>
    );
  }
}
export default CreateUser;
```

The full mutation

```jsx
<Mutation
  mutation={CREATE_USER}
  update={this.props.onCreateUser}>
  {createUserMutation => (
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={e => this.onSubmit(e, createUserMutation)}>
      <h4 className="mb-3">Create new user</h4>
      <div className="mb-4">
        <input
          className="border rounded w-full py-2 px-3"
          type="text"
          value={this.state.name}
          placeholder="Name"
          onChange={e => this.setState({ name: e.target.value })} />
      </div>
      <div className="mb-6">
        <input
          className="border rounded w-full py-2 px-3"
          type="email"
          value={this.state.email}
          placeholder="Email"
          onChange={e => this.setState({ email: e.target.value })} />
      </div>
      <button
        className="bg-blue text-white py-2 px-4 rounded"
        type="submit">
        Create
      </button>
    </form>
  )}
</Mutation>
```

Submitting the form

```jsx
onSubmit = (e, createUser) => {
  e.preventDefault();
  createUser({ variables: this.state });
  this.setState({ name: '', email: '' });
}
```

Rendering the `CreateUser` component


```jsx
// src/components/Users.js
import CreateUser from './CreateUser';
// ....
<div className="flex flex-wrap mb-4">
  <Fragment>
    {data.users.map((user) => {
      // truncated
    })}
    <div className="m-4 w-1/4 rounded overflow-hidden shadow-lg">
      <CreateUser onCreateUser={this.updateUsers} />
    </div>
  </Fragment>
</div>
```

Dynamically updating the cache for the list of users on the index page

```jsx
// ....
// src/components/Users.js
class Users extends Component {
  updateUsers = (cache, { data: { createUser } }) => {
    const { users } = cache.readQuery({ query: USERS_QUERY });
    cache.writeQuery({
      query: USERS_QUERY,
      data: { users: users.concat([createUser.user]) },
    });
  }

```

![create user component](/assets/img/rails-and-graphql/react_create_user.png)

[View commit](https://github.com/mattboldt/rails_graphql_demo/commit/eb69aa41478a221a1d0beed0151ebb18fa2df2c7)


Learning all this tech at once is a _lot_ to take in, and it's difficult to package it all together in an easy to digest way. I hope these tutorials helped point you in the right direction. Feel free to reach out if you have any questions about what I went over here!

