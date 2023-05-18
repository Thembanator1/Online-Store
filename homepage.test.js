// Import the necessary dependencies
const firebase = require('firebase'); // Assuming you have installed the firebase package
const { JSDOM } = require('jsdom');
const { fireEvent } = require('@testing-library/dom');
const { beforeEach, describe, test, expect } = require('@jest/globals');

// Mock Firebase methods
jest.mock('firebase', () => ({
  initializeApp: jest.fn(),
  database: jest.fn(() => ({
    ref: jest.fn(() => ({
      once: jest.fn(callback => callback({ val: () => mockProducts })),
      on: jest.fn(callback => callback({ val: () => mockProducts })),
    })),
  })),
}));

// Mock the localStorage object
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// Mock the window object
global.window = new JSDOM().window;

// Mock the DOM elements
document.body.innerHTML = `
  <div class="image-container"></div>
  <div class="slider">
    <div class="slide active"></div>
    <div class="slide-icon active"></div>
    <button class="next-btn"></button>
    <button class="prev-btn"></button>
  </div>
  <div class="vertical-container"></div>
  <table id="cart-table"></table>
  <div id="cart-total"></div>
`;

// Mock the products data
const mockProducts = {
  product1: {
    picture: 'product1.jpg',
    name: 'Product 1',
    price: 10,
  },
  product2: {
    picture: 'product2.jpg',
    name: 'Product 2',
    price: 20,
  },
};

// Import the JavaScript code to test
const {
  updateCartTotal,
  removeProduct,
} = require('./your-js-code.js');

describe('updateCartTotal', () => {
  test('should calculate and update the cart total', () => {
    // Set up the initial cart table with some rows
    document.getElementById('cart-table').innerHTML = `
      <tr>
        <td></td>
        <td></td>
        <td>10</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td>20</td>
      </tr>
    `;

    // Call the function to test
    updateCartTotal();

    // Check if the cart total is updated correctly
    const cartTotalElement = document.getElementById('cart-total');
    expect(cartTotalElement.textContent).toBe('Total: 30');
  });
});

describe('removeProduct', () => {
  beforeEach(() => {
    // Set up the initial cart table with a row and add event listener to the remove button
    document.getElementById('cart-table').innerHTML = `
      <tr>
        <td></td>
        <td></td>
        <td>10</td>
        <td><button class="remove-product">Remove</button></td>
      </tr>
    `;
    document.querySelector('.remove-product').addEventListener('click', removeProduct);
  });

  test('should remove the product row from the cart table', () => {
    // Click the remove button
    fireEvent.click(document.querySelector('.remove-product'));

    // Check if the product row is removed
    const cartTable = document.getElementById('cart-table');
    expect(cartTable.rows.length).toBe(1); // Expect only the table header row to remain
  });

});
   
