import React, { useState, useEffect } from 'react';
import './App.css';

// Navbar component
const Navbar = ({ handleTextSearch, handlePlaceSearch, handleWarrantySearch, handleAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    place: '',
    warranty: ''
  });

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleAddButtonClick = () => {
    handleAddProduct(newProduct);
    setNewProduct({
      name: '',
      type: '',
      place: '',
      warranty: ''
    });
  };

  return (
    <nav className="navbar">
      <div className="search-bar">
        <input type="text" placeholder="Search by text" onChange={handleTextSearch} />
        {/* <button onClick={handleTextSearch}>Search</button> */}
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search by place" onChange={handlePlaceSearch} />
        {/* <button onClick={handlePlaceSearch}>Search</button> */}
      </div>
      <div className="search-bar">
        <input type="number" placeholder="Search by warranty" onChange={handleWarrantySearch} />
        {/* <button onClick={handleWarrantySearch}>Search</button> */}
      </div>
      <div className="add-product">
        <input
          type="text"
          placeholder="Product name"
          name="name"
          value={newProduct.name}
          onChange={handleProductChange}
        />
        <input
          type="text"
          placeholder="Product type"
          name="type"
          value={newProduct.type}
          onChange={handleProductChange}
        />
        <input
          type="text"
          placeholder="Product place"
          name="place"
          value={newProduct.place}
          onChange={handleProductChange}
        />
        <input
          type="number"
          placeholder="Product warranty"
          name="warranty"
          value={newProduct.warranty}
          onChange={handleProductChange}
        />
        <button onClick={handleAddButtonClick}>Add Product</button>
      </div>
    </nav>
  );
};

// Product card component
const ProductCard = ({ name, type, place, warranty }) => {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Type: {type}</p>
      <p>Place: {place}</p>
      <p>Warranty: {warranty}</p>
    </div>
  );
};

// App component
const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products
  useEffect(() => {
    fetch('http://localhost:8080/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  // Handle text search
  const handleTextSearch = (event) => {
    const searchText = event.target.value;

    fetch(`http://localhost:8080/search/text?text=${searchText}`)
      .then((response) => response.json())
      .then((data) => setFilteredProducts(data))
      .catch((error) => console.log(error));
  };

  // Handle place search
  const handlePlaceSearch = (event) => {
    const place = event.target.value;

    fetch(`http://localhost:8080/search/place?place=${place}`)
      .then((response) => response.json())
      .then((data) => setFilteredProducts(data))
      .catch((error) => console.log(error));
  };

  // Handle warranty search
  const handleWarrantySearch = (event) => {
    const warranty = event.target.value;

    fetch(`http://localhost:8080/search/warranty?warranty=${warranty}`)
      .then((response) => response.json())
      .then((data) => setFilteredProducts(data))
      .catch((error) => console.log(error));
  };

  const handleAddProduct = (newProduct) => {
    fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
      .then(() => {
        // After successfully adding the product, fetch all products again to update the list
        fetch('http://localhost:8080/')
          .then((response) => response.json())
          .then((data) => setProducts(data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Navbar
        handleTextSearch={handleTextSearch}
        handlePlaceSearch={handlePlaceSearch}
        handleWarrantySearch={handleWarrantySearch}
        handleAddProduct={handleAddProduct}
      />
      <div className="product-list">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              type={product.type}
              place={product.place}
              warranty={product.warranty}
            />
          ))
          : products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              type={product.type}
              place={product.place}
              warranty={product.warranty}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
