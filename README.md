# ShopWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0. Is a **Virtual Shop**
where the user can `register` or `login` to see the available `products` and add then to his shopping car.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files. 

Now you can login whit user: **Admin** and password: **1234** to get admin functions in **WebShop** or you can
login whit user: **User** password: **1234** to see the user experience.

## Functional Requirements:

1. **User Management**: Implement a User model and related services in Angular to interact with the User API endpoints. This includes registration, login, and logout functionalities. Use token-based authentication for API requests.

2. **Category Management**: Implement a Category model and related services to interact with the Category API endpoints. Only administrator users should be able to create, update, and delete Categories. All users can read the Categories.

3. **Product Management**: Implement a Product model and related services to interact with the Product API endpoints. Only administrator users should be able to create, update, and delete Products. All users can read the Products.

4. **Product Purchase**: Implement a service to interact with the Product Purchase API endpoint. Users should be able to make a purchase by sending a POST request to this endpoint.

5. **Product Display and Search**: On the main page, implement a feature to display all available products. Users should be able to search products by name and category.

6. **Product Details**: Implement a feature to display detailed information about a product when a user selects it. This could include the product’s name, category, price, description, and any other relevant details.

7. **Shopping List**: Implement a shopping list feature. Users should be able to add products to their shopping list for future reference or purchase.

### Non-Functional Requirements:

1. **Security**: Implement security measures such as token-based authentication and protection against brute force attacks. Use Angular's `HttpClient` and `HttpHeaders` to include the authentication token in the headers of all API requests.

2. **Documentation**: Provide clear and comprehensive documentation for your Angular application, including the components and services.

3. **Performance**: Use Angular's performance optimization features, such as lazy loading and change detection strategies, to ensure your application performs well even with a large number of users or large amounts of data.

4. **Compatibility**: Ensure that your Angular application is compatible with different versions of Angular and with different browsers.
