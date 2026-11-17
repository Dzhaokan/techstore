import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, ProductsResponse } from '../../types/product';

const TECH_CATEGORIES = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products?limit=0',
      transformResponse: (res: ProductsResponse) =>
        res.products.filter((p) => TECH_CATEGORIES.includes(p.category)),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
