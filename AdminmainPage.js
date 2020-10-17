function signOutAdminMainPage() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert("signout")
        window.location.href = 'loginPage.html'

    }).catch(function(error) {
        // An error happened.
        alert("cannot signout")
    });
}