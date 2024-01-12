import React from 'react'

import './navbar.styles.css'

const Navbar = ({handleChange, handleSubmit }) => {
  return (
    <div className='search-box'>

        <form onChange={handleChange}>
            <input className='input-search' placeholder='Search' type="search" ></input>
            <button className='btn-search' type='submit' onClick={handleSubmit}>Search</button>
        </form>

    </div>
  )
}

export default Navbar