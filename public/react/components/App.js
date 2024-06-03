import React, { useEffect, useState } from 'react'
import { Page } from './Page'
import { Form } from './Form'

// import and prepend the api url to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [activePage, setActivePage] = useState(null)
  const [isAddingPage, setIsAddingPage] = useState(false)

  async function getPage(slug) {
    const response = await fetch(`${apiURL}/wiki/${slug}`)
    const pageData = await response.json()
    setActivePage(pageData)
  }

  async function addPage(page) {
    const response = await fetch(`${apiURL}/wiki`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(page)
    })

    const newPage = await response.json()
    setPages([...pages, newPage])
    setIsAddingPage(false)
  }

  async function deletePage(id) {
    await fetch(`${apiURL}/wiki/${id}`, {
      method: 'DELETE'
    })

    setPages(pages.filter(page => page.id !== id))
    if (activePage && activePage.id === id) {
      setActivePage(null)
    }
  }

  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch(`${apiURL}/wiki`)
        const pagesData = await response.json()
        setPages(pagesData)
      } catch (err) {
        console.log('Oh no an error! ', err)
      }
    }

    fetchPages()
  }, [])

  useEffect(() => {
    if (activePage) {
      document.title = `${activePage.title} - WikiVerse`
    } else if (isAddingPage) {
      document.title = 'Add a Page - WikiVerse'
    } else {
      document.title = 'WikiVerse'
    }
  }, [activePage, isAddingPage])

  if (isAddingPage) {
    return <Form addPage={addPage} setIsAddingPage={setIsAddingPage} />
  }

  if (activePage) {
    return <Page {...activePage} setActivePage={setActivePage} />
  }

  return (
    <main>
      <h1 style={{ marginBottom: 0 }}>WikiVerse</h1>
      <p style={{ marginTop: 0 }}>An interesting 📚</p>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <button
              className="link"
              type="button"
              onClick={() => getPage(page.slug)}
            >
              {page.title}
            </button>
            <button
              className="link"
              type="button"
              onClick={() => deletePage(page.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="link"
          type="button"
          onClick={() => setIsAddingPage(true)}
        >
          Add a Page &rarr;
        </button>
      </p>
    </main>
  )
}

export default App