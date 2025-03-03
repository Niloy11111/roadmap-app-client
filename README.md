# Bike Shop

## Setup Instructions

### 1. Installation and Environment Setup

1. Add the following variables in your `.env` file:

   - `PORT`: The port number you want to run the application on.
   - `DATABASE_URL`: The MongoDB URI.

### 2. Install Dependencies

Run the following command to install the required npm dependencies:

```
npm install
```

### 3. Run the Project

Start the development server with the following command:

#### run project

```
npm run dev
```

## How to Run Locally

#### Live Deployment Link

[https://bike-bari-6a.netlify.app/](https://bike-bari-6a.netlify.app/)

## admin Credentials to access dashboard admin activities

# Admin Email: admin@gmail.com

# Admin Password: secure

## For user access create an user

## 1. User Roles:

- **Admin**: Can manage users (deactivate accounts), manage products (CRUD), and manage orders (CRUD).
- **Customer**: Can register, log in, view and purchase products, manage their profile, and track orders.

## 2. Authentication:

- **Register**: Users can register with name, email, and password.
- **Login**: Authenticates user, returns a JWT token.
- **Logout**: Clears the token from local storage and redirects to the login page.

## 3. Public Routes:

- **Home Page**:

  - Navbar: Logo, favicon, navigation, login/signup buttons.
  - Banner: Highlight platform or special offers.
  - Featured Products: Display 6 products with "View All" button.
  - Extra Section: Testimonials or blogs.
  - Footer: Essential links, social media, and contact details.

- **All Products Page**:

  - Search by brand, bike name, or category.
  - Filters: Price, model, brand, category, availability.
  - Dynamic results based on search/filter selections.
  - Product cards with name, brand, model, price, category.
  - "View Details" button.

- **Product Details Page**:

  - Display product image and details.
  - "Buy Now" button redirects to checkout.

- **About Page**:
  - Details about the shop and its mission.

## 4. Private Routes:

- **Checkout Page**:

  - Place orders with product details, user details, total price, and payment method.
  - Ensure stock availability.
  - Payment Integration: SurjoPay.
  - "Order Now" button to confirm purchase.

- **Dashboard (Role-Based)**:
  - **Admin Dashboard**:
    - Manage users (deactivate accounts).
    - Manage products (CRUD).
    - Manage orders (CRUD).
  - **User Dashboard**:
    - View orders and manage profile settings.
    - Update password (requires current password).

## 5. API Endpoints:

baseUrl = [http://localhost:5000/api/v1]

### **Authentication**

- `POST users/register` → Register a new user.
- `POST /auth/login` → User login.

### **User Management**

- `PATCH /admin/users/:userId/block` → Admin blocks a user.

### **Product Management**

- `POST /products/create-bike` → Create a new product.
- `GET /products/bikes` → Fetch all products (search, sort, filter).
- `GET /products/:id` → Fetch a single product by ID.
- `PATCH /products/:id` → Update a product by ID.
- `DELETE /products/:id` → Delete a product by ID.

### **Order Management**

- `POST /orders/create-order` → Create a new order.
- `GET /orders/allOrders` → Fetch all orders (admin).
- `GET /orders/:orderId` → Fetch specific orders.
- `PATCH /orders/:id` → Update an order (e.g., status).
- `DELETE /orders/:id` → Cancel an order.

### **Payment Integration**

- `POST /api/payments/initiate` → Initiate payment with SurjoPay.
- `GET /api/payments/status/:orderId` → Check payment status.

## 6. Database:

**Database**: MongoDB

### **Schema Includes:**

- **Users**:
  - Roles: customer, admin.
  - Fields: Name, Email, Password, Role.
- **Products**:
  - Fields: Name, Brand, Price, Model, Stock, Category.
- **Orders**:
  - User reference, product details, total price, status.

## 7. Authentication:

- Implement user registration, login, JWT token generation, and logout.
- Secure password hashing and user session management.

## 8. Product Management:

- CRUD operations for products (create, read, update, delete).

## 9. Order Management:

- CRUD operations for orders (create, read, update, delete).
- Ensure stock availability before placing orders.

## 10. Payment Integration:

- Integrate **SurjoPay** for payment processing.

## 11. Error Handling:

- Implement consistent and user-friendly error responses for:
  - Invalid login attempts.
  - Out-of-stock products.
  - Unauthorized actions.

## 12. Performance Optimization:

- Optimize API responses for smooth operation with large data loads.


