// Initialize Firebase
var config = {
	apiKey: "AIzaSyASp6PyVpnCB8OEGFualB5X4R1hvpODyBM",
	authDomain: "train-scheduler-efd8e.firebaseapp.com",
	databaseURL: "https://train-scheduler-efd8e.firebaseio.com",
	storageBucket: "train-scheduler-efd8e.appspot.com",
	messagingSenderId: "580217922699"
};

firebase.initializeApp(config);
// End Initialize Firebase

// Create a variable to reference the database
var database = firebase.database();

100     // Initial Values 
var trainName = ""; 
var destination = ""; 
var firstTrain = 0; //time
var frequency = 0; 

//------------

$("#add-train").on("click", function() { 
	// prevents submit button from refreshing the page 
	event.preventDefault(); 


	trainName = $("#train-name-input").val().trim(); 
	destination = $("#destination-input").val().trim(); 
	firstTrain = $("#first-train-input").val().trim(); 
	frequency = $("#frequency-input").val().trim(); 



	// database.ref().push({ 
	// trainName : trainName, 
	// destination: destination, 
	// firstTrain: firstTrain, 
	// frequency: frequency 
	// }); 

	//clear form
	$("#train-name-input").val(""); 
	$("#destination-input").val(""); 
	$("#first-train-input").val(""); 
	$("#frequency-input").val(""); 

}); //end on click