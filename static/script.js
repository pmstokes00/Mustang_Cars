// Define image descriptions and initialize the game with descriptions
const descriptions = {
    "1965_Ford_Mustang_GT350.jpg": {
        showName: "1965 Ford Mustang GT350",
        description: "A V8 powerhouse that'll make your heart race faster than its wheels spin! Meet the '65 GT350, featuring a modified 289 cubic-inch engine built for galloping!"
    },
    "1967_Ford_Mustang_GT500.jpg": {
        showName: "1967 Ford Mustang GT500",
        description: "More than just a muscle car, it's a marvel of engineering! The '67 GT500 reigns supreme with its 428 cubic-inch Cobra Jet V8 engine, ruling the asphalt jungle!"
    },
    "1970_Ford_Mustang_Boss_302.jpg": {
        showName: "1970 Ford Mustang Boss 302",
        description: "The boss of the track! Say hello to the '70 Boss 302, featuring a specially tuned 302 cubic-inch V8 engine and aerodynamic enhancements for dominating performance!"
    },
    "1971_Ford_Mustang_Boss_351.jpg": {
        showName: "1971 Ford Mustang Boss 351",
        description: "Unleash the boss! The '71 Boss 351 is a force to be reckoned with, powered by a high-performance 351 cubic-inch V8 engine and designed for unrivaled power and style!"
    },
    "1987_Ford_Mustang_GT.jpg": {
        showName: "1987 Ford Mustang GT",
        description: "Nostalgia meets horsepower! The '87 GT is powered by Ford's legendary 5.0-liter V8 engine, delivering a blast from the past with serious '80s flair!"
    },
    "1993_Ford_Mustang_SVT_Cobra.jpg": {
        showName: "1993 Ford Mustang SVT Cobra",
        description: "Enter the snake pit! The '93 SVT Cobra strikes with a venomous bite, featuring a high-performance 5.0-liter V8 engine and aggressive styling that commands respect on the road!"
    },
    "2005_Ford_Mustang_GT.jpg": {
        showName: "2005 Ford Mustang GT",
        description: "Retro styling meets modern performance! The '05 GT features a 4.6-liter V8 engine, independent rear suspension, and advanced safety tech for a futuristic ride!"
    },
    "2012_Ford_Mustang_Boss_302_Laguna_Seca.jpg": {
        showName: "2012 Ford Mustang Boss 302 Laguna Seca",
        description: "Track-tuned perfection! The '12 Boss 302 Laguna Seca is built for speed with a high-revving 5.0-liter V8 engine, race-inspired suspension, and aerodynamic enhancements for dominating the racetrack!"
    },
    "2017_Mustang_GT_5.jpg": {
        showName: "2017 Mustang GT 5.0",
        description: "Race-ready stallion! The '17 GT 5.0 boasts a potent 5.0-liter Coyote V8 engine, precision handling, and advanced tech for an exhilarating ride!"
    },
    "2020_Ford_Mustang_Shelby_GT500.jpg": {
        showName: "2020 Ford Mustang Shelby GT500",
        description: "Force to be reckoned with! The '20 Shelby GT500 features a supercharged 5.2-liter V8 engine, carbon fiber components, and track-ready dynamics for unmatched performance!"
    }
};

// Initialize the game with descriptions
initializeGame(descriptions);

// Initialize the game with descriptions
initializeGame(descriptions);

