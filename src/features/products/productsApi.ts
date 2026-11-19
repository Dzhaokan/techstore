import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, ProductsResponse } from '../../types/product';

// dummyjson отдает вообще все подряд (косметика, еда и т.д.),
// нам нужна только техника
const TECH_CATEGORIES = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];

const FIELDS = 'id,title,description,price,category,rating,thumbnail';

// в api цены в долларах, переводим в сомы по примерному курсу
const USD_TO_KGS = 87;

const toSoms = (product: Product): Product => ({
  ...product,
  price: Math.round(product.price * USD_TO_KGS),
});

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `products?limit=0&select=${FIELDS}`,
      transformResponse: (res: ProductsResponse) =>
        res.products.filter((p) => TECH_CATEGORIES.includes(p.category)).map(toSoms),
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}?select=${FIELDS}`,
      transformResponse: toSoms,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
