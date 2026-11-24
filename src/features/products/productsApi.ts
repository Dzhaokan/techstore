import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, ProductsResponse } from '../../types/product';
import localData from '../../data/products.json';

const TECH_CATEGORIES = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      async queryFn(_arg, _api, _extra, baseQuery) {
        const result = await baseQuery('products?limit=0');

        // если dummyjson недоступен, берем локальную копию
        const all: Product[] = result.error
          ? localData.products
          : (result.data as ProductsResponse).products;

        return { data: all.filter((p) => TECH_CATEGORIES.includes(p.category)) };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
