import React from 'react'

const TableFooter = ({currentPage, totalPage, changePage}) => {
  const numbers = [...Array(totalPage + 1).keys()].slice(1);
  return (
    <nav>
        <ul className='pagination'>
            <li className='page-item'>
                <a href='#' className='page-link' onClick={() => {changePage(currentPage - 1)}}>Prev</a>
            </li>
            { numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a href='#' className='page-link' onClick={() => {changePage(n)}}>{n}</a>
                </li>
            ))}
            <li className='page-item'>
                <a href='#' className='page-link' onClick={() => {changePage(currentPage + 1)}}>Next</a>
            </li>
        </ul>
    </nav>
  )
}

export default TableFooter