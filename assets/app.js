var interest = "obama"
var today = moment();
var newURL = "https://newsapi.org/v2/everything?q=" + interest + "&from=" + today + "&to=" + today + "&pageSize=5&apiKey=c9e89d507443488db8362699ff4e48d0"

  $.ajax({
    url: newURL,
    method: "GET"
  }).then(function (news) {
    console.log(news);
 
  })


  var zipCode = "20904";
  var weatherURL = "http://api.apixu.com/v1/current.json?key=ba7146ae0968498ab5b210703192706&q="+zipCode;

  
  $.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function (weather) {
    console.log(weather);
 
  })

  
  
  var cuisines = "India" + "restaurant"
  var foodURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+cuisines+"in"+zipCode+"&key=AIzaSyBv-S9r5Yymml6GvQDXOIs9_siaOR5b0j0"
  
  


  
  $.ajax({
    url: foodURL,
    method: "GET"
  }).then(function (food) {
    console.log(food);
 
  })


