// Game variables 
let playerX, playerY;
let coinX, coinY;
let obstacleX, obstacleY
let obstacleSpeed = 2.5
let score = 0;
let hits = 0
let gameOver = false;

let collidedObstacle = false
let collected = false

function setup() {
  createCanvas(400, 400);
  initializeGame();
}

function initializeGame() {
  // Initialize player position (bottom center)
  playerX = width/2;
  playerY = height - 20;
  
  // Initialize coin position
  newCoin();
  
  // Initialize obstacle position
  obstacleX = 0;
  obstacleY = random(20, height-20);
}

function draw() {
  background(220);
  
  if (gameOver) {
    displayGameOver();
  } else {
    // Draw game elements
    drawPlayer();
    drawCoin();
    drawObstacle();
    
    // Handle movement
    movePlayer();
    moveObstacle();
    
    // Check for collisions
    checkCoinCollection();
    checkCollisions();
    
    // Display game stats
    displayStats();
  }
}

function drawPlayer() {
  fill(0, 0, 255);  // Blue player
  circle(playerX, playerY, 20);
}

function drawCoin() {
  fill(255, 255, 0);  // Yellow coin
  circle(coinX, coinY, 10);
}

function drawObstacle() {
  fill(255, 0, 0);  // Red obstacle
  rect(obstacleX, obstacleY, 20, 20);
}

// Basic left/right movement provided
function movePlayer() {
  // check bounds, if moving will exceed the frame
  if (keyIsDown(LEFT_ARROW)) {
    if (playerX - 5 >= 10) {
      playerX -= 5;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (playerX + 5 <= width-10) {
      playerX += 5;
    }
  }
  if (keyIsDown(UP_ARROW)) {
    if (playerY - 5 >= 10) {
      playerY -= 5
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (playerY - 5 <= height - 20) {
      playerY += 5
    }
  }
  
  // TODO: Add up/down movement
  // HINT: Use UP_ARROW and DOWN_ARROW keys
  // Movement should be 5 pixels per frame
  
  // TODO: Add boundary checking
  // HINT: Keep player within canvas bounds
  // Check against 0, width, and height
}

function moveObstacle() {
  // TODO: Move obstacle from left to right
  // HINT: Increase obstacleX by obstacleSpeed
  
  // TODO: Reset obstacle when it goes off screen
  // HINT: Check if obstacleX > width
  // Reset to left side and new random Y position

  obstacleX += obstacleSpeed

  if (obstacleX > width) {
    // reset obstacle
    obstacleX = 0
    // increment speed
    obstacleSpeed += 0.5
    // random height
    obstacleY = random(20, height-20)
  }
}

function checkCoinCollection() {
  // TODO: Check if player touches coin
  // HINT: Use dist(playerX, playerY, coinX, coinY)
  // If distance < 15:
  //   - Increase score
  //   - Create new coin
  //   - Increase obstacle speed slightly

  if (dist(playerX, playerY, coinX, coinY) < 15) {
    if (!collected) {
      collected = true
      score += 1
      obstacleSpeed += 0.5
      newCoin()
      collected = false
    }
  }
}

function checkCollisions() {
  // TODO: Check if player hits obstacle
  // HINT: Similar to coin collection
  // If hit (distance < 20):
  //   - Increase hits
  //   - Check for game over (hits >= 3)
  //   - Reset positions

  if (dist(obstacleX, obstacleY, playerX, playerY) < 20 && !collidedObstacle) {
    print("collided")
    collidedObstacle = true
    hits += 1
    
    
    obstacleX = 20
    obstacleY = random(20, height-20)

    if (hits >= 3) {
      // collidedObstacle = true
      print("game over!")
      displayGameOver()
      resetGame()
      // collidedObstacle = false
    }
    collidedObstacle = false
  }
}

function displayStats() {
  fill(0);
  textSize(16);
  text("Score: " + score, 10, 20);
  text("Hits: " + hits, 110, 20);
  text("Speed: " + obstacleSpeed, 210, 20);
  // TODO: Add display for hits and speed
}

function displayGameOver() {
  // TODO: Show game over screen
  // HINT: Use textAlign(CENTER, CENTER)
  // Show:
  //   - "Game Over" message
  //   - Final score
  //   - "Press R to Restart"
}

function newCoin() {
  // Generate random position for coin
  coinX = random(20, width-20);
  coinY = random(20, height-20);
}

function resetGame() {
  // TODO: Reset all game variables
  // HINT: Reset score, hits, speed
  // Set gameOver to false
  // Call initializeGame()

  score = 0
  hits = 0
}

function keyPressed() {
  // TODO: Check for 'R' key to restart game
  // HINT: Use key === 'r' || key === 'R'
  // Only works when game is over
}

// Helper function you might need
function distance(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}