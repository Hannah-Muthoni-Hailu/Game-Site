const questions = 
[
    {
      question: "Which designer is known for creating the little black dress?",
      options: ["Christian Dior", "Coco Chanel", "Yves Saint Laurent", "Gianni Versace"],
      answer: 1
    },
    {
      question: "What iconic shoe style was introduced by Salvatore Ferragamo?",
      options: ["Stiletto heels", "Loafers", "Wedge heels", "Platform shoes"],
      answer: 1
    },
    {
      question: "Who is the founder of the luxury brand Louis Vuitton?",
      options: ["Louis Vuitton", "Coco Chanel", "Christian Dior", "Ralph Lauren"],
      answer: 0
    },
    {
      question: "Which fashion designer is known for the wrap dress?",
      options: ["Donatella Versace", "Stella McCartney", "Diane von Fürstenberg", "Vera Wang"],
      answer: 2
    },
    {
      question: "What type of clothing is designed by Ralph Lauren?",
      options: ["Evening gowns", "Sportswear", "Swimwear", "Workout attire"],
      answer: 1
    },
    {
      question: "What is the name of the luxury fashion house founded by Gabrielle Bonheur Chanel?",
      options: ["Chanel", "Versace", "Gucci", "Prada"],
      answer: 0
    },
    {
      question: "Which designer is known for creating the Birkin bag?",
      options: ["Karl Lagerfeld", "Vivienne Westwood", "Ralph Lauren", "Hermès"],
      answer: 3
    },
    {
      question: "What iconic fashion item was popularized by Mary Quant?",
      options: ["Trench coat", "Mini skirt", "Bell-bottoms", "Leather jacket"],
      answer: 1
    },
    {
      question: "Which fashion designer is associated with the brand Versace?",
      options: ["Calvin Klein", "Gianni Versace", "Tommy Hilfiger", "Alexander McQueen"],
      answer: 1
    },
    {
      question: "What is the name of the luxury shoe designer known for his red-soled shoes?",
      options: ["Jimmy Choo", "Manolo Blahnik", "Christian Louboutin", "Stuart Weitzman"],
      answer: 2
    },
    {
      question: "Who is known as the queen of punk fashion?",
      options: ["Vivienne Westwood", "Coco Chanel", "Donatella Versace", "Stella McCartney"],
      answer: 0
    },
    {
      question: "What famous fashion magazine is known as the 'Fashion Bible'?",
      options: ["Elle", "Vogue", "Harper's Bazaar", "Cosmopolitan"],
      answer: 1
    },
    {
      question: "Which fashion designer is known for his tartan patterns and kilts?",
      options: ["Giorgio Armani", "Ralph Lauren", "Alexander McQueen", "Vivienne Westwood"],
      answer: 3
    },
    {
      question: "What type of clothing is associated with the brand H&M?",
      options: ["Haute couture", "Luxury fashion", "Fast fashion", "Streetwear"],
      answer: 2
    },
    {
      question: "Which designer is known for popularizing the use of denim in high fashion?",
      options: ["Tom Ford", "Karl Lagerfeld", "Ralph Lauren", "Gianni Versace"],
      answer: 0
    },
    {
      question: "What is the name of the luxury fashion house founded by Gianni Versace?",
      options: ["Gucci", "Prada", "Hermès", "Versace"],
      answer: 3
    },
    {
      question: "Who is known for creating the perfume Chanel No. 5?",
      options: ["Ralph Lauren", "Calvin Klein", "Gabrielle Chanel", "Christian Dior"],
      answer: 2
    },
    {
      question: "Which fashion designer is known for his luxury leather handbags and accessories?",
      options: ["Coach", "Louis Vuitton", "Gucci", "Prada"],
      answer: 0
    },
    {
      question: "What is the name of the fashion designer famous for his body-conscious dresses?",
      options: ["Donatella Versace", "Stella McCartney", "Alexander McQueen", "Hervé Léger"],
      answer: 3
    },
    {
      question: "Which luxury brand is known for its signature checkered pattern?",
      options: ["Gucci", "Louis Vuitton", "Burberry", "Prada"],
      answer: 2
    }
  ]

let currentQuestion = 0;

let answersArray = localStorage.getItem('userAnswersSeventeen') || [];

setTimeout(function(){
    document.getElementById('startquiz').click()
}, 500)

