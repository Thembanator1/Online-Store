// Initialize Firebase
var firebaseConfig = {
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
  
  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
  var contactFormDB = firebase.database().ref("Shipping");

  const months = 
  ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];
  
  var email;
  var myLineChart;

  var xsales;
  var ysales;
  var total;
  var units;
  var purchase;

  function start(){
    email = localStorage.getItem('supplier_email');
    //email = "irene@gmail.com";
    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();

    monthDays(month+1, year);

    document.getElementById("headd").innerHTML = "Details of the Sales made in "+months[month]+" "+year;
    
    getDetails(email, month+1, year);
  }

  function select(){
    var d = document.getElementById("date").value;
    if (d==""){
      alert("Enter Date");
      return;
    }
    const date = new Date(d);

    var year = date.getFullYear();
    var month = date.getMonth();

    document.getElementById("headd").innerHTML = "Details of the Sales made in "+months[month]+" "+year;

    monthDays(month+1, year);
    myLineChart.destroy();
    getDetails(email, month+1, year);
  }

  function monthDays(month, year){
    const days = new Date(year, month, 0).getDate();

    xsales = [];
    ysales = [];
    total = 0;
    units = 0;
    purchase = 0;

    for (let i=0; i<Math.ceil(days/7); i++){
      xsales[i] = "week " + parseInt(i+1);
      ysales[i] = 0;
    }
  }

  function getDetails(email, month, year){
    console.log("getDetails");
    // attach a listener to the Firebase database reference
    // this listener will be called whenever the value of the database changes
    // it will iterate over all the child snapshots of the "onlinestore" node
    contactFormDB.orderByChild("supplier_email").equalTo(email).once("value", function (snapshot) {        
        snapshot.forEach(function(childSnapshot) {
            var date = childSnapshot.val().date;
            var dat = date.split("/");

            if (month==parseInt(dat[1]) && year==parseInt(dat[2])){
              ysales[Math.floor((parseInt(dat[0])-1)/7)] = ysales[Math.floor((parseInt(dat[0])-1)/7)] + parseInt(childSnapshot.val().price);
              total = total + parseInt(childSnapshot.val().price);
              units = units + parseInt(childSnapshot.val().quantity);
              purchase = purchase + 1;
            }
        });
        makeLine(month, year);

        document.getElementById("total").innerHTML = total + " rands";
        document.getElementById("units").innerHTML = units + " units";
        document.getElementById("purchase").innerHTML = purchase + " orders";
    });
  } 

  function makeLine(month, year){
    myLineChart = new Chart("myLine", {
      type: "bar",
      data: {
        labels: xsales,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.5)",
          data: ysales
        }]
      },
      options: {
        legend: {display: false},
        scales: {
          yAxes: [{ticks: {min: 0}, 
          scaleLabel:{display: true, labelString:"Revenue", fontSize: 15}}],
          xAxes: [{scaleLabel:{display: true, labelString:"Weeks", fontSize: 15}}],
        },
        title: {
          display: true,
          text: "Sales in "+months[month-1]+" "+year,
          fontSize: 30
        }
      }
    });
  }





