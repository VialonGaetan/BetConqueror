import $ from 'jquery/dist/jquery.min';

const buildEndGame = () => {
  $('#app').empty();
  $('#app').append('<div id="end-game-container" class="end-game-container"> </div>');
  $("#end-game-container").append('<lottie-player src = "assets/popper.json"  background = "transparent"  speed = "1" autoplay loop  style = "width: 400px; height: 400px; position:absolute; bottom:10%; left:25%; transform:rotate(90deg);" />');
  $("#end-game-container").append('<lottie-player src = "assets/popper.json"  background = "transparent"  speed = "1" autoplay loop  style = "width: 400px; height: 400px; position:absolute; bottom:10%; right:25%;transform:rotate(0deg);" />');
  $("#end-game-container").append('<lottie-player src = "assets/winner.json"  background = "transparent"  speed = "1" autoplay loop  style = "width: 400px; height: 400px; position:absolute; bottom:0; right:40%; left:40%;" />');
  // $("#end-game-container").append('<lottie-player src = "assets/loser.json"  background = "transparent"  speed = "1" autoplay loop  style = "width: 300px; height: 400px; position:absolute; top:0; right:40%; transform:rotate(180deg);" />');
  // $("#end-game-container").append('<lottie-player src = "assets/loser.json"  background = "transparent"  speed = "1" autoplay loop  style = "width: 300px; height: 400px; position:absolute; top:30%; left:0; transform:rotate(90deg);" />');
  // $("#end-game-container").append('<lottie-player src = "assets/loser.json"  background = "transparent"  speed = "1" autoplay loop  style = "width: 300px; height: 400px; position:absolute; top:30%; right:0; transform:rotate(270deg);" />');
  $("#end-game-container").append('<iframe src="https://giphy.com/embed/eJ4j2VnYOZU8qJU3Py" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen style="position:absolute; top:35%; right:-5%; transform:rotate(270deg);"></iframe>');
  $("#end-game-container").append('<iframe src="https://giphy.com/embed/eJ4j2VnYOZU8qJU3Py" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen style="position:absolute; top:0%; left:38%; transform:rotate(180deg);"></iframe>');
  $("#end-game-container").append('<iframe src="https://giphy.com/embed/eJ4j2VnYOZU8qJU3Py" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen style="position:absolute; top:35%; left:-5%; transform:rotate(90deg);"></iframe>');
};

export default buildEndGame;
