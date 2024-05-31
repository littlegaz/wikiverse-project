import React from 'react'

export const Page = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
      <p>
        <b>Author:</b> {props.author.name}
      </p>
      <p>
        <b>Published:</b>{' '}
        <time dateTime={props.createdAt}>
          {new Date(props.createdAt).toLocaleDateString()}
        </time>
      </p>
      <p>{props.content}</p>
      <p>
        <b>Tags:</b>
      </p>
      <ul>
        {props.tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <p>
        <button
          className="link"
          type="button"
          onClick={() => props.setActivePage(null)}
        >
          &larr; Back to Wiki List
        </button>
      </p>
    </>
  )
}