import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/App'

import axios from 'axios'
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  ReactDOM.createRoot(
    <App notes={notes} />,
    document.getElementById('root')
  )
})