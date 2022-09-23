const Category = {
   products: ({ id: categoryId }, { filter }, { db }) => {
      const categoryProducts = db.products.filter(p => p.categoryId === categoryId);
      
      let filteredCategoryProducts = categoryProducts;

      if (filter) {
         if (filter.onSale) {
            filteredCategoryProducts = filteredCategoryProducts.filter(product => product.onSale)
         }
      }

      return filteredCategoryProducts;
   }
}

export default Category;