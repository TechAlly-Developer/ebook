function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);
  ev.target.appendChild(draggedElement);
}

function checkAnswers() {
  var correctAnswers = {
    "imageBox1": "letterB",
    "imageBox2": "letterA",
    "imageBox3": "letterD",
    "imageBox4": "letterC"
  };

  var isCorrect = true;

  for (var imageBoxId in correctAnswers) {
    var letterId = correctAnswers[imageBoxId];
    var imageBox = document.getElementById(imageBoxId);
    var letterBox = document.getElementById(letterId);

    if (imageBox.firstChild !== letterBox) {
      isCorrect = false;
      imageBox.style.backgroundColor = "lightcoral";
    } else {
      imageBox.style.backgroundColor = "lightgreen";
    }
  }

  if (isCorrect) {
    setTimeout(function () {
      //alert("All correct!");
      toggleButtons(true);
    }, 0);
  } else {
    setTimeout(function () {
      //alert("Incorrect placement!");
      toggleButtons(false);
    }, 0);
  }
}

function resetImageBoxes() {
  var imageBoxes = document.querySelectorAll(".draggable-box,.letter-box");
  
  imageBoxes.forEach(function (box) {
    box.innerHTML = ""; 
    box.style.backgroundColor = ""; 
    
  });

}

function toggleButtons(isCorrect) {
  var resetButtons = document.querySelectorAll("button");
  
  resetButtons.forEach(function (button) {
    if (button.textContent.includes("சரிபார்")) {
      if (isCorrect) {
        button.textContent = "மீண்டும் செய்துபார்";
        button.classList.remove("check-answer");
        button.classList.add("reset-btn");
      }
      else if(!isCorrect){
        button.textContent = "மீண்டும் செய்துபார்";
        button.classList.remove("check-answer");
        button.classList.add("reset-btn");
          } 
      else {
        button.textContent = "சரிபார்";
        button.classList.remove("reset-btn");
        button.classList.add("check-answer");
      }

      // Reset draggable boxes when the button is clicked
      button.addEventListener("click", function () {
        resetImageBoxes();
       // resetLetterBoxes();
       location.reload();
       console.log("Total Correct Answers:", totalCorrectAnswers);
      console.log("Total Questions:", totalQuestions);

      });
      
    }
  });
  var totalQuestions = Object.keys(correctAnswers).length;
  var scoreDisplay = document.getElementById("score-display");
  scoreDisplay.textContent = "மதிப்பெண்: " + (Object.keys(correctAnswers).length / totalQuestions);
  

}


