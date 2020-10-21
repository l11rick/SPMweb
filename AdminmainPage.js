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
const db = firebase.firestore();

db.collection("bookings").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        $('#view_area').append(`
        <div class = "card"> 
            <p font-family:verdana">${doc.data().customerName}</p>
            <p font-family:verdana">${doc.data().Date}</p>
            <p font-family:verdana">${doc.data().Time}</p>
            <p font-family:verdana">${doc.data().Service}</p>
            <button type="button" onclick = "delete();">Delete</button> 
        </div>
        `)
    });
});






