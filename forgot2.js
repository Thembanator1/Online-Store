function sendMail() {
    var params = {
      name: document.getElementById("Email").value,
      email: "testbranch99@gmail.com",
      message: "qwertyuiop",
    };
  
    const serviceID = "service_sbika46";
    const templateID = "template_i4ejolg";
  
      emailjs.send(serviceID, templateID, params)
      .then(res=>{
          document.getElementById("Username").value = "";
          console.log(res);
          alert("Your message sent successfully!!")
  
      })
      .catch(err=>console.log(err));
  
  }