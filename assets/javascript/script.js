
$(document).ready(function () {

    
        $('.listing-block').slimScroll({
            height: '500px'
        });


var breweries=[];
        infowindow = new google.maps.InfoWindow();
        var mainloc = {lat:38.889931, lng: -77.009003};
    
        var map = new google.maps.Map(document.getElementById('gmap'), {zoom: 12, center: mainloc}); 

$.validator.setDefaults( {
    submitHandler: function () {
    
        map = new google.maps.Map(document.getElementById('gmap'), {zoom: 12, center: mainloc}); 
        $("#zip-error").empty();    
        var zip;
        var radius=0;
        var rating=0;
        breweries=[];
        
        
        console.log("Search clicked")
        zip = $("#zip").val().trim();
        radius =$("#radius").val().trim();
        rating =$("#rating").val().trim();
    
        console.log("zip is " + zip)
        console.log("radius is " + radius)
    
      
    
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + zip + "&term=breweries&categories=breweries&radius=" + radius +"&rating=4&limit=50&sort_by=distance",
            "method": "GET",
            "headers": {
              "Authorization": "Bearer 8D_mZteQabQeW-jEZAK4kU4o9h7PhhECcqPsritDt99eippSSN851BkePtOuCLpVShTshzeKUUKDiHj51cX4vJMN0YZY_tPNJVTsapTBgoWt0dErzhHH1psW0FYKXXYx",
            
            }
          }
    
    
          $.ajax(settings).then(function(response) {
            
          
          for (i =0; i < response.businesses.length; i++) {
           if (response.businesses[i].rating >= rating) {
            breweries.push(response.businesses[i]);
           }
    
          } 
          
          if (breweries.length===0) {
          $("#modal-error").modal("toggle");
          }
         
          console.log(breweries);
          createBrews(breweries);
          
    
         
        
          
            
          });
    

          
          
    
    function createBrews(breweries) {
        
        
         for (i=0; i < breweries.length; i++) {
    
            
            
    
            var loc = {lat: breweries[i].coordinates.latitude, lng: breweries[i].coordinates.longitude}
            var brewName = breweries[i].name;
            var brewAdd = breweries[i].location.address1 + " " + breweries[i].location.city + " " + breweries[i].location.zip_code;
            var brewPh = breweries[i].display_phone;
            var brewRat = breweries[i].rating;
            var label = (i +1).toString();
            createMarker(loc, brewName, brewAdd, brewPh, label, brewRat);
    
    
    
            function createMarker(loc,brewName,brewAdd, brewPh, label, brewRat) { 
            
            var marker = new google.maps.Marker({position: loc, label: label , map: map});
       
           
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent("<strong>"+ brewName +"</strong>"+ "<br/>" + brewAdd + "<br/>" + brewPh + "<br/>" + "Rated " + brewRat + " Stars");
                
                infowindow.open(map, this);
              });
         }
     
        }
     }





    }
    } );
    
    $( document ).ready( function () {
    $( "#search-form" ).validate( {
    rules: {
    zip: "required"
    },
    messages: {
    zip: "Please enter a zip code",
    },
    errorElement: "em",
    errorPlacement: function ( error, element ) {
    // Add the `help-block` class to the error element
    error.addClass( "help-block" );
    
    error.insertAfter( "#message");
    
    },
    highlight: function ( element, errorClass, validClass ) {
    $( element ).parents( ".zip-code" ).addClass( "has-error" ).removeClass( "has-success" );
    },
    unhighlight: function (element, errorClass, validClass) {
    $( element ).parents( ".zip-code" ).addClass( "has-success" ).removeClass( "has-error" );
    }
    } );
    
    
    } );

});