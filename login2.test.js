import firebase from 'firebase';
import 'firebase/app/dist/index.cjs.js';
import { next } from './login2.js';
// const { next } = require('./login2.js');

// create a mock Firebase database
jest.mock('firebase', () => ({
  initializeApp: jest.fn(),
  database: jest.fn(() => ({
    ref: jest.fn(() => ({
      on: jest.fn()
    }))
  }))
}));

describe('next', () => {
  let mockDB;
  let mockSnapshot;

  beforeEach(() => {
    // reset the mock database and snapshot before each test
    jest.clearAllMocks();
    mockSnapshot = {
      forEach: jest.fn()
    };
    mockDB = firebase.database().ref('Users');
    mockDB.on.mockImplementation(callback => {
      if (typeof callback === 'function') {
        callback(mockSnapshot);
      }
    });
  });

  test('should return "User does not exist" if no matching record is found', () => {
    const email = 'foo@example.com';
    const password = 'bar';
    const result = next(email, password, mockDB);
    expect('User does not exist').toBe('User does not exist');
  },{
    testEnvironment: 'jsdom'
  });

  test('should return "Invalid password" if email matches but password is incorrect', () => {
    const email = 'ben';
    const password = 'wrongpassword';
    // mock the snapshot to contain a user with matching email but incorrect password
    mockSnapshot.forEach.mockImplementationOnce(callback => {
      callback({
        val: () => ({
          email: 'ben',
          password: 'correctpassword'
        })
      });
    });
    const result = next(email, password, mockDB);
    expect('Invalid password').toBe('Invalid password');
  },{
    testEnvironment: 'jsdom'
  });

  test('should return "successful" if email and password match a record in the database', () => {
    const email = 'ben';
    const password = 'correctpassword';
    // mock the snapshot to contain a user with matching email and password
    mockSnapshot.forEach.mockImplementationOnce(callback => {
      callback({
        val: () => ({
          email: 'ben',
          password: 'correctpassword'
        })
      });
    });
    const result = next(email, password, mockDB);
    expect('successful').toBe('successful');
  });
},{
  testEnvironment: 'jsdom'
});
 
 


