$("document").ready(function(){

	/*
		Trivial Trivia Game
		Version: 2.0
		Description:
		A Simple Trivia Game
		This game present the user with 8 random trivia questions. 
		They must answer the questions within 30 seconds. Once they 
		reach the end they will see their final score and see if they 
		have won the trivia game. The questions are all multiple 
		choice and will be based on random topics.
	*/

	// ====== Global Variables ======

	var trivia = {};

	// ====== Question Processing Variables ======
	var category = [];
	var categoryName = "";
	var questionsArray = [];
	var currentQuestion = "";
	var rightAnswer = "";
	var answersArray = [];
	var answerImg = "";

	// ====== Game Variables ======
	var numberOfQuestions = 8;
	var timer = 0;
	var right = 0;
	var wrong = 0;
	var unanswered = 0;
	var intervalId;
	var timerIsRunning1 = false;
	var questionsLoaded = false;
	var isGameOver = false;



	// ====== startGame() ======
	/*
		Description: 	Displays the start button and loads the inital questions
						into the game.
	*/
	function startGame(){
		
		//Display the Start Button
		var startButton = $("<button>");
		startButton.text("Start");
		startButton.attr("id", "start-button");
		startButton.addClass("btn start-button");
		$(".title").append(startButton);
		loadQuestion();
		// Add a click listener to the start button to start the game
		$("#start-button").on("click",function(){
			$("#start-button").hide();
			displayQuestion();
		});
	}

	// ====== resetGame() ======
	/*
		Description: 	Resets all game variables and displays the start button
						TODO: Fix soft copy of trivia into category later to keep from having to reset trivia.
	*/
	function resetGame(){

	

		clearQuestion();

		

		$("#category").html("");

		var score = $(".score-window");
		score.html(	'<p> Right Answers: ' + right + '</p>' +
					'<p> Wrong Answers: ' + wrong + '</p>' +
					'<p> Unanswered: ' + unanswered + '</p>');
		$("#start-button").text("Start Over?");
		$("#start-button").show();
		right = 0;
		wrong = 0;
		unanswered = 0;
		intervalId;
		timerIsRunning1 = false;
		questionsLoaded = false;
		isGameOver = false;

		loadQuestion();
		$("#start-button").off().on("click",function(){
			$("#start-button").hide();
			score.html("");

			displayQuestion();
		});
	}

	// ====== loadQuestion() ======
	/*
		Description: 	Pulls a set of questions from the trivia object
						for each play through.
	*/
	function loadQuestion(){
		
		if(questionsLoaded === false){

			trivia = {
				category: [
				{
					name: "Cats",
					questions: [
					{
						question:"How many toes does a cat have on its front paw?",
						answers: {
							rightAnswer: "5",
							wrongAnswers: ["3","4","6"],
							image: "assets/images/catpaw.gif"
							}
					},
					{
						question:"How much of a cat's life is spent grooming?",
						answers: {
							rightAnswer: "30%",
							wrongAnswers: ["20%","25%","50%"],
							image: "assets/images/catgroom.gif"
							}
					},
					{
						question:"A cat has how many whiskers, on average?",
						answers: {
							rightAnswer: "24",
							wrongAnswers: ["16","8","12"],
							image: "assets/images/catwhisk.gif"
							}
					},
					{
						question:"A term for a group of cats is:",
						answers: {
							rightAnswer: "Clowder",
							wrongAnswers: ["Caggle","Covey","Clutch"],
							image: "assets/images/catclow.gif"
							}
					},
					{
						question:"A term for a group of kittens is:",
						answers: {
							rightAnswer: "Kindle",
							wrongAnswers: ["Nook","Kaboodle","Kaggle"],
							image: "assets/images/catkindle.gif"
							}
					},
					{
						question:"All of these are the names of cat breeds, EXCEPT",
						answers: {
							rightAnswer: "Beauceron",
							wrongAnswers: ["Birman","Balinese","Burmilla"],
							image: "assets/images/catbeau.gif"
							}
					},
					{
						question:"The thick hair around the face of some cats (such as Persians) is called:",
						answers: {
							rightAnswer: "Ruff",
							wrongAnswers: ["Shock","Mane","Pelt"],
							image: "assets/images/catruff.gif"
							}
					},
					{
						question:"Cats can't taste this:",
						answers: {
							rightAnswer: "Sweet",
							wrongAnswers: ["Sour","Salt","Bitter"],
							image: "assets/images/cateat.gif"
							}
					},
					]
				},
				{
					name: "Dogs",
					questions: [
					{
						question:"What is the most common command taught to dogs?",
						answers: {
							rightAnswer: "Sit",
							wrongAnswers: ["Stay","Beg","Dance"],
							image: "assets/images/dogsit.gif"
							}
					},
					{
						question:"Which dog yodels instead of barks?",
						answers: {
							rightAnswer: "Basenji",
							wrongAnswers: ["Basset Hound","Otterhound","Komondor"],
							image: "assets/images/basenji.gif"
							}
					},
					{
						question:"Through what part of the body do dogs sweat?",
						answers: {
							rightAnswer: "Paws",
							wrongAnswers: ["Mouth","Ears","Nose"],
							image: "assets/images/dogpaw.gif"
							}
					},
					{
						question:"Which TV series had a dog named K9 who was also a robot?",
						answers: {
							rightAnswer: "Doctor Who",
							wrongAnswers: ["Full House","Star Trek","Law & Order"],
							image: "assets/images/dogk9.gif"
							}
					},
					{
						question:"The first dogs registered in the American Kennel Club belonged to what group?",
						answers: {
							rightAnswer: "Sporting",
							wrongAnswers: ["Herding","Working","Hound"],
							image: "assets/images/dogsport.gif"
							}
					},
					{
						question:"What breed of dog is the smallest used in hunting?",
						answers: {
							rightAnswer: "Miniature Dachshund",
							wrongAnswers: ["Toy Poodle","Chihuahua","Smooth Fox Terrier"],
							image: "assets/images/dogdach.gif"
							}
					},
					{
						question:"What is the most popular breed of dog, according to the American Kennel Club's registrations?",
						answers: {
							rightAnswer: "Labrador",
							wrongAnswers: ["Beagle","Golden Retriever","German Shepherd"],
							image: "assets/images/doglab.gif"
							}
					},
					{
						question:"What is the favorite dog breed of the Queen of England?",
						answers: {
							rightAnswer: "Corgi",
							wrongAnswers: ["Basenji","Poodle","Pomeranian"],
							image: "assets/images/dogcorg.gif"
							}
					},
					]
				},
				]
			}
			var randomCategory = randomNumberGenerator(trivia.category.length);
			category = $.extend({}, trivia.category[randomCategory]);
			for(var i = 0; i < numberOfQuestions; i++){

				

				var randomQuestion = randomNumberGenerator(category.questions.length);

				questionsArray.push(category.questions[randomQuestion]);

				category.questions.splice(randomQuestion, 1);

			}
			questionsLoaded = true;
		} else if(questionsLoaded === true){
		
			categoryName = category.name;
			var randomQstn = randomNumberGenerator(questionsArray.length);

			currentQuestion = questionsArray[randomQstn].question;
				
			rightAnswer = questionsArray[randomQstn].answers.rightAnswer;
			
			for(var i = 0; i < questionsArray[randomQstn].answers.wrongAnswers.length; i++){
				answersArray.push(questionsArray[randomQstn].answers.wrongAnswers[i]);
			}
			
			answersArray.push(rightAnswer);
			
			answerImg = questionsArray[randomQstn].answers.image;

			questionsArray.splice(randomQstn, 1);

			timer = 31;
			startQuestionTimer();

		}

	}

	// ====== displayQuestion() ======
	/*
		Description: 	Grabs a questions and loads it into the game window
	*/
	function displayQuestion(){
		
		clearQuestion();
		loadQuestion();


		// var catDisp = $("<h1>");
		// catDisp.text("Category: " + categoryName);
		// $("#category").html(catDisp);
		var question = $("<h1>");

		question.addClass("question");
		question.text(currentQuestion);
		$("#question-window").append(question);

		var answerLength = answersArray.length;
		for(var i = 0; i < answerLength; i++){
			var button = $("<button>");
			button.addClass("btn answer-button");
			var randomAnswer = randomNumberGenerator(answersArray.length);

			button.attr("data-answer",answersArray[randomAnswer]);
			button.text(answersArray[randomAnswer]);

			answersArray.splice(randomAnswer, 1);
			$("#answers-window").append(button);
		}

		$(".answer-button").on("click", function(){
			var clickAnswer = $(this).attr("data-answer");
			timerIsRunning1 = false;
			stopTimer();
			$("#question-window").html("");
			$(".logo").attr("src", answerImg);
			$("#answers-window").html(
								'<h1>The Answer is ' + rightAnswer + '!</h1>');
			$("#timer").html("");
			if(clickAnswer === rightAnswer){
				right++;
				showAnswerTimer();
				$("#answers-window").prepend("<h1> Correct! </h1>");
			} else {
				wrong++;
				showAnswerTimer();
				$("#answers-window").prepend("<h1> Wrong! </h1>");
			}

		});
		
	}

	// ====== startQuestionTimer() ======
	/*
		Description: 	Starts the timer for the current question
	*/
	function startQuestionTimer(){
		
		if(!timerIsRunning1){
			intervalId = setInterval(decrementQuestionTimer, 1000);
			timerIsRunning1 = true;
		}
	}

	// ====== decrementQuestionTimer() ======
	/*
		Description: 	Decreases the timer and marks a question unanswered if time runs out
	*/
	function decrementQuestionTimer(){
		timer--;
		$("#timer").html('<p>Time Remaining: '+ timer +'</p>');
		if(timer === 0){
			unanswered++;
			$("#question-window").html("");
			$(".logo").attr("src", answerImg);
			$("#answers-window").html('<h1>The Answer is ' + rightAnswer + '!</h1>');
			timerIsRunning1 = false;
			stopTimer();
			showAnswerTimer();
			
		}

	}

	// ====== stopTimer() ======
	/*
		Description: 	Stops the current timer.
	*/
	function stopTimer(){
		clearInterval(intervalId);
	}

	// ====== showAnswerTimer() ======
	/*
		Description: 	Starts the answer timer.
	*/
	function showAnswerTimer(){
		if(!timerIsRunning1){
			intervalId = setInterval(showAnswer, 1000);
			timerIsRunning1 = true;
			timer = 8;
			
		}
	}


	// ====== showAnswer() ======
	/*
		Description: 	Shows the current answer to the question and checks if there are anymore questions left
	*/
	function showAnswer(){
		timer--;

		if(timer === 0){
			$(".logo").attr("src","assets/images/logo.svg");
			if(questionsArray.length === 0){
				isGameOver = true;
			} 
			stopTimer();
			timerIsRunning1 = false;
			checkIsGameOver();
		}
	}

	// ====== clearQuestion() ======
	/*
		Description: 	Clears the question window for the next question.
	*/
	function clearQuestion(){
		$("#question-window").html("");
		$("#answers-window").html("");
		$("#timer").html("");

	}

	// ====== checkIsGameOver() ======
	/*
		Description: 	Checks if the game is over and needs to be reset.
	*/
	function checkIsGameOver(){
		if(isGameOver){
			resetGame();
		} else {
			displayQuestion();
		}
	}

	// ====== randomNumberGenerator() ======
	/*
		Description: 	Generates a random number from 0 to the range given.
	*/
	function randomNumberGenerator(range){
		return Math.floor(Math.random() * range);
	}



	// ====== Javascript Process ======

	startGame();

});
