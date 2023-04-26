const firebase = require("firebase/app");
require("firebase/database");

const firebaseConfig = {
  // copy your firebase config information
  apiKey: "AIzaSyBiQr7aHxdYxk8sCkHxMebkVyBEgXCnknU",
  authDomain: "online-store-b90ca.firebaseapp.com",
  databaseURL: "https://online-store-b90ca-default-rtdb.firebaseio.com",
  projectId: "online-store-b90ca",
  storageBucket: "online-store-b90ca.appspot.com",
  messagingSenderId: "160581372978",
  appId: "1:160581372978:web:b507d7ac5f14c9e4ff002b",
  measurementId: "G-PH4QNCPP2J"
};

firebase.initializeApp(firebaseConfig);

describe("contact form authentication", () => {
  let contactFormDB;
  let mockSnapshot;

  beforeEach(() => {
    contactFormDB = firebase.database().ref("Users");
    mockSnapshot = {
      forEach: jest.fn(),
    };
    jest.spyOn(contactFormDB, "on").mockImplementation((event, callback) => {
      callback(mockSnapshot);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should set state to 'successful' and redirect to homepage when email and password match a record in the database", () => {
    const email = "user@example.com";
    const password = "password123";
    const childSnapshot = {
      val: jest.fn(() => ({
        email,
        password,
      })),
    };
    mockSnapshot.forEach.mockImplementationOnce((callback) =>
      callback(childSnapshot)
    );

    document.body.innerHTML = `
      <input id="Email" type="text" value="${email}" />
      <input id="Password" type="password" value="${password}" />
    `;

    const validateButton = document.createElement("button");
    validateButton.id = "validate";
    document.body.appendChild(validateButton);

    localStorage.setItem = jest.fn();

    window.location.assign = jest.fn();

    validateButton.click();

    expect(mockSnapshot.forEach).toHaveBeenCalledTimes(1);
    expect(childSnapshot.val).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user_email",
      email
    );
    expect(window.location.assign).toHaveBeenCalledWith("homepage.html");
  });

  test("should set state to 'Invalid password' when email matches but password does not", () => {
    const email = "user@example.com";
    const password = "password123";
    const childSnapshot = {
      val: jest.fn(() => ({
        email,
        password: "wrongpassword",
      })),
    };
    mockSnapshot.forEach.mockImplementationOnce((callback) =>
      callback(childSnapshot)
    );

    document.body.innerHTML = `
      <input id="Email" type="text" value="${email}" />
      <input id="Password" type="password" value="${password}" />
    `;

    const validateButton = document.createElement("button");
    validateButton.id = "validate";
    document.body.appendChild(validateButton);

    window.alert = jest.fn();

    validateButton.click();

    expect(mockSnapshot.forEach).toHaveBeenCalledTimes(1);
    expect(childSnapshot.val).toHaveBeenCalledTimes(2);
    expect(window.alert).toHaveBeenCalledWith("Invalid password");
  });

  test("should show an alert with 'User does not exist' when email and password do not match any record in the database", () => {
    const email = "user@example.com";
    const password = "password123";
    mockSnapshot.forEach.mockImplementationOnce((callback) => callback());

    document.body.innerHTML = `
      <input id="Email" type="text" value="${email}" />
      <input id="Password" type="password" value="${password}" />
    `;

    const validateButton = document.createElement("button");
    validateButton.id = "validate";
    document.body.appendChild(validateButton);

    window.alert = jest.fn();

    validateButton.click();

    expect(mockSnapshot.forEach).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith("User does not exist");
  });
});
