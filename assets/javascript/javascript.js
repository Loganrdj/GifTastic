const api_key = "69AWaR8C4XriE7DTKgm66N7B9jCmhmkN";
var queryterm = "";

var topics = ["Rick and Morty", "The Office", "Brooklyn Nine Nine", "White Collar"];

$(document).ready(loadButtons());

function loadButtons(){
    $("#buttonDiv").html("");
    for(let i = 0; i < topics.length; i++){
        // tempString = topics[i];
        var tempButton = `<button class=gifSearch name="${topics[i]}">${topics[i]}</button>`;
        $("#buttonDiv").append(tempButton);
    }    
}
// $("button").click(function(){
//     if(this != $("#submitButton")){
//         console.log(this);
//     }
// })

function searchGif(info){
    console.log("searchGif() is Running!")
    console.log(info)
    $("#gifDiv").html("");
    queryterm = info.name;
    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${queryterm}&limit=10`;
    // console.log("hello")
    // console.log(this.name);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for(let i = 0; i < response.data.length; i++){
            var tempGif = `<div>
            <img class=gif src="${response.data[i].images.fixed_height_still.url}" alt="${response.data[i].title}" longdesc="${response.data[i].images.fixed_height.url}"">
            <div>Rating: ${response.data[i].rating.toUpperCase()}</div>
            </div>`
            $("#gifDiv").append(tempGif);
        }
    });
}

$(document).on("click", ".gifSearch", function(){
    // console.log(this);
    console.log("Button clicked!")
    searchGif(this);
});

$("#submitButton").click(function(event){
    event.preventDefault();
    if($("#gifAddition").val() === ""){
        console.log("Please enter a valid search");
    } else {
        topics.push($("#gifAddition").val());
    }
    loadButtons();
});

$(document).on("mouseenter",".gif", function(){
    let tempSrc = $(this).attr("longdesc");
    $(this).attr("longdesc", $(this).attr("src"));
    $(this).attr("src", tempSrc);
})

$(document).on("mouseleave",".gif", function(){
    let tempSrc = $(this).attr("longdesc");
    $(this).attr("longdesc", $(this).attr("src"));
    $(this).attr("src", tempSrc);
})