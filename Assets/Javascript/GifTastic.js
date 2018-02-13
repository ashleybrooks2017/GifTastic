let animals= ["Dog", "Cat", "Dog",
            "Rat", "Puppy", "Rat", "Hedgehog", "snake", "shark", "bird", "rabbit", "worm", "lion"
            ];

function renderButtons() {
  $("#animals-btns").empty();
  for (var index = 0; index < animals.length; index++) {
    var btn = $("<button>");
    btn.addClass("animal btn btn-outline-dark");
    btn.attr("animal-name", animals[index]);
    btn.text(animals[index]);
    $("#animals-btns").append(btn);
  }
}

renderButtons();

$(document).on("click", "button" , function () {
    let animal = $(this).attr("animal-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=BU0mcjNLbJ2kvni75AwjeVS583I4vAde&limit=12";

$.ajax({
    url: queryURL,
    method: "GET"
})
.done(function (response) {
    $("#gifs-here").empty();
    let results = response.data;
    for (var index = 0; index < results.length; index++) {
        let gifDiv = $("<div class='item'>");
        let animalImage = $("<img>");

animalImage.attr({"src": results[index].images.fixed_height.url,
                "data-still": results[index].images.fixed_height_still.url,
                "data-animate": results[index].images.fixed_height.url
              });

gifDiv.prepend(animalImage);
$("#gifs-here").prepend(gifDiv);

animalImage.on("click", function () {
    let state = $(this).attr('data-state');

    if (state === 'still') {
        let newSrc = $(this).attr('data-animate');
        $(this).attr('src', newSrc);
        $(this).attr('data-state', 'animate');
    }
    else {
        let newSrc = $(this).attr('data-still');
        $(this).attr('src', newSrc);
        $(this).attr('data-state', 'still');
        }
      });
    }
  });
});

$("#add-animal").on("click", function(event) {
  event.preventDefault();

  var animal = $("#animal-input").val().trim();
  animals.push(animal);
  renderButtons();
  $('#animal-input').val("");
});