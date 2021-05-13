const $board = $('#board');
const ROWS = 10;
const COLS = 10;

var user = localStorage.getItem("user");
var acc = document.getElementById("acc");

var img1 = localStorage.getItem("img1");
var img2 = localStorage.getItem("img2");
var img3 = localStorage.getItem("img3");
var img4 = localStorage.getItem("img4");

var images = {
    1: img1,
    2: img2,
    3: img3,
    4: img4
}

var colors = {
  1: "rgb(52, 152, 219)",
  2: "rgb(0, 155, 0)",
  3: "rgb(128, 0, 128)",
  4: "rgb(128, 128, 128)"
}

if(user == "" || user == null){
  acc.innerText = "ACCOUNT";
  var storePage = document.getElementById('storePage');
  storePage.remove();
}else{
  acc.innerText = user;
}

function createBoard(rows, cols) {
  $board.empty();
  for (let i = 0; i < rows; i++) {
    const $row = $('<div>').addClass('row');
    for (let j = 0; j < cols; j++) {
      const $col = $('<div>')
        .addClass('col hidden')
        .attr('data-row', i)
        .attr('data-col', j);
      if (Math.random() < 0.1) {
        $col.addClass('mine');
      }
      $row.append($col);
    }
    $board.append($row);
    for(let i in images){
      if(images[i] !== null){
        $('.hidden').css('background', colors[i]);
      }
    }
  }
}

// TIMER

var time = 0;
var status = 0;
var timerLabel = document.getElementById('timerLabel');

function reset(){
  status = 1;
   //time = 0;
}

function timer(){
  if(status == 0){
        setTimeout(function(){
            time++;
            var min = Math.floor(time/100/60);
            var sec = Math.floor(time/100);
            var mSec = time % 100;

            if (min < 10) min = "0" + min;
            if (sec >= 60) sec = sec % 60;
            if (sec < 10) sec = "0" + sec;
            if (mSec < 10) mSec = "0" + mSec;

            timerLabel.innerHTML = min + ":" + sec + ":" + mSec;

            timer();
            getScores(min, sec, mSec);
          }, 10);
    }
}

// TIMER

function getScores(min, sec, mSec){
  if(status == 1 && (mSec > 1 || sec > 0)){
    time = 0;
    var realScore = `${min}:${sec}:${mSec}`;
    var userScore = {
      username: user,
      score: realScore,
      best: ((min+sec+mSec) / 2)
    }
    var configRealScore = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userScore)
  }
    localStorage.setItem("score", realScore);
    fetch('/scr', configRealScore);
  }
}

function restart() {
  createBoard(ROWS, COLS);
  theme();
}

function gameOver(isWin) {
  let message = null;
  let icon = null;
  if (isWin) {
    message = 'YOU WON!';
    icon = 'fa fa-flag';
    reset();
  } else {
    message = 'YOU LOST!';
    icon = 'fa fa-bomb';
    reset();
  }
  $('.col.mine').append(
    $('<i>').addClass(icon)
  );
  $('.col:not(.mine)')
    .html(function() {
      const $cell = $(this);
      const count = getMineCount(
        $cell.data('row'),
        $cell.data('col'),
      );
      return count === 0 ? '' : count;
    })
  $('.col.hidden').removeClass('hidden');
  $('.mine').css('background', 'black');
  setTimeout(function() {
    alert(message);
    restart();
    window.top.location = window.top.location;
    timerLabel.innerText = "00:00:00";
  }, 1000);
}

function reveal(oi, oj) {
  const seen = {};

  function helper(i, j) {
    $('.col').css('background', '#eee');
    for(let k in images){
      if(images[k] !== null){
        $('.col.hidden').css('background', colors[k]);
      }
    }

    if (i >= ROWS || j >= COLS || i < 0 || j < 0) return;
    const key = `${i} ${j}`
    if (seen[key]) return;
    const $cell =
      $(`.col.hidden[data-row=${i}][data-col=${j}]`);
    const mineCount = getMineCount(i, j);
    if (
      !$cell.hasClass('hidden') ||
      $cell.hasClass('mine')
    ) {
      return;
    }
    $cell.removeClass('hidden');

    if (mineCount) {
      $cell.text(mineCount);
      return;
    }
    
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        helper(i + di, j + dj);
      }      
    }
  }

  helper(oi, oj);
}

function getMineCount(i, j) {
  let count = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      const ni = i + di;
      const nj = j + dj;
      if (ni >= ROWS || nj >= COLS || nj < 0 || ni < 0) continue;
      const $cell =
        $(`.col.hidden[data-row=${ni}][data-col=${nj}]`);
      if ($cell.hasClass('mine')) count++;
    }      
  }
  return count;
}

$board.on('click', '.col.hidden', function() {
  const $cell = $(this);
  const row = $cell.data('row');
  const col = $cell.data('col');
  $('.col').css('background', '#eee');

  
  if ($cell.hasClass('mine')) {
    gameOver(false);
  } else {
    reveal(row, col);
    const isGameOver = $('.col.hidden').length === $('.col.mine').length
    if (isGameOver) gameOver(true);
  }
  timer();
})

restart();

function theme(){
for(let i in images){
  if(Object.entries(images) == null || acc.innerText == "ACCOUNT"){
      $('body').css('background-image', 'url("images/1.jpg")');
      $('#timerLabel').css('color', colors[i]);
      break;
  }
  if(images[i] !== null){
      $('body').css('background-image', 'url("images/' +i+ '.jpg")');
      $('#timerLabel').css('color', colors[i]);
      break;
  }
}
}
theme();
