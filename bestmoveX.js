const board = [
    null, null, null,
    null, null, null,
    null, null, null]

    let player = "ai";
    
  function getBestMove(board) {
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
        board[i] = 'X';
        const score = minimax(board, 0, false, alpha, beta);
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
  
  function minimax(board, depth, isMaximizing, alpha, beta) {
    if (checkWin(board, 'X')) return 10 - depth;
    if (checkWin(board, 'O')) return depth - 10;
    if (isDraw(board)) return 0;
  
    const moveOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7]; // Same optimal move order
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const i of moveOrder) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, false, alpha, beta);
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
          board[i] = 'O';
          const score = minimax(board, depth + 1, true, alpha, beta);
          board[i] = null;
          
          bestScore = Math.min(bestScore, score);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha || bestScore === -10) break; // Prune or early loss exit
        }
      }
      return bestScore;
    }
  }
  
  // Optimized win check
  function checkWin(board, player) {
    const winPatterns = [0b111000000, 0b000111000, 0b000000111, // Rows
                         0b100100100, 0b010010010, 0b001001001, // Columns
                         0b100010001, 0b001010100]; // Diagonals
                         
    const playerMask = board.reduce((mask, cell, idx) => 
      cell === player ? mask | (1 << (8 - idx)) : mask, 0);
  
    return winPatterns.some(pattern => (playerMask & pattern) === pattern);
  }
  
  // Optimized draw check
  function isDraw(board) {
    return !board.includes(null) && 
           !checkWin(board, 'X') && 
           !checkWin(board, 'O');
  }
  
 boxes.forEach((box)=>{
    box.disabled=true;}) 
  document.querySelector(".computer").onclick = function compFirst() {
    boxes.forEach((box)=>{
        box.disabled=false;}) 
    document.querySelector(".turndecide").style.display = "none"
    moveX(board);
  };
  
        
  
  boxes.forEach((box)=>{
    box.addEventListener("click" ,() =>{
        if (player==="ai") {
        box.innerText = 'O';
        box.disabled=true;
        board[box.className.charAt(3)]='O'
        moveCount++;
        setTimeout(() => {
            moveX(board); 
         }, 1000);
        

                }
        })
    })
  
  function moveX(board) {
    boxes[getBestMove(board)].innerText= 'X';
    board[getBestMove(board)]='X';
    box.disabled=true;
    moveCount++;
    console.log(moveCount);

    if (moveCount===5) {
      alert.innerText = savageTaunts[Math.floor(Math.random() * 100) + 1]
    }

    if (checkWin(board,'X')===true) {
      boxes.forEach((box)=>{
        box.disabled=true;});
        alert.innerText = victoryTaunts[Math.floor(Math.random() * 100) + 1];
        resultArea.style.display = "block";
        result.innerText = "Marina wins!!";
      }
    if (isDraw(board)===true) {
      boxes.forEach((box)=>{
        box.disabled=true;}) ;
        alert.innerText = drawTaunts[Math.floor(Math.random() * 100) + 1];
        resultArea.style.display = "block";
        result.innerText = "It was a draw!!"
      }
      if (checkWin(board,'O')===true) {
        boxes.forEach((box)=>{
          box.disabled=true;}); 
          alert.innerText = saltyCongrats[Math.floor(Math.random() * 100) + 1];
          resultArea.style.display = "block";
        result.innerText = "congrats you win!!"
        }
    
  }
  
  