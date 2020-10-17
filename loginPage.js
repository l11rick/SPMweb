function login() {
    Email = document.getElementById("email_login").value;
    Password = document.getElementById("password_login").value;
    firebase.auth().signInWithEmailAndPassword(Email, Password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + errorMessage)
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            alert("logged in")
            if (user.uid == "VWuLgEckkfTHRgXtvzSF6W4rgoG2") {
                window.location.href = "AdminmainPage.html"
            } else {
                window.location.href = 'mainPage.html'
            }
            // ...
        } else {
            // User is signed out.
        }
    });
}