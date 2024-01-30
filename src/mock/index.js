import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/category', () => {
      let Categories = [];
      data.posts.forEach(element => {
        element.categories.forEach((category) => {
            // true && statement execute when true
            // false || statement execute when false
            // const value = null/undefined ?? statement execute when it is null (?? : null colleasing value)
            !Categories.includes(category.name) && Categories.push(category.name); 
        });
      });
      return {categories: Categories};
    });

    this.get('/posts/:pageNumber/:recordPerPage/:category', (schema, request) => {
      let category = request.params.category;
      let pageNumber = parseInt(request.params.pageNumber);
      let recordPerPage = parseInt(request.params.recordPerPage);
      let firstIndex = (pageNumber - 1) * recordPerPage;
      let lastIndex = pageNumber * recordPerPage;
      if(category === "All"){
        return {
          result: lastIndex <= data.posts.length ? data.posts.slice(firstIndex, lastIndex) : data.posts.slice(firstIndex), 
          totalRows: data.posts.length
        };
      }
      const filterData = data.posts.filter(post => {
        return post.categories.some(category => {
          return category.name === request.params.category
        });
      });
      return {
        result: lastIndex <= filterData.length ? filterData.slice(firstIndex, lastIndex) : filterData.slice(firstIndex), 
        totalRows: filterData.length
      };
    });
  },
});
