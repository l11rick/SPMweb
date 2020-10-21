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
            <p font-family:verdana">Customer Name: ${doc.data().customerName}</p>
            <p font-family:verdana">Date: ${doc.data().Date}</p>
            <p font-family:verdana">Time: ${doc.data().Time}</p>
            <p font-family:verdana">Phone Number: ${doc.data().phoneNumber}</p>
            <p font-family:verdana">Home Address: ${doc.data().homeAddress}</p>
            <p font-family:verdana">Message: ${doc.data().Message}</p>
            
            <button type="button" onclick = "delete();">Delete</button> 
        </div>
        `)
    });
});






