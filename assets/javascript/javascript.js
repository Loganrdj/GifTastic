var api_key = "69AWaR8C4XriE7DTKgm66N7B9jCmhmkN";
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

$(".gifSearch").click(function(){
    queryterm = this.name;
    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${queryterm}&limit=10`;
    // console.log("hello")
    // console.log(this.name);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        for(let i = 0; i < response.data.length; i++){
            var tempGif = `<img src="${response.data[0].url}" alt="${response.data[0].title}">`
            $("#gifDiv").append(tempGif);
        }
    });
})



$("#submitButton").click(function(event){
    event.preventDefault();
    if($("#gifAddition").val() === ""){
        console.log("Please enter a valid search");
    } else {
        topics.push($("#gifAddition").val());
    }
    loadButtons();
});