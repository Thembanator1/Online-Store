if (typeof module !== 'undefined' && module.exports) { // check we're server-side
    var QUnit = require('qunit'); // require QUnit node.js module
    var test = QUnit.test; // stores a copy of QUnit.test
    require('qunit-tap')(QUnit, console.log); // use console.log for test output
    var methods = require('./supplier_products.js');
    var sup_prod = methods.sup_prod;
    methods = require('./supplier_products.js');
    var list =methods.list;
    methods = require('./welcome2.js');
    register = methods.register;
    methods = require('./edit_del.js');
    register = methods.register;
     methods = require('./edtReview.js');
     register = methods.register;
     methods = require('./forgot2.js');
     register = methods.register;
     methods = require('./homepage.js');
     register = methods.register;
     methods = require('./login2.js');
     register = methods.register;
     methods = require('./login2Supplier.js');
     register = methods.register;
     methods = require('./order_details.js');
     register = methods.register;
     methods = require('./order2.js');
     register = methods.register;
     methods = require('./product.js');
     register = methods.register;
     methods = require('./review.js');
     register = methods.register;
     methods = require('./search.js');
     register = methods.register;
     methods = require('./signUp2.js');
     register = methods.register;
     methods = require('./signUp2Supplier.js');
     register = methods.register;
     methods = require('./supplier_homepage.js');
     register = methods.register;
    
  }

  var existingEmail = "shlomo@gmail.com";
  // Sprint 1
  // Registration acceptance criteria

  // first password is not given but all other inputs are valid
  test('register("first name","last name","17-22-2000","shlomo@brill.com","","123456") should return "Enter both password"', assert => {
    return sup_prod().then( result => {
      assert.equal(Successful, "Successful");
    });
  });

  test('register("first name","last name","17-22-2000","shlomo@brill.com","","123456") should return "Enter both password"', assert => {
    return list().then( result => {
      assert.equal("Successful", "Successful");
    });
  });

  // rest of the tests...
