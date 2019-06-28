
$(document).ready(function () {

    
       


var breweries=[];
        infowindow = new google.maps.InfoWindow();
        var mainloc = {lat:38.889931, lng: -77.009003};
    
        var map = new google.maps.Map(document.getElementById('gmap'), {zoom: 12, center: mainloc}); 


    
        map = new google.maps.Map(document.getElementById('gmap'), {zoom: 11, center: mainloc}); 
        $("#zip-error").empty();    
        var zip=20009;
        var radius=15000;
        var rating=0;
        breweries=[];
        
        
       /* console.log("Search clicked")
        zip = $("#zip").val().trim();
        radius =$("#radius").val().trim();
        rating =$("#rating").val().trim();
    
        console.log("zip is " + zip)
        console.log("radius is " + radius)*/
    
      
    
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + zip + "&term=breweries&categories=breweries&rating=4&sort_by=distance&limit=50",
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
    
/*dom push*/
       var mediaDiv=$("<div>");
       mediaDiv.addClass("media");
       mediaDiv.attr("id", "media"+i);

       $("#results").append(mediaDiv);


       var mediaImg=$("<img>");
       mediaImg.attr("id", "media-image"+i);
       mediaImg.attr("src", breweries[i].image_url);
       mediaImg.addClass("d-flex align-self-start");

       $("#media"+i).append(mediaImg);

       var bodyDiv=$("<div>");
       bodyDiv.addClass("media-body pl-3");
       bodyDiv.attr("id", "media-body"+i);

       $("#media"+i).append(bodyDiv);

       var bodyHeadDiv=$("<div>");
       bodyHeadDiv.addClass("stats");
       bodyHeadDiv.attr("id", "head-div"+i);

       

      

       var barNameSpan=$("<span>");
       barNameSpan.attr("id", "bar-name"+i);
       barNameSpan.text((i+1) + ". " + breweries[i].name);

      

       var barAdd1Div=$("<div>");
       barAdd1Div.attr("id", "bar-add-1"+i)
       barAdd1Div.addClass("address");
       barAdd1Div.text(breweries[i].location.display_address[0]);

       var barAdd2Div=$("<div>");
       barAdd2Div.attr("id", "bar-add-2" +i);
       barAdd2Div.addClass('address');
       barAdd2Div.text(breweries[i].location.city + " " + breweries[i].location.zip_code);

       var barPhDiv = $("<div>");
       barPhDiv.attr("id", "bar-phone"+i);
       barPhDiv.addClass("address");
       barPhDiv.text(breweries[i].display_phone);

        var barRatSpan=$("<span>");
       barRatSpan.attr("id", "bar-rat"+i);
       barRatSpan.text("Rating ");
       barRatSpan.addClass("rat-span");
       

       var barYelpWeb =$("<div>");
       barYelpWeb.attr("id", "yelp-web"+i);
       barYelpWeb.addClass("yelplink");
       barYelpWeb.html('<a target="_blank" href="' + breweries[i].url + '"> Yelp Website</a>');

        var barStarOuterDiv = $("<div>");
        barStarOuterDiv.addClass("stars-outer");
        barStarOuterDiv.attr("id", "stars-outer"+i);

        var barRat = parseInt(breweries[i].rating);
        var ratPerc = ((barRat/5) * 100);

        var barStarInnerDiv = $("<div>");
        barStarInnerDiv.addClass("stars-inner");
        barStarInnerDiv.attr("id", "stars-inner"+i);
        barStarInnerDiv.css("width", ratPerc+"%");







       $("#media-body"+i).append(bodyHeadDiv, barAdd1Div, barAdd2Div, barPhDiv, barYelpWeb);
       $("#head-div"+i).append(barNameSpan);
       $("#yelp-web"+i).append(barRatSpan);
       $("#bar-rat"+i).append(barStarOuterDiv);
       $("#stars-outer"+i).append(barStarInnerDiv);


            
            
    /* GoogleMap section*/
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





    
   
    
    

});