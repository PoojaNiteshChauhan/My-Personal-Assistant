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




var interest = "obama"

var today = moment();

getProfileInfo();

function getProfileInfo() {
    let key = localStorage.getItem('profileKey');
    PARef.once("value", function(snapshot) {
        data = snapshot.val();
        let currentProfile = data[key];
        console.log(currentProfile);
        
        let profileName = currentProfile.profilename;
        let zipCode = currentProfile.zip;
        welcomeandshowWeather(profileName,zipCode); 
        showNewsFeed(currentProfile.newsFeed[0],currentProfile.newsFeed[0],currentProfile.newsFeed[0])

        // do some stuff once
      });

}

function welcomeandshowWeather(name,zip)
{
    var zipCode = zip;
    var weatherURL = "http://api.apixu.com/v1/current.json?key=ba7146ae0968498ab5b210703192706&q="+zipCode;
    $.ajax({
        url: weatherURL,
        method: "GET"
        }).then(function (weather) {
        console.log(weather.current);
        $("#Weather").append("<h1> Welcome  " + name)
        $("#Weather").append("<h1> Your Current Temperature is " + weather.current.feelslike_f + " °F ")

        })



}



function showNewsFeed(newsFeed0,newsFeed1,newsFeed2){
    var newURL = "https://newsapi.org/v2/everything?q=" + newsFeed0 + "&from=" + moment() + "&to=" + moment() + "&pageSize=5&apiKey=c9e89d507443488db8362699ff4e48d0"

    $.ajax({
    url: newURL,
    method: "GET"
    }).then(function (news1) {
    console.log(news1);
    
    $("#News").append(
        '<tr scope="row">'
        + '<td>' + news1.articles[0].title + '</td>'
        + '<td> <a href="' + news1.articles[0].url +  '" target="_blank">' 
        + '<img src =' + news1.articles[0].urlToImage +' ></td>'
        + '</tr>')
    $("#News").append(
        '<tr scope="row">'
        + '<td>' + news1.articles[1].title + '</td>'
        + '<td> <a href="' + news1.articles[1].url +  '" target="_blank">' 
        + '<img src =' + news1.articles[1].urlToImage +' ></td>'
        + '</tr>')
    $("#News").append(
        '<tr scope="row">'
        + '<td>' + news1.articles[2].title + '</td>'
        + '<td> <a href="' + news1.articles[2].url +  '" target="_blank">' 
        + '<img src =' + news1.articles[2].urlToImage +' ></td>'
        + '</tr>')

    
    })
    

    var newURL2 = "https://newsapi.org/v2/everything?q=" + newsFeed1 + "&from=" + moment() + "&to=" + moment() + "&pageSize=5&apiKey=c9e89d507443488db8362699ff4e48d0"

    $.ajax({
    url: newURL2,
    method: "GET"
    }).then(function (news2) {
    console.log(news2);
    
    })

    var newURL3 = "https://newsapi.org/v2/everything?q=" + newsFeed2 + "&from=" + moment() + "&to=" + moment() + "&pageSize=5&apiKey=c9e89d507443488db8362699ff4e48d0"

    $.ajax({
    url: newURL3,
    method: "GET"
    }).then(function (news3) {
    console.log(news3);
    
    })


}







var cuisines = "India" + "restaurant"
var foodURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+cuisines+"in"+"20904"+"&key=AIzaSyBv-S9r5Yymml6GvQDXOIs9_siaOR5b0j0"

$.ajax({
url: foodURL,
method: "GET"
}).then(function (food) {
console.log(food);

})
