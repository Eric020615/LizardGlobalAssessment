import { useState, useEffect } from 'react';
import TableFooter from './TableFooter';
import CategoryDropdown from './Dropdown';

export default function Table() {
  let [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [totalPage, setTotalPage] = useState(0);
  const recordsPerPage = 5;

  // only run this callback function at initial state
  useEffect(() => {
    getCategories();
  }, []);

  // only run this callback function at initial state
  useEffect(() => {
    getData();
  }, [currentCategory, currentPage, recordsPerPage]);

  const getData = () => {
    fetch(`api/posts/${currentPage}/${recordsPerPage}/${currentCategory}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.result);
        setTotalPage(Math.ceil(json.totalRows / recordsPerPage));
    });
  }

  const getCategories = () => {
    fetch(`api/category`)
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.categories);
    });
  };

  const changePage = (pageNumber) => {
    // prev limit
    if (pageNumber == 0) {
      return;
    }
    // next limit
    if (pageNumber == totalPage + 1) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const getCategory = (categories) => {
    const list = new Set(categories.map((x)=> (
        x.name
    )));
    return Array.from(list).join(",");
  }

  const changeCategory = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  }

  return (
    <div className="container p-5">
      <CategoryDropdown 
        categories={categories} 
        currentCategory={currentCategory} 
        changeCategory={changeCategory}/> 
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Author</th>
            <th scope="col">Title</th>
            <th scope="col">Publish Date</th>
            <th scope="col">Categories</th>
          </tr>
        </thead>
        {data.length >= 0 ? (
          <>
            {data.map((data, index) => (
              <tbody key={index}>
                <tr>
                  <th scope="id">{data.id}</th>
                  <td>{data.author.name}</td>
                  <td>{data.title}</td>
                  <td>{data.publishDate}</td>
                  <td>{getCategory(data.categories)}</td>
                </tr>
              </tbody>
            ))}
          </>
        ) : (
          <div>Records Not Found</div>
        )}
      </table>
      <TableFooter
        totalPage={totalPage}
        changePage={changePage}
        currentPage={currentPage}
      />
    </div>
  );
}
