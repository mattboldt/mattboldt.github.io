---
layout: post
title: Rails & GraphQL
desc: "Building a Rails API with GraphQL Ruby"
date: 2019-01-07 23:00:00
categories: rails, graphql, ruby, REST
---

<img src="/assets/img/rails-and-graphql/rails_and_graphql.png" alt="rails and graphql logo" width="100%"/>

GraphQL is a query language for APIs, as well as a server side runtime for executing said queries. The query language itself is universal and not tied to any frontend or backend technology. However, the server side implementations come in many flavors; in our case we're going to use the [graphql-ruby gem](http://graphql-ruby.org/) (with rails) to parse incoming queries, make database calls, and respond with JSON. It's a full-on replacement for REST APIs, rails API controllers, and JSON serializers.

First, let's define some vocabulary I'll be using through this tutorial. 

- **Queries** - Fetch specific data from the API. It's best practice to make queries read-only, like you would a `GET` request in REST. But queries are _much_ more than just simple `GET`s!
- **Mutations** - Any modification of data on the API. Think `CREATE, UPDATE, DESTROY`.

- **Types** - Used to define datatypes, or in our case, Rails models. A type contains fields and functions that respond with data based on what's requested in a query / mutation. Types can also be static, like `String` or `ID`; these are built into the server side library.
- **Fields** - Represent the attributes for a given type (like attributes on a model).
- **Functions** - Supply the above fields with data (like methods on a model). 

These 5 Things all work together to fetch, create, mangle, and destroy data in an incredibly readable and intuitive way &mdash; If you can read JSON or Yaml, you can read and write GraphQL!



## Setting up a Rails API

First, we're going to create a new api-only Rails app for our backend. I'm gonna skip testing for now for the sake of this tutorial. Next, create a couple models to test data with.

```
rails new graphql_api --skip-test --api
rails g model User email:string name:string
rails g model Book user:belongs_to title:string
rails db:migrate
```

Open `app/models/user.rb` and add the `has_many :books` association.
Optionally, create some seed data using the `faker` gem in `seeds.rb`, then run `rake db:seed`.

