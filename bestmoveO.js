function getBestMoveO(board) {
  // Immediate return for empty board (optimal first move)
  if (board.every(cell => cell === null)) return 4;

  let bestScore = -Infinity;
  let bestMove = -1;
  let alpha = -Infinity;
  let beta = Infinity;

  // Check moves in optimal order: center, corners, edges
  const moveOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];

  for (const i of moveOrder) {
      if (board[i] === null) {
          board[i] = 'O';
          const score = minimaxO(board, 0, false, alpha, beta);
          board[i] = null;

          if (score > bestScore) {
              bestScore = score;
              bestMove = i;
              if (score === 10) break; // Found immediate win
          }

          alpha = Math.max(alpha, score);
          if (beta <= alpha) break; // Prune remaining branches
      }
  }
  return bestMove;
}

function minimaxO(board, depth, isMaximizing, alpha, beta) {
  if (checkWinO(board, 'O')) return 10 - depth;
  if (checkWinO(board, 'X')) return depth - 10;
  if (isDrawO(board)) return 0;

  const moveOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];

  if (isMaximizing) {
      let bestScore = -Infinity;
      for (const i of moveOrder) {
          if (board[i] === null) {
              board[i] = 'O';
              const score = minimaxO(board, depth + 1, false, alpha, beta);
              board[i] = null;
              
              bestScore = Math.max(bestScore, score);
              alpha = Math.max(alpha, bestScore);
              if (beta <= alpha || bestScore === 10) break; // Prune or early win exit
          }
      }
      return bestScore;
  } else {
      let bestScore = Infinity;
      for (const i of moveOrder) {
          if (board[i] === null) {
              board[i] = 'X';
              const score = minimaxO(board, depth + 1, true, alpha, beta);
              board[i] = null;
              
              bestScore = Math.min(bestScore, score);
              beta = Math.min(beta, bestScore);
              if (beta <= alpha || bestScore === -10) break; // Prune or early loss exit
          }
      }
      return bestScore;
  }
}

// Optimized win check for O AI version
function checkWinO(board, player) {
  const winPatterns = [0b111000000, 0b000111000, 0b000000111, // Rows
                      0b100100100, 0b010010010, 0b001001001, // Columns
                      0b100010001, 0b001010100]; // Diagonals
                      
  const playerMask = board.reduce((mask, cell, idx) => 
      cell === player ? mask | (1 << (8 - idx)) : mask, 0);

  return winPatterns.some(pattern => (playerMask & pattern) === pattern);
}

// Optimized draw check for O AI version
function isDrawO(board) {
  return !board.includes(null) && 
          !checkWinO(board, 'X') && 
          !checkWinO(board, 'O');
}

  document.querySelector(".me").onclick = function playerFirst() {
    document.querySelector(".turndecide").style.display = "none";
     player="player"
     boxes.forEach((box)=>{
        box.disabled=false;})
   
  };

    
let moveCount = 0;
  boxes.forEach((box)=>{
    box.addEventListener("click" ,() =>{
        if (player==="player") {
        box.innerText = 'X';
        box.disabled=true;
        board[box.className.charAt(3)]='X';
        setTimeout(() => {
           moveO(board);
        }, 1000);
        if (moveCount===4) {
          alert.innerText = savageTaunts[Math.floor(Math.random() * 100) + 1]}
        }
        if (isDrawO(board)===true) {
          boxes.forEach((box)=>{
            box.disabled=true;}) 
            alert.innerText = drawTaunts[Math.floor(Math.random() * 100) + 1];
            resultArea.style.display = "block";
        result.innerText = "It Was a Draw!!"
          }
          if (checkWinO(board,'O')===true) {
    
            boxes.forEach((box)=>{
              box.disabled=true;});
              alert.innerText = victoryTaunts[Math.floor(Math.random() * 100) + 1];
              resultArea.style.display = "block";
              result.innerText = "Marina wins!!"
            };
            if (checkWinO(board,'X')===true) {
              boxes.forEach((box)=>{
                box.disabled=true;});
                alert.innerText = saltyCongrats[Math.floor(Math.random() * 100) + 1];
                resultArea.style.display = "block";
              result.innerText = "congrats you win!!";
             
              
              }
              
    })
  });

  function moveO(board) {
    if (moveCount<8) {
    boxes[getBestMoveO(board)].innerText= 'O';
    board[getBestMoveO(board)]='O';
    box.disabled=true;
    moveCount=moveCount+2;
    if (checkWinO(board,'O')===true) {
    
      boxes.forEach((box)=>{
        box.disabled=true;});
        alert.innerText = victoryTaunts[Math.floor(Math.random() * 100) + 1];
        resultArea.style.display = "block";
        result.innerText = "Marina wins!!"
        console.log("secound");
        
      };
      if (checkWinO(board,'X')===true) {
        boxes.forEach((box)=>{
          box.disabled=true;});
          alert.innerText = saltyCongrats[Math.floor(Math.random() * 100) + 1];
          resultArea.style.display = "block";
        result.innerText = "congrats you win!!";
        }

        
   
      }
    
    }