function startQuiz() {
    document.getElementById("quizNumberPage").style.display = "none";
    const urlParams = new URLSearchParams(window.location.search);
    const paramQuestion = parseInt(urlParams.get('q'));
    if (!isNaN(paramQuestion) && paramQuestion >= 0 && paramQuestion < questions.length) {
        currentQuestion = paramQuestion;
        showQuestionNumber(paramQuestion);
    }
    showQuestion(currentQuestion);
}

function showQuestionNumber(nextQ) {
    document.getElementById("quizNumberPage").style.display = "block";
}

function showQuestion(index) {
    let storageQuestions = index + 2;
    localStorage.setItem('currentquestions', storageQuestions);
    document.getElementById("quizPage").style.display = "block";
    document.getElementById("quizNumberPage").style.display = "none";
    document.getElementById("questionNumber").textContent = "Question " + (index + 1);
    document.getElementById("question").textContent = questions[index].question;
    
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    questions[index].options.forEach((option, i) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.value = i;
        optionsContainer.appendChild(input);
        optionsContainer.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(document.createElement("br"));
    });
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateURL(currentQuestion);
        window.location.reload(); // Reload the page to display the previous question
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an option");
        return;
    }

    let holder;
    if(currentQuestion == 0){
      answersArray[currentQuestion] = parseInt(selectedOption.value);
    }
    else{
      holder = answersArray.split(',');
      holder[currentQuestion] = parseInt(selectedOption.value);
      answersArray = holder;
    }
    localStorage.setItem('userAnswersSeventeen', answersArray);
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateURL(currentQuestion);
        window.location.reload(); // Reload the page to display the next question
    } else {
        showResults();
    }
}

function updateURL(questionNumber) {
    const url = window.location.origin + window.location.pathname + '?q=' + questionNumber;
    window.history.pushState({ path: url }, '', url);
}
function showResults() {
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("resultPage").style.display = "block";
    const resultsContainer = document.getElementById("results");
    let score = 0;
    questions.forEach((question, i) => {
        if(typeof answersArray[i] == 'string'){
            answersArray[i] = Number(answersArray[i]);
        }
        const userAnswer = answersArray[i];
        const result = document.createElement("p");
        result.textContent = `Question ${i + 1}: ${userAnswer === question.answer ? "Correct" : "Incorrect"}`;
        if (userAnswer === question.answer) {
            score++;
        }
        resultsContainer.appendChild(result);
    });
    resultsContainer.appendChild(document.createElement("br"));
    const scoreDisplay = document.createElement("h2");
    scoreDisplay.textContent = `Score: ${score}/${questions.length}`;
    resultsContainer.appendChild(scoreDisplay);
    if(score >= 18){
      localStorage.setItem('quizresults', 'pass')
    }
    else{
      localStorage.setItem('quizresults', 'fail')
    }
}

function restart(){
  if(localStorage.getItem('quizresults') == 'pass'){
    let money = localStorage.getItem('money') || 0;
    let earnings = parseFloat(money);
    earnings = earnings + 0.002;
    money = earnings;
    localStorage.setItem('money', money);
    sendDataFunction(localStorage.getItem('user_id'), localStorage.getItem('money'));
    localStorage.removeItem('quizresults')
  }
    currentQuestion = 0;
    updateURL(currentQuestion);
    document.getElementById('restartbutton').click();
    localStorage.removeItem('currentquestions');
}

function sendDataFunction(user_id, data){
  if (user_id) {
      var data = data;
  
      let user = {
          "user_id": user_id,
          "data": data
      }
  
      fetch("../script.php", {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json; charset=utf-8"
          },
          "body": JSON.stringify(user)
      }).then(function(response){
          return response.text();
      }).then(function(data){
          console.log(data);
      })
  }
  localStorage.setItem('money', data);
}

function goHome(){
  if(localStorage.getItem('quizresults') == 'pass'){
    let money = localStorage.getItem('money') || 0;
    let earnings = parseFloat(money);
    earnings = earnings + 0.0015;
    earnings = Math.round(earnings * 10000) / 10000;
    money = earnings;
    localStorage.setItem('money', money);
    sendDataFunction(localStorage.getItem('user_id'), localStorage.getItem('money'));
    localStorage.removeItem('quizresults')
  }
  window.location.href = "../index.php"
}