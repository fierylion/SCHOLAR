import React from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver'
const App = () => {
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [speedServer, setSpeedServer] = React.useState(true)
  const [ur, setUr] = React.useState('')
  const fetchData = async (e) => {
    e.preventDefault()
    setLoading(true)
    const dev = false
    try {
      if (!ur) return
      const data = {
        links: [
          // 'https://scholar.google.com/citations?hl=en&user=ke9PXIIAAAAJ',
          // 'https://scholar.google.com/citations?hl=en&user=hTxY1RoAAAAJ',
          // 'https://scholar.google.com/citations?hl=en&user=ke9PXIIAAAAJ',
          ur,
        ],
      }
      const url = dev
        ? 'http://localhost:8000/results'
        : (speedServer)?'https://gscrape.fierylion.me/results':'https://scholar.fierylion.me/results'
      const response = await axios.post(url, data, { responseType: 'blob' })
      saveAs(response.data, 'result.xlsx')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='container'>
      <div>
        {loading && (
          <div className='text-success'>
            <h1>Loading....</h1>
          </div>
        )}
        <div>
          {error && (
            <div className='text-danger'>
              <h1>There is an error, Please Try again later!!!!</h1>
            </div>
          )}
        </div>
        <div>
          <h3 className='text-primary'>Select type of server</h3>
          <div className='d-flex justify-content-around'>
            <button
              className={`btn btn-${
                speedServer ? 'primary' : 'outline-primary'
              }`}
              onClick={() => setSpeedServer(true)}
            >
              High Memory 7 GB
            </button>
            <button
              className={`btn btn-${
                !speedServer ? 'primary' : 'outline-primary'
              }`}
              onClick={() => setSpeedServer(false)}
            >
              Low Memory 1 GB
            </button>
          </div>
        </div>
        <div>
          <form onSubmit={fetchData} className='form'>
            <label htmlFor='url' className='label m-3'>
              Enter Instructor URL:{' '}
            </label>
            <input
              type='text'
              name='url'
              id='url'
              className='form-control my-2 '
              value={ur}
              onChange={(e) => setUr(e.target.value)}
            />
            <button className='btn btn-primary' type='submit'>
              DOWNLOAD EXCEL
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default App
