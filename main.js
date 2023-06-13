const firebaseConfig = {
  apiKey: "AIzaSyCZRbkOxaj7UWzZ1F7MP7l4bxvPp-AoZqM",
  authDomain: "fir-form-27491.firebaseapp.com",
  databaseURL: "https://fir-form-27491-default-rtdb.firebaseio.com",
  projectId: "fir-form-27491",
  storageBucket: "fir-form-27491.appspot.com",
  messagingSenderId: "864174603223",
  appId: "1:864174603223:web:b207bc95d949101ad62992",
  measurementId: "G-Y56SSGC70B",
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
// Reference messages collection
var firebaseRef = firebase.database().ref("firebaseForm");

// Listen for form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();
  // Get value of input and textarea
  var name = getInputVal("name");
  var message = getInputVal("message");
  var email = getInputVal("email");

  // Save message
  saveMessage(name, message, email);

  // Show alert
  document.querySelector(".alert").style.display = "block";

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Clear form after submit the form
  document.getElementById("contactForm").reset();
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, message, email) {
  var newMessageRef = firebaseRef.push();
  newMessageRef.set({
    name: name,
    message: message,
    email: email,
  });
}

firebase
  .database()
  .ref("firebaseForm")
  .on("value", function (snapshot) {
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = null;

    let i = 1;

    //
    var path = snapshot.ref.toString(); // Get the full path as a string
    console.log("Path:", path);
    //
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      var childKey = childSnapshot.key;

      // for table
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerText = i++;
      let td2 = document.createElement("td");
      td2.innerText = childData.name;
      let td3 = document.createElement("td");
      td3.innerText = childData.message;

      let td4 = document.createElement("td");
      td4.innerText = childData.email;
      let td5 = document.createElement("td");
      td5.innerText = "Update";
      td5.style.background = "orange";
      td5.style.color = "black";
      td5.style.cursor = "pointer";

      let td6 = document.createElement("td");
      td6.innerText = "Delete";

      td6.addEventListener("click", () => {
        removeData(childKey);
      });
      td6.style.background = "red";
      td6.style.color = "black";
      td6.style.cursor = "pointer";

      tr.append(td1, td2, td4, td3, td5, td6);

      tbody.append(tr);
    });
  });

function removeData(dataKey) {
  document.querySelector(".alert1").style.display = "block";

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert1").style.display = "none";
  }, 3000);
  var dataRef = database.ref(`/firebaseForm/${dataKey}`);
  dataRef
    .remove()
    .then(function () {
      console.log("Data deleted successfully!");
    })
    .catch(function (error) {
      console.error("Error deleting data: ", error);
    });
}