// Function to initialize the game with descriptions
	function initializeGame(descriptions) {
		// Define image data
		const images = Object.keys(descriptions).map(imagePath => ({
			image_path: `static/Images/${imagePath}`,
			show_name: descriptions[imagePath].showName,
			description: descriptions[imagePath].description
		}));

		// Initialize index to track current image, score, and total attempts counter
		let currentIndex = 0;
		let score = 0;
		let totalAttempts = 0; // Add variable to track total attempts
		let incorrectAttempts = 0;
		let soundPlayed = false; // Flag to track whether sound has been played
		let totalImagesCount = 0;

		// Update total count of images
		document.getElementById('total-count').textContent = images.length;

		// Function to display current image, description, and choices
		function displayImage(index) {
			const image = images[index];
			const currentImage = document.getElementById('current-image');
			currentImage.src = image.image_path;
			currentImage.alt = image.show_name;
			document.getElementById('description').textContent = image.description;
			generateChoices(image.show_name);
		}

    // Function to generate multiple choices
	function generateChoices(correctShowName) {
		const choicesContainer = document.getElementById('choices');
		choicesContainer.innerHTML = ''; // Clear previous choices
		const allShowNames = images.map(image => image.show_name);
		const shuffledShowNames = shuffleArray(allShowNames);
		const correctIndex = shuffledShowNames.indexOf(correctShowName);
		shuffledShowNames.splice(correctIndex, 1); // Remove correct answer from the array
		shuffledShowNames.sort(() => Math.random() - 0.5); // Shuffle remaining options
		shuffledShowNames.splice(Math.floor(Math.random() * 4), 0, correctShowName); // Insert correct answer at a random position
		shuffledShowNames.forEach((showName, index) => {
			if (index < 4) {
				const choiceButton = document.createElement('button');
				choiceButton.textContent = showName;
				choiceButton.classList.add('choice-button');
				choiceButton.addEventListener('click', () => {
					totalAttempts++; // Increment total attempts on each choice
					document.getElementById('attempt-count').textContent = totalAttempts; // Update attempts display
					if (showName === correctShowName) {
						choiceButton.style.color = 'white'; // Change text color to white for the correct answer
						document.getElementById('result').textContent = 'Correct!';
						document.getElementById('result').style.display = 'block'; // Show result message
						score++; // Increase score
						document.getElementById('score-value').textContent = score; // Update score display
						setTimeout(() => {
							document.getElementById('result').style.display = 'none'; // Hide result message after 2 seconds
						}, 2000); // Hide message after 2 seconds
						nextImage(); // Move to next image
					} else {
						document.getElementById('result').textContent = 'Incorrect. Try again';
						document.getElementById('result').style.display = 'block'; // Show result message
						incorrectAttempts++;
						totalAttempts++; // Increment total attempts
						document.getElementById('attempt-count').textContent = totalAttempts; // Update total attempts display
						setTimeout(() => {
							document.getElementById('result').style.display = 'none'; // Hide result message after 2 seconds
						}, 2000); // Hide message after 2 seconds
						if (incorrectAttempts === 3) {
							nextImage(); // Move to next image after 3 incorrect attempts
							incorrectAttempts = 0; // Reset incorrect attempts counter
						}
					}
				});
				choicesContainer.appendChild(choiceButton);
			}
		});
	}


    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to move to the next image
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            document.getElementById('game-over').innerHTML = 'Game Over<br>Restart?<br>Click here.';
            document.getElementById('game-over').style.display = 'block'; // Show game over message
            document.getElementById('game-over').addEventListener('click', restartGame);
        } else {
            displayImage(currentIndex);
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset index
        incorrectAttempts = 0; // Reset incorrect attempts counter
        totalIncorrectAttempts = 0; // Reset total incorrect attempts counter
        score = 0; // Reset score
        document.getElementById('score-value').textContent = score; // Reset score display
        document.getElementById('attempt-count').textContent = totalIncorrectAttempts; // Reset total incorrect attempts display
        displayImage(currentIndex); // Display first image
        document.getElementById('game-over').style.display = 'none'; // Hide game over message
    }

    // Function to move to the next image
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            document.getElementById('game-over').innerHTML = 'Game Over<br>Restart?<br>Click here.';
            document.getElementById('game-over').style.display = 'block'; // Show game over message
            document.getElementById('game-over').addEventListener('click', restartGame);
        } else {
            displayImage(currentIndex);
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset index
        incorrectAttempts = 0; // Reset incorrect attempts counter
		incorrect =0;
        score = 0; // Reset score
        document.getElementById('score-value').textContent = score; // Reset score display
        displayImage(currentIndex); // Display first image
        document.getElementById('game-over').style.display = 'none'; // Hide game over message
    }

	// Event listener for the play sound button
	document.getElementById('play-sound-button').addEventListener('click', function() {
		// Logic to play the sound when the button is clicked
		const audio = new Audio('static/default_sound.mp3');
		audio.play();
		// Set the flag to true indicating the sound has been played
		soundPlayed = true;
		// Hide the play sound button after playing sound
		document.getElementById('play-sound-button').style.display = 'none';
		// Enable the choice buttons after sound is played
		enableChoiceButtons();
		// Display the first image after the sound is played
		displayImage(currentIndex);
		// Update the total images count
		totalImagesCount = images.length;
		// Set the total images count as a CSS custom property
		document.documentElement.style.setProperty('--total-images', totalImagesCount);
		// Update the total images count display
	document.getElementById('total-count').textContent = totalImagesCount;
	});

    // Function to enable choice buttons
    function enableChoiceButtons() {
        const choiceButtons = document.querySelectorAll('.choice-button');
        choiceButtons.forEach(button => {
            button.disabled = false; // Enable each choice button
        });
    }

    // Initial display
    // Since we're removing the sound button, we need to call displayImage directly
    displayImage(currentIndex);
	
    // Optional: Add event listeners for keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1; // Wrap around to the last image
            }
            displayImage(currentIndex);
        } else if (event.key === 'ArrowRight') {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0; // Wrap around to the first image
            }
            displayImage(currentIndex);
        }
    });
}
