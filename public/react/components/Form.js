import React, { useState } from 'react'

export const Form = (props) => {
  const [data, setData] = useState({
    title: '',
    content: '',
    name: '',
    email: '',
    tags: ''
  })

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addPage(data)
  }

  return (
    <>
      <h1>Add a Page</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            value={data.title}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="content">Content</label>
          <br />
          <textarea
            id="content"
            name="content"
            value={data.content}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            value={data.name}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="tags">Tags</label>
          <br />
          <input
            type="text"
            name="tags"
            id="tags"
            value={data.tags}
            onChange={handleChange}
          />
        </p>
        <p>
          <button type="submit">Create Page</button>
        </p>
      </form>
      <button
        type="button"
        className="link"
        onClick={() => props.setIsAddingPage(false)}
      >
        &larr; Back to Wiki List
      </button>
    </>
  )
}