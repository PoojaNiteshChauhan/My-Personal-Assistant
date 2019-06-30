





var firebaseConfig = {
    apiKey: "AIzaSyA-NazdWi3OJCu7kEEDvfWunqnjHf9nxZQ",
    authDomain: "my-personal-assistant-9bc3f.firebaseapp.com",
    databaseURL: "https://my-personal-assistant-9bc3f.firebaseio.com",
    projectId: "my-personal-assistant-9bc3f",
    storageBucket: "",
    messagingSenderId: "601556373821",
    appId: "1:601556373821:web:bb428ce5994e08ee"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var PARef = firebase.database().ref('profiledetail');


$('.chekbox').on('change', function() {
  
    if($('.chekbox:checked').length > 3) {
        this.checked = false;
    }
 });
$("#submit").on("click", function (event) {
    event.preventDefault();

    var name = $("#name").val()
    var zip = $("#zip").val()
    var favorite = [];
            $.each($("input[name='food']:checked"), function(){            
                favorite.push($(this).val());
            });
    var newsFeed = $("#newsFeed").val()
    var newFeedArry= newsFeed.split(',');
    console.log(name,zip,favorite,newsFeed);
    
    let id = PARef.push().key;

    PARef.child(id).set({
    profilename: name,
    zip: zip,
    cuisines: favorite,
    newsFeed: newFeedArry

    });
    console.log(id);
    //localStorage.setItem("profileKey", id);
    //window.open('/Users/pooja/Desktop/Home%20Work%20Assignments/My-Personal-Assistant/mainpage.html');

    $("#contactForm")[0].reset();
});