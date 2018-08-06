var config = {
    apiKey: "AIzaSyDvlUY0bIXPlFWQgquMhAiIsKMjIlq_DiY",
    authDomain: "train-hw-3c996.firebaseapp.com",
    databaseURL: "https://train-hw-3c996.firebaseio.com",
    projectId: "train-hw-3c996",
    storageBucket: "train-hw-3c996.appspot.com",
    messagingSenderId: "1036968058356"
  };

firebase.initializeApp(config);

var database = firebase.database();


$("#add-train-btn").on("click", function(event) {

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var firstTrainTime = $("#first-train-input").val().trim();

    console.log("1) First Train Arrival = " + firstTrainTime);

    
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log("First Train Time converted: " + firstTrainTimeConverted);

    
    var currentTime = moment();
    console.log("2) CURRENT TIME = " + moment(currentTime).format("HH:mm"));

    
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("3) DIFFERENCE IN TIME = " + diffTime);

    
    var tRemainder = diffTime % frequency;
    console.log("4) REMAINDER = " + tRemainder);

    
    var minutesTillTrain = frequency - tRemainder;
    console.log("5) *MINUTES TILL TRAIN* = " + minutesTillTrain);

    
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("6) *ARRIVAL TIME* = " + moment(nextTrain).format("HH:mm"));

    
    var trainSchedule = {
        name: trainName,
        role: destination,
        start: firstTrainTime,
        rate: frequency,
        next: moment(nextTrain).format("HH:mm"),
        min: minutesTillTrain
    };

    
    database.ref().push(trainSchedule);

    
    console.log(trainSchedule.name);
    console.log(trainSchedule.role);
    console.log(trainSchedule.start);
    console.log(trainSchedule.rate);
    console.log(trainSchedule.next);
    console.log(trainSchedule.min);

    
    alert("Train Schedule successfully added");

    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot);
    console.log(childSnapshot.val());

    
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var firstTrainTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;
    var nextTrain = childSnapshot.val().next;
    var minutesTillTrain = childSnapshot.val().min;

    
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(firstTrainTime);
    console.log(nextTrain);
    console.log(minutesTillTrain);


    
    $("#train-table").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain);

});
