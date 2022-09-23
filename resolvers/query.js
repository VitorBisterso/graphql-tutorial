const Query = {
   products: (parent, { filter }, { db }) => {
      let filteredProducts = db.products;

      if (filter) {
         const { onSale, avgRating } = filter;

         if (onSale) {
            filteredProducts = filteredProducts.filter(product => product.onSale)
         }

         if ([1, 2, 3, 4, 5].includes(avgRating)) {
            filteredProducts = filteredProducts.filter(product => {
               let ratingSum = 0;
               let numberOfReviews = 0;
               db.reviews.forEach(review => {
                  if (review.productId === product.id) {
                     numberOfReviews++;
                     ratingSum += review.rating;
                  }
               });
               const avgProductRating = ratingSum / numberOfReviews;
               
               return avgProductRating >= avgRating;
            })
         }
      }

      return filteredProducts;
   },
   product: (parent, { id: productId }, { db }) => {
      return db.products.find(p => p.id === productId);
   },
   categories: (parent, args, { db }) => db.categories,
   category: (parent, { id: categoryId }, { db }) => {
      return db.categories.find(c => c.id === categoryId);
   }
}

export default Query;