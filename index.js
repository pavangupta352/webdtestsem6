<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
        integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/home.css">
</head>

<body class="d-flex text-center text-white bg-dark">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header class="mb-auto">
            <div>
                <h3 class="float-md-left mb-0">E-Commerce App</h3>
                <nav class="nav nav-masthead justify-content-center float-md-right">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    <a class="nav-link" href="/products">Products</a>
                    <% if(!currentUser) { %>
                    <a class="nav-link" href="/login">Login</a>
                    <a class="nav-link" href="/register">Register</a>
                    <% } else { %>
                    <a class="nav-link" href="/logout">Logout</a>
                    <% } %>
                </nav>
            </div>
        </header>
<section class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <h1 class="font-weight-bold mb-3">Cart</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <% cart.items.forEach((item) => { %>
              <tr>
                <td><%= item.product.name %></td>
                <td>$<%= item.product.price %></td>
                <td><%= item.quantity %></td>
                <td>$<%= (item.product.price * item.quantity).toFixed(2) %></td>
              </tr>
              <% }) %>
            </tbody>
          </table>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <div class="card-body">
              <h2 class="font-weight-bold mb-3">Summary</h2>
              <p class="mb-2">Subtotal: $<%= cart.subtotal.toFixed(2) %></p>
              <p class="mb-2">Tax: $<%= cart.tax.toFixed(2) %></p>
              <p class="mb-2">Shipping: $<%= cart.shipping.toFixed(2) %></p>
              <h4>Total: $<%= cart.total.toFixed(2) %></h4>
              <a href="/checkout" class="btn btn-primary mt-3">Checkout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
        <main class="px-3">

             <h1>Shopping Cart</h1>
                <p class="lead"> Welcome to Shopping Cart! <br> Jump right in and explore our many products. <br>
                    Feel free to add some of your own and comment on others!</p>
                <a  href="/products" class="btn btn-sm btn-secondary font-weight-bold  bg-black ">View
                    Products</a>
           
        </main>

        <footer class="mt-auto text-white-50">
            <p>All Right Reserved &copy; 2023</p>
        </footer>


    </div>


    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
        integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
        crossorigin="anonymous"></script>
</body>

</html>