[View commit](https://github.com/mattboldt/rails_graphql_demo/commit/2dfe3298f153d2d43ed1e602d4ecefd23cc0462c)

## Installing dependencies

```ruby
# Gemfile

# The ruby implementation of the GraphQL language.
gem 'graphql'

group :development do
  # A development utility to test GraphQL queries.
  gem 'graphiql-rails'

  # Seed data generator
  gem 'faker'
end
```

### Generating the GraphQL files

```
rails generate graphql:install
bundle
rails generate graphql:object user
rails generate graphql:object book
```

These generators create a `graphql` directory with types, mutations, and a schema. We also want to generate new custom types for our `User` and `Book` models we created above.

```diff
  ├─ controllers
+ │  └─ graphql_controller.rb
+ ├─ graphql
+ │  ├─ mutations
+ │  ├─ rails_graphql_demo_schema.rb
+ │  └─ types
+ │     ─ base_enum.rb
+ │     ─ base_input_object.rb
+ │     ─ base_interface.rb
+ │     ─ base_object.rb
+ │     ─ base_scalar.rb
+ │     ─ base_union.rb
+ │     ─ book_type.rb
+ │     ─ mutation_type.rb
+ │     ─ query_type.rb
+ │     ─ user_type.rb
```

The generator adds a new `POST` endpoint to our routes that's mapped to `app/controllers/graphql_controller.rb#execute` &mdash; this method serves as our main API entrypoint and is ready to go. For development, we need the additional endpoint for `graphiql-rails`.

```ruby
# routes.rb

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "graphql#execute"
  end
  post "/graphql", to: "graphql#execute"
end

```

[View commit](https://github.com/mattboldt/rails_graphql_demo/commit/0c9b56aa4b0aea178856aebd5832337763826daf)


### Testing queries with Graphiql

The final step to get `graphiql` running is to uncomment `require "sprockets/railtie"` in `application.rb`. Boot up your rails server with `rails s` and navigate to `http://localhost:3000/graphiql` to see the interface. Here we can run the following query to get a test response from the API.

![users query](/assets/img/rails-and-graphql/graphiql_hello_world.png)

[View commit](https://github.com/mattboldt/rails_graphql_demo/commit/8253186e052bc1ebd02ccf8524cd19f32c22597f)

## Types

For the `User` and `Book` models, we need to create a series of types so GraphQL knows what kind of data to send back in the event of a request. Somewhat similar to Rails' [active_model_serializers](https://github.com/rails-api/active_model_serializers) or [JBuilder](https://github.com/rails/jbuilder), these types make up the structure of our models from the API's point of view. Here we'll specifiy what columns, model methods, and more return to the client application. [More info on declaring types can be found here.](http://graphql-ruby.org/getting_started#declare-types)

### User and Book Types

Open up the generated types and add the following fields. Notice each field gets an "object type" and a `null` option of whether or not it needs to be present for the query to succeed (e.g. an `:id` field should never be `nil`, but `:name` might be). This tells graphql what to expect from incoming and outgoing data, and gives us peace of mind in knowing exactly how to parse data on both the front and back end.

Also notice we didn't have to define _functions_ for `:id, :name`, etc; Those are automatically mapped to the Rails model's attributes we created earlier. Then, we added a custom field, `books_count`. This method doesn't exist on the Rails model, so we define it below the list of fields. In these methods `object` refers to the Rails model, so we must call `object.books.size`.

```ruby
# app/graphql/types/user_type.rb
module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :email, String, null: true
    field :books, [Types::BookType], null: true
    field :books_count, Integer, null: true

    def books_count
      object.books.size
    end
  end
end


# app/graphql/types/book_type.rb
module Types
  class BookType < Types::BaseObject
    field :title, String, null: false
  end
end
```

### The Main Query Type

There are two main types that incoming requests are routed to: `query_type.rb` and `mutation_type.rb`. They are both already refrerenced in our schema file, and behave somewhat similarly to Rails routes & resources.

```ruby
# app/graphql/RAILS_APP_NAME_schema.rb
class GraphqlApiSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
end
```

In our main query type file, we define `:users` and `:user` _fields_, along with `users` and `user` _functions_. The `users` field returns an array of `UserType` objects, and can never be `nil` (but can be empty). The `user` field accepts a required argument `:id` that is of the type `ID`, and returns a single `UserType` object. ([`ID` is a built-in type](http://graphql-ruby.org/api-doc/1.8.11/GraphQL/Types.html) that acts just the same as the above `User` and `Book` type.) 

```ruby
# app/graphql/types/query_type.rb
module Types
  class QueryType < Types::BaseObject

    field :users, [Types::UserType], null: false

    def users
      User.all
    end

    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end

    def user(id:)
      User.find(id)
    end
  end
end
```
[View commit](https://github.com/mattboldt/rails_graphql_demo/commit/e062713d17f8fb65c9d0a4cb31a4014cf795376a)

### Querying the User Fields

Visit `http://localhost:3000/graphiql` in your browser and paste in the following for the `users` and `user` query fields we added above. Here we specify exactly what we want the API to respond with; in this case, we only want a list of user names, emails, and the number of books they own.

```gql
query {
  users {
    name
    email
    booksCount
  }
}
```

We can also query a single user, along with all of their books, and each book's title.

```gql
query {
  user(id: 1) {
    name
    email
    books {
      title
    }
  }
}
```

![user query](/assets/img/rails-and-graphql/graphiql_user_query.png)

## Mutations

Mutations allow for creating, updating, and destroying data. [More info on them can be found here.](http://graphql-ruby.org/mutations/mutation_classes) Let's set up a base class from which to extend a `CreateUser` mutation.

```ruby
# app/graphql/mutations/base_mutation.rb
class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
end
```

- **Arguments** - Here we specify which arguments to accept as params, which are required, and what object types they are. This is somewhat similar to defining strong params in a Rails controller, but with more fine grained control of what's coming in.

- **Fields** - Same concept as Query fields above. In our case, we accepted arguments to create a user, and we want to return a `user` field with our new model accompanied with an array of `errors` if present.

- **Resolver** - The `resolve` method is where we execute our ActiveRecord commands. It returns a hash with keys that match the above field names. 


```ruby
# app/graphql/mutations/create_user.rb
class Mutations::CreateUser < Mutations::BaseMutation
  argument :name, String, required: true
  argument :email, String, required: true

  field :user, Types::UserType, null: false
  field :errors, [String], null: false

  def resolve(name:, email:)
    user = User.new(name: name, email: email)
    if user.save
      # Successful creation, return the created object with no errors
      {
        user: user,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        user: nil,
        errors: user.errors.full_messages
      }
    end
  end
end
```

Then finally, add the new mutation to the main mutation type class so it's exposed to our API.

```ruby
# app/graphql/types/mutation_type.rb
module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
  end
end
```

[View commit](https://github.com/mattboldt/rails_graphql_demo/commit/a9da3b891f7454736056a4b03cc0671b60899373)

#### Creating a User

To test, open up `http://localhost:3000/graphiql` and paste in the following query. Notice we pass in an `input: {}` object to `createUser`; this maps to the `:create_user` field which accepts a single `input` argument. Learn more about this design [in graphql-ruby's documentation](http://graphql-ruby.org/api-doc/1.8.5/GraphQL/Schema/RelayClassicMutation.html).

```gql
mutation {
  createUser(input: {
    name: "Matt Boldt",
    email: "me@mattboldt.com"
  }) {
    user {
      id
      name
      email
    }
    errors
  }
}
```

![create user](/assets/img/rails-and-graphql/graphiql_create_user.png)

Success! We just created our first model via GraphQL; no extra routes, controllers, or serializers needed. What's more, we only returned exactly the data we needed from the newly created model.


## The Frontend

[Click here for Part 2, which features a React & Apollo frontend app that connects to our Rails API.](https://mattboldt.com/2019/06/23/rails-graphql-react-apollo-part-two/)
