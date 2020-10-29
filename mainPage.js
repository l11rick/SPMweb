function signOutMainPage() {
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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db.collection("bookings").where("UID", "==", user.uid).get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());
                $(`#view_area`).append(`
                    <div class = "card">
                    <p font-family:verdana">Name: -- ${doc.data().customerName}</p>
                    <p font-family:verdana">Home Address: -- ${doc.data().homeAddress}</p>
                    <p font-family:verdana">Phone Number: -- ${doc.data().phoneNumber}</p>
                    <p font-family:verdana">Date: -- ${doc.data().Date}</p>
                    <p font-family:verdana">Time: -- ${doc.data().Time}</p>
                    <p font-family:verdana">Service: -- ${doc.data().Service}</p>
                    <p font-family:verdana">${doc.data().Message}</p>
                    <button type="button" onclick = "deleteBooking('${doc.data().customerName}','${doc.data().Date}','${doc.data().Time}');">Cancel</button>               
                    </div>
                `)
                //renderbook(doc)


            });
        })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    };
})

function deleteBooking(name,date,time) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            db.collection("bookings").doc(name+"_"+date+"_"+time).delete().then(function() {
                console.log("Document successfully deleted!");
                sendEmail(name, date, time)
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

function sendEmail(name, date, time) {

    Email.send({
        Host: "smtp.gmail.com",
        Username : "xudongguan1127@gmail.com",
        Password : "971127Abc",
        To : 'swen90016tutors@groups.unimelb.edu.au',
        From : "xudongguan1127@gmail.com",
        Subject : "booking cancellation",
        Body : "Hi Admin, <br><br>This booking has been cancelled, here are the details" + "<br><br>\
        ---name: "+name+ "<br>\
        ---Date: "+date+ "<br>\
        ---Time: "+time+ "<br>\
        <br>This appointment has been removed from the booking list."
    }).then(function(response){
        if (response=='OK') {
            alert("mail sent");
        } else {
            alert("error");
        }
    }
    );
}