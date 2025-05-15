Amazon Clone Website
This is a full-stack e-commerce website inspired by Amazon, built with a Node.js backend and a React frontend. The application allows users to browse products, add items to their cart, and checkout, with an admin portal for managing products. The project is deployed on Render and follows a modern, responsive design.
Features
User Authentication:Register and login functionality for users.
Role-based access:Normal users can shop, while admin users can manage products.
Product Listing:Displays products in a grid layout with images, names, descriptions, and prices.
Search functionality to find products by name.
Shopping Cart:Add products to the cart with a quantity selector (- 1 +).
View cart items with images, quantities, and prices.
Select/deselect items for checkout.
Increase or decrease item quantities in the cart.
Displays total amount for selected items.
Checkout:
View cart items, select shipping address, and payment method.
Place orders (mock implementation).
Admin Portal:Accessible only to admin users.
Add new products with name, description, price, image URL. 
Responsive Design:Mobile-friendly layout inspired by Amazon.
Category sidebar hides on mobile, product grid adjusts to screen size, and cart page stacks vertically on smaller screens.
Installation
Clone the Repository:
git clone https://github.com/NaniCherry131202/Amazon-Clone.git
cd Amazon-Clone
cd backend
npm install
create .env file in the backend in the format of
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/clone?retryWrites=true&w=majority
JWT_SECRET=secret
PORT=5000
start server using npm run dev
Next go to Frontend 
cd ../frontend
npm install
create .env in the frontend directory in the format of VITE_API_BASE_URL=http://localhost:5000
start the server using npm run dev
For Admin Portal login with this Credintals Email:charanpeddi37@gmail.com
Password:Charan@123