function register() {
    Email = document.getElementById("email_register").value;
    Password = document.getElementById("password_register").value;
    if ((Email != '') & (Password != '')) {
        firebase.auth().createUserWithEmailAndPassword(Email, Password)
            .then(function() {
                alert("register successful")
                window.location.href = 'mainPage.html'
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
}