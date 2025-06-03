let cols, rows;
let cellSize = 10;
let grid = [];
let mic;
let amplitude = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(cellSize);
  textAlign(CENTER, CENTER);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);

  // Initialize grid with random ASCII characters
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = randomAsciiChar();
    }
  }

  // Microphone input
  mic = new p5.AudioIn();
  mic.start();
}

        function draw() {
            background(0);
            amplitude = mic.getLevel(); // Get the sound level
            
            // Loop through grid and display characters
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let x = i * cellSize + cellSize / 2;
                    let y = j * cellSize + cellSize / 2;
                    
                    // Default color
                    fill(110, 110, 110);

                    // Check if sound level exceeds a threshold
                    if (amplitude > 0.02) {
                        // Geometric movement: shift position slightly based on sound amplitude
                        let offsetX = map(noise(x, frameCount * 0.01), 0, 1, -amplitude * 100, amplitude * 100);
                        let offsetY = map(noise(y, frameCount * 0.01), 0, 1, -amplitude * 100, amplitude * 100);

                        // Change position and color based on amplitude
                        x += offsetX;
                        y += offsetY;

                        // Map amplitude to color
                        let colorValue = map(amplitude, 0, 0.2, 50, 255);
                        fill(random(255), colorValue, random(255)); //colorValue: Reacts to sound, higher sound levels result in brighter green
                    }

                    // Display the character
                    text(grid[i][j], x, y);

                    // Randomly change character based on sound amplitude, I guess it picks up even small noises
                    if (random() < amplitude) {
                        grid[i][j] = randomAsciiChar();
                    }
                }
            }
        }

        // Function to generate a random ASCII character
        function randomAsciiChar() {
            const asciiStart = 33; // '!' character
            const asciiEnd = 126; // '~' character
            return String.fromCharCode(floor(random(asciiStart, asciiEnd + 1)));
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
            cols = floor(width / cellSize);
            rows = floor(height / cellSize);
            
            // Reinitialize grid with new dimensions
            grid = [];
            for (let i = 0; i < cols; i++) {
                grid[i] = [];
                for (let j = 0; j < rows; j++) {
                grid[i][j] = randomAsciiChar();
                }
            }
        }


        function closeMicPopup() {
            document.getElementById('mic-popup').style.display = 'none';
        }