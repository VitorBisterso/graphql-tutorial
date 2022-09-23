import { v4 as uuidv4 } from "uuid";

const Mutation = {
   addCategory: (parent, { input }, { db }) => {
      const { name } = input;

      const newCategory = {
         id: uuidv4(),
         name,
      };

      db.categories.push(newCategory);

      return newCategory;
   },
   addProduct: (parent, { input }, { db }) => {
      const { name, image, price, onSale, quantity, categoryId } = input;

      const newProduct = {
         id: uuidv4(),
         name,
         image,
         price,
         onSale,
         quantity,
         categoryId,
      }

      db.products.push(newProduct);

      return newProduct;
   },
   addReview: (parent, { input }, { db }) => {
      const { date, title, comment, rating, productId } = input;

      const newReview = {
         id: uuidv4(),
         date,
         title,
         comment,
         rating,
         productId
      }

      db.reviews.push(newReview);

      return newReview;
   },
   deleteCategory: (parent, { id }, { db }) => {
      db.categories = db.categories.filter(category => category.id !== id);

      db.products = db.products.map(product => {
         if (product.categoryId === id) {
            return {
               ...product,
               categoryId: null
            }
         }

         return product;
      })
      

      return true;
   },
   deleteProduct: (parent, { id }, { db }) => {
      db.products = db.products.filter(product => product.id !== id);

      db.reviews = db.reviews.filter(review => review.productId !== id);

      return true;
   },
   deleteReview: (parent, { id }, { db }) => {
      db.reviews = db.reviews.filter(review => review.id !== id);

      return true;
   },
   updateCategory: (parent, { id, input }, { db }) => {
      const index = db.categories.findIndex(category => category.id === id);

      if (index < 0) return null;

      db.categories[index] = {
         ...db.categories[index],
         ...input,
      }

      return db.categories[index];
   },
   updateProduct: (parent, { id, input }, { db }) => {
      const index = db.products.findIndex(product => product.id === id);

      if (index < 0) return null;

      db.products[index] = {
         ...db.products[index],
         ...input,
      }

      return db.products[index];
   },
   updateReview: (parent, { id, input }, { db }) => {
      const index = db.reviews.findIndex(review => review.id === id);

      if (index < 0) return null;

      db.reviews[index] = {
         ...db.reviews[index],
         ...input,
      }

      return db.reviews[index];
   }
}

export default Mutation;