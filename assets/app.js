





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
    localStorage.setItem("profileKey", id);
    window.open('/Users/pooja/Desktop/Home%20Work%20Assignments/My-Personal-Assistant/mainpage.html');

    $("#contactForm")[0].reset();
});


var background = {}
  
background.initializr = function (){
  
  var $this = this;
   

 
  //option
  $this.id = "background_css3";
  $this.style = {bubbles_color:"#fff",stroke_width:0, stroke_color :"black"};
  $this.bubbles_number = 30;
  $this.speed = [1500,8000]; //milliseconds
  $this.max_bubbles_height = $this.height;
  $this.shape = false // 1 : circle | 2 : triangle | 3 : rect | false :random
  
  if($("#"+$this.id).lenght > 0){
    $("#"+$this.id).remove();
  }
  $this.object = $("<div style='z-inde:-1;margin:0;padding:0; overflow:hidden;position:absolute;bottom:0' id='"+$this.id+"'> </div>'").appendTo("body");
  
  $this.ww = $(window).width()
  $this.wh = $(window).height()
  $this.width = $this.object.width($this.ww);
  $this.height = $this.object.height($this.wh);
  
  
  $("body").prepend("<style>.shape_background {transform-origin:center; width:80px; height:80px; background: "+$this.style.bubbles_color+"; position: absolute}</style>");
  
  
  for (i = 0; i < $this.bubbles_number; i++) {
      $this.generate_bubbles()
  }
  
}





 background.generate_bubbles = function() {
   var $this = this;
   var base = $("<div class='shape_background'></div>");
   var shape_type = $this.shape ? $this.shape : Math.floor($this.rn(1,3));
   if(shape_type == 1) {
     var bolla = base.css({borderRadius: "50%"})
   }else if (shape_type == 2){
     var bolla = base.css({width:0, height:0, "border-style":"solid","border-width":"0 40px 69.3px 40px","border-color":"transparent transparent "+$this.style.bubbles_color+" transparent", background:"transparent"}); 
   }else{
     var bolla = base; 
   }    
   var rn_size = $this.rn(.8,1.2);
   bolla.css({"transform":"scale("+rn_size+") rotate("+$this.rn(-360,360)+"deg)", top:$this.wh+100, left:$this.rn(-60, $this.ww+60)});        
   bolla.appendTo($this.object);
   bolla.transit({top: $this.rn($this.wh/2,$this.wh/2-60), "transform":"scale("+rn_size+") rotate("+$this.rn(-360,360)+"deg)", opacity: 0},$this.rn($this.speed[0],$this.speed[1]), function(){
     $(this).remove();
     $this.generate_bubbles();
   })
     
  }


background.rn = function(from, to, arr) {
if(arr){
        return Math.random() * (to - from + 1) + from;
}else{
  return Math.floor(Math.random() * (to - from + 1) + from);
}
  }
background.initializr()