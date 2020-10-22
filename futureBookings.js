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

let today = new Date().toISOString().slice(0, 10)
console.log(today)

db.collection("bookings").where("Date", ">", today).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        $('#view_area').append(`
        <div class = "card"> 
        <p font-family:verdana">Name: -- ${doc.data().customerName}</p>
        <p font-family:verdana">Home Address: -- ${doc.data().homeAddress}</p>
        <p font-family:verdana">Phone Number: -- ${doc.data().phoneNumber}</p>
        <p font-family:verdana">Date: -- ${doc.data().Date}</p>
        <p font-family:verdana">Time: -- ${doc.data().Time}</p>
        <p font-family:verdana">Service: -- ${doc.data().Service}</p>
        <p font-family:verdana">${doc.data().Message}</p>
        <button type="button" onclick = "deleteBookingAdmin('${doc.data().customerName}','${doc.data().Date}','${doc.data().Time}');">Cancel</button>               
        </div>
        `)
    });
});

function deleteBookingAdmin(name,date,time) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            db.collection("bookings").doc(name+"_"+date+"_"+time).delete().then(function() {
                console.log("Document successfully deleted!");
                location.reload()
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        } else {
            alert("not logged in")
            window.location.href = 'loginPage.html'
        }
    });
}




