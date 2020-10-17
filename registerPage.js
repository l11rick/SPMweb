const db = firebase.firestore();

function register() {
    Email = document.getElementById("email_register").value;
    Password = document.getElementById("password_register").value;
    if ((Email != '') & (Password != '')) {
        firebase.auth().createUserWithEmailAndPassword(Email, Password)
            .then(function() {
                alert("register successful")
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode + errorMessage)
            });
    } else {
        alert("cant be empty")
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            db.collection("users").doc(user.uid).set({
                    email: Email,
                    extra: document.getElementById("extra_register").value,
                    homeAddress: document.getElementById("address_register").value,
                    name: document.getElementById("name_register").value,
                    password: Password,
                    phone: document.getElementById("phone_register").value
                })
                .then(function() {
                    console.log("Document successfully written!");
                    window.location.href = 'mainPage.html'
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });

            db.collection("users").get().then(snapshot => {
                console.log(snapshot.docs)
            })


            window.location.href = 'mainPage.html'

        } else {}
    });
}