
import { next } from './login2.js';
// const { next } = require('./login2.js');

// create a mock Firebase database


describe('next', () => {
  test('should return "User does not exist" if no matching record is found', () => {
    const email = 'foo@example.com';
    const password = 'bar';
    const result = next(email, password);
    expect(result).toBe('User does not exist');
  },{
    testEnvironment: 'jsdom'
  });

  test('should return "Invalid password" if email matches but password is incorrect', () => {
    const email = 'mm@gmail.com';
    const password = 'wrongpassword';
    // mock the snapshot to contain a user with matching email but incorrect password
   
    
    const result = next(email, password);
    expect(result).toBe('Invalid password');
  },{
    testEnvironment: 'jsdom'
  });

  test('should return "successful" if email and password match a record in the database', () => {
    const email = 'mm@gmail.com';
    const password = '12345678';
    // mock the snapshot to contain a user with matching email and password
    
    const result = next(email, password);
    expect(result).toBe('successful');
  });
},{
  testEnvironment: 'jsdom'
});
 
 


