$("document").ready(function(){

	/*
		Trivial Trivia Game
		Version: 1.0
		Description:
		A Simple Trivia Game
		This game present the user with 8 random trivia questions. 
		They must answer the questions within 30 seconds. Once they 
		reach the end they will see their final score and see if they 
		have won the trivia game. The questions are all multiple 
		choice and will be based on random topics.
	*/

	// ====== Global Variables ======

	var trivia = {
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
													question:"Cats can’t taste this:",
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
												]
								},
								]
				}


	var category = [];
	var categoryName = "";
	var questionsArray = [];
	var currentQuestion = "";
	var rightAnswer = "";
	var answersArray = [];
	var answerImg = "";
	var timer = 0;
	var intervalId;
	var timerIsRunning1 = false;




	function startGame(){

		//Display the Start Button
		var startButton = $("<button>");
		startButton.text("Start");
		startButton.attr("id", "start-button");
		startButton.addClass("btn start-button");
		$("#question-window").append(startButton);

		// Add a click listener to the start button to start the game
		$("#start-button").on("click",function(){
			displayQuestion();
		});
	}

	function loadQuestion(){
		// load a question from the trivia object
		var randomCategory = randomNumberGenerator(trivia.category.length);
		category = trivia.category[randomCategory];

		categoryName = category.name;
		
		questionsArray = category.questions;

		var randomQuestion = randomNumberGenerator(category.questions.length);
		
		currentQuestion = questionsArray[randomQuestion].question;
		
		rightAnswer = questionsArray[randomQuestion].answers.rightAnswer;
		
		for(var i = 0; i < questionsArray[randomQuestion].answers.wrongAnswers.length; i++){
			answersArray.push(questionsArray[randomQuestion].answers.wrongAnswers[i]);
		}
		
		answersArray.push(rightAnswer);
		
		answerImg = questionsArray[randomQuestion].answers.image;
		
		timer = 31;
		startQuestionTimer();

	}

	function displayQuestion(){
		
		clearQuestion();
		loadQuestion();


		var catDisp = $("<h1>");
		catDisp.text("Category: " + categoryName);
		$("#category").html(catDisp);
		var question = $("<p>");

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
			$("#timer").html(
								'<p>The Answer is ' + rightAnswer + '!</p>' +
								'<img src="'+ answerImg + '" >');
			if(clickAnswer === rightAnswer){
				console.log("Right");
				showAnswerTimer();
				$("#timer").append("<p> Correct! </p>");
			} else {
				console.log("Wrong");
				showAnswerTimer();
				$("#timer").append("<p> Wrong! </p>");
			}
		});
		
	}

	function startQuestionTimer(){
		
		if(!timerIsRunning1){
			intervalId = setInterval(decrementQuestionTimer, 1000);
			timerIsRunning1 = true;
		}
	}

	function decrementQuestionTimer(){
		timer--;
		$("#timer").html('<p>Time Remaining: '+ timer +'</p>');
		if(timer === 0){
			$("#timer").html(
								'<p>The Answer is ' + rightAnswer + '!</p>' +
								'<img src="'+ answerImg + '" >');
			timerIsRunning1 = false;
			stopTimer();
			showAnswerTimer();
			
		}

	}

	function stopTimer(){
		clearInterval(intervalId);
	}

	function showAnswerTimer(){
		if(!timerIsRunning1){
			intervalId = setInterval(showAnswer, 1000);
			timerIsRunning1 = true;
			timer = 7;
			
		}
	}

	function showAnswer(){
		timer--;
		if(timer === 0){
			stopTimer();
			timerIsRunning1 = false;
			displayQuestion();
		}
	}

	function clearQuestion(){
		$("#question-window").html("");
		$("#answers-window").html("");
		$("#timer").html("");

	}

	function randomNumberGenerator(range){
		return Math.floor(Math.random() * range);
	}


	



	// Javascript Process

	startGame();

});