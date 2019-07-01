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

var profile = [];
var currentProfileName;
var currentProfileZip;
var currentProfileNew;
var currentProfileFood;



var interest = "obama"

var today = moment();
getProfileInfo();

var myVar = setInterval(function () {
    $(document).ready(function () {
        console.log(profile.length);
        for (i = 0; i < profile.length; i++) {
            console.log(profile[i].profilename);
            $("#dialog").append('<input type="radio" value="' + profile[i].profilename + '">' + profile[i].profilename + '<br>');
        }
        $("#dialog").append('<button type="button" id= "select">Select</button>')

        $("#dialog").dialog();
        $('input[type=radio]').click(function () {
            console.log($(this).val());
            currentProfileName = $(this).val();
            var index = profile.map(function (e) { return e.profilename; }).indexOf(currentProfileName);//profile.indexOf(currentProfileName);
            console.log(index);
            currentProfileZip = profile[index].zip;
            currentProfileNew = profile[index].newFeed;
            currentProfileFood = profile[index].cuisines;


        });

        $('#select').click(function () {

            $("#dialog").dialog('close');
            welcomeandshowWeather(currentProfileName, currentProfileZip);
            showNewsFeed(currentProfileNew)
            showResturants(currentProfileFood, currentProfileZip)
        })
        clearInterval(myVar);
    });
}, 1500)




function getProfileInfo() {
    let key = 'LiYekocHBSH-aw8-LsS';
    PARef.on("child_added", function (snapshot) {
        profile.push({ profilename: snapshot.val().profilename, zip: snapshot.val().zip, newFeed: snapshot.val().newsFeed, cuisines: snapshot.val().cuisines });
        console.log(profile);
    });


}

function welcomeandshowWeather(name, zip) {
    var zipCode = zip;
    var weatherURL = "http://api.apixu.com/v1/current.json?key=ba7146ae0968498ab5b210703192706&q=" + zipCode;
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (weather) {
        //console.log(weather.current);
        var currentTime = moment(currentTime).format("HH:mm")
        console.log(currentTime)
        if (currentTime > "12:00" && currentTime < "16:00") {
            $("#Weather").append("<h1> Good Afternoon  " + name)

        } else if (currentTime > "16:00" && currentTime < "23:59") {
            $("#Weather").append("<h1> Good Evening  " + name)
        }
        else if (currentTime > "00:00" && currentTime < "11:59") {
            $("#Weather").append("<h1> Good Morning  " + name)
        }


        $("#Weather").append("<h3> Your Current Temperature is " + weather.current.feelslike_f + " °F ")
        if (weather.current.feelslike_f > 65) {
            if (currentTime > "10:00" && currentTime < "16:00") {
                $("#Weather").append('<h3 class="alert-danger" role="alert"> Feels Warm today, wear something light and don\'t forget your sunscreen</h2>')
            } else {
                $("#Weather").append('<h3 class="alert-danger" role="alert"> Feels Warm today, wear something light</h2>')
            }
        }
        else if (weather.current.feelslike_f > 40 && weather.current.feelslike_f <= 65) {
            $("#Weather").append('<h3> class=" alert-primary" role="alert"Its nice outside, wear some light </h2>"')
        }
        else if (weather.current.feelslike_f <= 40) {
            $("#Weather").append('<h3> class=" alert-dark" role="alert"Brr! Its Cold!! Wear a heavy Jacket and cover those ears</h2>"')
        }

    })
}



function showNewsFeed(newsFeed) {

    console.log(newsFeed)
    $("#News").append(
        '<thead scope = "row">'
        + '<th > News </th>'
        + '<th> Link </th>'
        + '</thead>'
    );
    for (i = 0; i < newsFeed.length; i++) {
        var newURL = "https://newsapi.org/v2/everything?q=" + newsFeed[i] + "&pageSize=3&apiKey=c9e89d507443488db8362699ff4e48d0"
        $.ajax({
            url: newURL,
            method: "GET"
        }).then(function (news1) {
            console.log(news1);


            for (i = 0; i < news1.articles.length; i++) {
                $("#News").append(
                    '<tr scope="row">'
                    + '<td>' + news1.articles[i].title + '</td>'
                    + '<td> <a href="' + news1.articles[i].url + '" target="_blank">'
                    + '<img src =' + news1.articles[i].urlToImage + ' ></td>'
                    + '</tr>')
            }
        })

    }
}








function showResturants(cuisines, zip) {
    console.log(cuisines, zip)
    $("#Eatout").append(
        '<thead scope = "row">'
        + '<th > Name </th>'
        + '<th > Address </th>'
        + '<th > Rating </th>'
        + '</thead> <br> <br>'
    );
    for (i = 0; i < cuisines.length; i++) {
        var foodURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + cuisines[i] + "+restaurants+in+" + zip + "&key=AIzaSyBv-S9r5Yymml6GvQDXOIs9_siaOR5b0j0"

        $.ajax({
            url: foodURL,
            method: "GET"
        }).then(function (food) {
            console.log(food);
            var length = food.results.length > 3 ? 3 : food.results.length;

            for (i = 0; i < length; i++) {

                $("#Eatout").append(
                    '<tr scope="row">'
                    + '<td>' + food.results[i].name + '</td>'
                    + '<td> ' + food.results[i].formatted_address + '</td>'
                    + '<td>' + food.results[i].rating + ' </td>'
                    + '<br></tr>')
            }
        }
        )
    }
}
