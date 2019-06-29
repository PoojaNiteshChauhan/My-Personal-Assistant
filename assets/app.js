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
    
    PARef.push().set({
    profilename: name,
    zip: zip,
    cuisines1: favorite[0],
    cuisines2: favorite[1],
    cuisines3: favorite[2],
    newsFeed0: newFeedArry[0],
    newsFeed1: newFeedArry[1],
    newsFeed2: newFeedArry[2],

    })
    $("#contactForm")[0].reset();
});


