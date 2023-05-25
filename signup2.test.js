// Import the necessary functions and modules for testing
import firebase from 'firebase';
import {
  saveMessages,
} from './path/to/your/code';

// Mock Firebase functions and objects
jest.mock('firebase', () => {
  const originalFirebase = jest.requireActual('firebase');
  return {
    ...originalFirebase,
    initializeApp: jest.fn(),
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        push: jest.fn(() => ({
          set: jest.fn(),
        })),
        once: jest.fn(() => ({
          val: jest.fn(() => ({
            /* Mocked data from the database */
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

  describe('saveMessages', () => {
    test('should save user data to the database and redirect to login page', async () => {
      // Mock the localStorage
      global.localStorage = {
        setItem: jest.fn(),
      };

      // Call the saveMessages function
      const name = 'John';
      const email = 'john@example.com';
      const surname = 'Doe';
      const password = 'password123';
      await saveMessages(name, email, surname, password);

      // Expect the database functions to be called with the correct parameters
      expect(firebase.initializeApp).toHaveBeenCalled();
      expect(firebase.database().ref().push().set).toHaveBeenCalledWith({
        name,
        email,
        surname,
        password,
      });

      // Expect the redirect to the login page
      expect(window.location.assign).toHaveBeenCalledWith('login.html');
    });

    test('should display an alert if the user already exists', async () => {
      // Mock the localStorage
      global.localStorage = {
        setItem: jest.fn(),
      };

      // Mock the database response to find a user with the same email
      firebase.database().ref().once.mockResolvedValueOnce({
        val: () => ({
          /* Mocked user data */
        }),
      });

      // Call the saveMessages function
      const name = 'John';
      const email = 'john@example.com';
      const surname = 'Doe';
      const password = 'password123';
      await saveMessages(name, email, surname, password);

      // Expect an alert to be displayed
      expect(window.alert).toHaveBeenCalledWith('User Already Exists');
      // Expect no data to be saved to the database
      expect(firebase.database().ref().push().set).not.toHaveBeenCalled();
    });
  });
});
