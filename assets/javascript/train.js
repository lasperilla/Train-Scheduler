// Initialize Firebase
var config = {
    apiKey: "AIzaSyASp6PyVpnCB8OEGFualB5X4R1hvpODyBM",
    authDomain: "train-scheduler-efd8e.firebaseapp.com",
    databaseURL: "https://train-scheduler-efd8e.firebaseio.com",
    storageBucket: "train-scheduler-efd8e.appspot.com",
    messagingSenderId: "580217922699"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values 
var trainName = "";
var destination = "";
var firstTrain = "00:00"; 
var frequency = 0;

//------------ add a train. grabs values from form on clicking add train button

$("#add-train").on("click", function(event) {
    // Don't refresh the page! 
    event.preventDefault();


    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // push to firebase
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

    // clear form
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

}); // end on click

//-------------update page when child is added to firebase via add train 

database.ref().on("child_added", function(childSnapshot) {

    var displayTrainName = childSnapshot.val().trainName;
    var displayDestination = childSnapshot.val().destination;
    var displayFirstTrain = childSnapshot.val().firstTrain;
    var displayFrequency = childSnapshot.val().frequency;
    var displayNextArrival = 0;
    var displayTimeToNext = 0;

    // First Train (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(displayFirstTrain, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % displayFrequency;

    // Minute Until Train
    var tMinutesTillTrain = displayFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    displayNextArrival = moment(nextTrain).format("hh:mm");
    displayTimeToNext = tMinutesTillTrain;

    // push to table
    $("#current-schedule").append(
        "<tr>" +
        "<td>" + displayTrainName + "</td>" +
        "<td>" + displayDestination + "</td>" +
        "<td>" + displayFirstTrain + "</td>" +
        "<td>" + displayFrequency + "</td>+" +
        "<td>" + displayNextArrival + "</td>" +
        "<td>" + displayTimeToNext + "</td>" +
        "</tr>"
    );
// Handle the errors 
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});