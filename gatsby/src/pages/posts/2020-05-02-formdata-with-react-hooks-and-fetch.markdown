---
layout: post
title: FormData with React Hooks and Fetch
desc: "Building a dependency-free HTML form using React Hooks, FormData, and Fetch"
date: 2020-05-02 15:00:00
categories: react, hooks, useRef, FormData
---

Forms are hard. Forms in React are hard. For most cases, a 3rd party solution like [react-hooks-form](https://react-hook-form.com/) is the way to go. However, some may find themselves in a position where they cannot (or prefer not to) add a dependency, and simply want submit a no-frills html form, asynchronously, using only React.

## Using `setState`

Consider the following plain React form:

```jsx
const UserForm = props => {
  const [user, setUser] = useState(props.user)

  const submit = e => {
    e.preventDefault()
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => setUser(json.user))
  }

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        name="user[name]"
        value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
      />
      {user.errors.name && <p>{user.errors.name}</p>}

      <input
        type="email"
        name="user[email]"
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
      />
      {user.errors.name && <p>{user.errors.name}</p>}

      <input type="submit" name="Sign Up" />
    </form>
  )
}
```

- We're using `useState` to keep track of our state both before and after submission. Without this hook, we wouldn't know what to send to the API.
- We must use controlled components with `onChange` handlers for each input, even though it's not necessary to keep track of changes for every keystroke.
- Even though we're using a form element and inputs, we're not reaping any benefits from the built-in attributes like `name`.

## Using FormData

Here's the same form with `FormData`

```jsx
const UserForm = props => {
  const [user, setUser] = useState(props.user)
  const form = useRef(null)

  const submit = e => {
    e.preventDefault()
    const data = new FormData(form.current)
    fetch('/api', { method: 'POST', body: data })
      .then(res => res.json())
      .then(json => setUser(json.user))
  }

  return (
    <form ref={form} onSubmit={submit}>
      <input type="text" name="user[name]" defaultValue={user.name} />
      {user.errors.name && <p>{user.errors.name}</p>}

      <input type="email" name="user[email]" defaultValue={user.email} />
      {user.errors.email && <p>{user.errors.email}</p>}

      <input type="submit" name="Sign Up" />
    </form>
  )
}
```

- Instead of sending data as JSON, we're sending it as a standard  `FormData` object for the server to consume.
- There was no need to use controlled inputs, so instead we're using `defaultValue` and letting that state remain unbound. This also means we don't need to update the state `onChange`.
- We're letting each input's `name` attribute build up what gets sent to the API, instead of building an object and serializing JSON manually.
- `setUser` is still called after the API responds, which can be helpful if we needed to attach errors from the API response. 

## A More Complex Example

What if our sign up form grows, and we need to add address fields? Using `setState` alone like in the first example could prove challenging with updating all that state and preparing it to be sent to the API. But with `FormData`, it becomes rather easy:

```jsx
const UserForm = props => {
  const [user, setUser] = useState(props.user)
  const form = useRef(null)

  const submit = e => {
    e.preventDefault()

    const data = new FormData(form.current)
    fetch('/api', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(json => setUser(json.user))
  }

  return (
    <form ref={form} onSubmit={submit}>
      <input type="text" name="user[name]" defaultValue={user.name} />
      {user.errors.name && <p>{user.errors.name}</p>}

      <input type="email" name="user[email]" defaultValue={user.email} />
      {user.errors.email && <p>{user.errors.email}</p>}

      {user.addresses.map((address, idx) => (
        <div key={idx}>
          <input
            type="text"
            name="user[addresses][][address]"
            defaultValue={address.address}
          />
          <input
            type="text"
            name="user[addresses][][city]"
            defaultValue={address.city}
          />
          <input
            type="text"
            name="user[addresses][][state]"
            defaultValue={address.state}
          />

          {user.errors.addresses[idx] && <p>{user.errors.addresses[idx]}</p>}
        </div>
      ))}

      <input type="submit" name="Sign Up" />
    </form>
  )
}
```

- No changes to state were necessary to include our new address fields. They live in uncontrolled inputs, and required no complex state traversing or merging strategies to keep everything in sync.
- Since our API (in my case a very small node Express server) knows how to parse `FormData` already, it can access the new fields just as easily as if it were JSON.
- The state structure is tightly coupled to our form element, making it easier for another developer to come in and understand what's going on, add fields, or perform validation. They don't need to worry as much about the state or when/where it's updated.

## Error when `POST`ing `multipart/form-data`

One issue I did run into was the setting of custom headers using `fetch`. Note the absence of a `Content-Type` header in the API request:

```jsx
const submit = e => {
  e.preventDefault()

  const data = new FormData(form.current)
  fetch('/api', {
    method: 'POST',
    headers: new Headers({
      'AuthHeader': '123',
      // STOP! Do not add the following header!
      // 'Content-Type': 'multipart/form-data'
    }),
    body: data,
  })
    .then(res => res.json())
    .then(json => setUser(json.user))
}
```

After some time debugging, I found [this Github issue for `fetch`](https://github.com/github/fetch/issues/505). Essentially, when you post `FormData` via `fetch`, it automatically appends this header with some extra info. It looks something like this:

```
Content-Type: multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL
```

Overriding this header results in a failed `POST` request, and a Bad Time&trade;. So remember to exclude it when using `FormData` with `fetch`.

#### Thanks for reading!
