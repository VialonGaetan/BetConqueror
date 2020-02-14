import $ from 'jquery/dist/jquery.min';

const buildEndGame = () => {
  $('#app').empty();
  $('#app').append('<div id="end-game-container" class="end-game-container"> </div>');
};

export default buildEndGame;
