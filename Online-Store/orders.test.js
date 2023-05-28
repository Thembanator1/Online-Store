// Import the necessary functions and modules for testing
import firebase from 'firebase';
import {
  openTable,
  fetchData,
} from './path/to/your/code';

// Mock Firebase functions and objects
jest.mock('firebase', () => {
  const originalFirebase = jest.requireActual('firebase');
  return {
    ...originalFirebase,
    initializeApp: jest.fn(),
    storage: jest.fn(() => ({
      ref: jest.fn(() => ({
        child: jest.fn(() => ({
          getDownloadURL: jest.fn(() => Promise.resolve('mocked-image-url')),
        })),
      })),
    })),
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        orderByChild: jest.fn(() => ({
          equalTo: jest.fn(() => ({
            once: jest.fn(() => ({
              val: jest.fn(() => ({
                /* Mocked data from the database */
              })),
            })),
          })),
        })),
      })),
    })),
  };
});

describe('Unit tests', () => {
  afterEach(() => {
    // Clear mocks
    jest.clearAllMocks();
  });

  describe('openTable', () => {
    test('should display the selected tab content and set the button to active', () => {
      // Mock the DOM elements
      document.body.innerHTML = `
        <div id="table1" class="tabcontent"></div>
        <div id="table2" class="tabcontent" style="display: none;"></div>
        <button id="tabButton1" class="tablinks" onclick="openTable(event, 'table1')">Table 1</button>
        <button id="tabButton2" class="tablinks" onclick="openTable(event, 'table2')">Table 2</button>
      `;

      // Call the openTable function
      const event = {
        currentTarget: document.getElementById('tabButton2'),
      };
      openTable(event, 'table2');

      // Expect the selected tab content to be displayed and the button to have the active class
      expect(document.getElementById('table2').style.display).toBe('block');
      expect(event.currentTarget.className).toContain('active');
    });
  });

  describe('fetchData', () => {
    test('should fetch data from the database and display products', async () => {
      // Mock the DOM elements and localStorage
      document.body.innerHTML = `
        <table id="table1"></table>
      `;
      global.localStorage = {
        getItem: jest.fn(() => 'yeses'),
        setItem: jest.fn(),
      };

      // Call the fetchData function
      await fetchData();

      // Expect the database functions to be called with the correct parameters
      expect(firebase.initializeApp).toHaveBeenCalled();
      expect(firebase.database().ref().orderByChild().equalTo().once).toHaveBeenCalled();

      // Expect the product elements to be created and displayed
      const table1 = document.getElementById('table1');
      expect(table1.querySelectorAll('caption').length).toBeGreaterThan(0);
      expect(table1.querySelectorAll('tr').length).toBeGreaterThan(0);
    });

    test('should display an alert if no products are found', async () => {
      // Mock the DOM elements and localStorage
      document.body.innerHTML = `
        <table id="table1"></table>
      `;
      global.localStorage = {
        getItem: jest.fn(() => 'yeses'),
        setItem: jest.fn(),
      };

      // Mock the database response to return null
      firebase.database().ref().orderByChild().equalTo().once.mockResolvedValueOnce({ val: () => null });

      // Call the fetchData function
      await fetchData();

      // Expect the alert to be displayed
      expect(window.alert).toHaveBeenCalledWith('No products in store found');
    });
  });
});
