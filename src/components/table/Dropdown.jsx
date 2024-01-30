import React from 'react'
import { Dropdown } from 'react-bootstrap'

const CategoryDropdown = ({categories, currentCategory, changeCategory}) => {
  return (
    <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            {currentCategory}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((x, i) => (
            <Dropdown.Item href="#" key={i} onClick={() => {changeCategory(x)}}>{x}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default CategoryDropdown