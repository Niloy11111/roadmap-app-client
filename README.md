```js
## seen till video 4
to solve cookie problem in client side
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

add credentials true here and add   credentials: "include" in your createApi function
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include", // this is to get cookies from backend
  }),
  endpoints: () => ({}),
});



```
