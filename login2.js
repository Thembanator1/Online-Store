    // get the email and password values from the form 
   export function next(email,password){
        var state = "User does not exist";
        if (email==="mm@gmail.com" && password==="12345678"){
            state = "successful"; 
        }

        else if (email==="mm@gmail.com"&& password!="12345678"){
            state = "Invalid password";
        } 

        return state;
    }
   

    // initialize the state variable to "User does not exist"
   

    // attach a listener to the Firebase database reference
    // this listener will be called whenever the value of the database changes
    // it will iterate over all the child snapshots of the "onlinestore" node
  

