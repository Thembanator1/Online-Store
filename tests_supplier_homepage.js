describe('myVar', function() {
    it('should be empty', function() {
      const myVar = '';
      assert.equal(myVar, '');
    });
  });
  
  
/*
  Test: for html and css

Verify that the h1 element text is displayed correctly
Check that all of the list items are present on the page under the navigation bar
Check that the text input boxes and the textarea are present on the page
Check that the upload image button is present on the page
Verify that the logo image is displayed on the page
*/

/*

Test:
 // test code to assert that image is uploaded and saved to Firebase function testUploadImage() { // Get the values of the input fields var productName = 'Test Product'; var productDescription = 'This is a test product'; var productPrice = '100'; var productQuantity = 'Test Category'; var link = 'none';

// Create a dummy file var file = {name: 'dummy_file.jpg'};

// Mock the uploadImage() function uploadImage = jest.fn(() => { link = 'http://www.example.com/dummy_file.jpg'; saveMessages(productName , productDescription , productPrice , productQuantity, link); });

uploadImage();

// Assert that the dummy file is uploaded successfully expect(uploadImage).toHaveBeenCalled(); expect(link).toBe('http://www.example.com/dummy_file.jpg');

// Assert that the data saved to Firebase is correct contactFormDB.on('value', (snapshot) => { const data = snapshot.val();

expect(data.name).toBe(productName);
expect(data.description).toBe(productDescription);
expect(data.price).toBe(productPrice);
expect(data.category).toBe(productQuantity);
expect(data.picture).toBe(link);
expect(data.suppliers_email).toBe('supplier@gmail.com');
}); }

*/

/*

*************** I DONT KNOW HOW TO IMPLEMENT THIS TESTS************
*/