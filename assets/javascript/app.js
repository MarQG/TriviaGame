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


	var category = [];
	var categoryName = "";
	var questionsArray = [];
	var currentQuestion = "";
	var rightAnswer = "";
	var answersArray = [];
	var answerImg = "";
	var qstn = { 
		category: "",
		question: "",
		rightAnswer: "",
		wrongAnswers: [],
		image: ""
	};
	var numberOfQuestions = 8;
	var timer = 0;
	var right = 0;
	var wrong = 0;
	var unanswered = 0;
	var intervalId;
	var timerIsRunning1 = false;
	var questionsLoaded = false;
	var isGameOver = false;




	function startGame(){
		
		//Display the Start Button
		var startButton = $("<button>");
		startButton.text("Start");
		startButton.attr("id", "start-button");
		startButton.addClass("btn start-button");
		$("#question-window").append(startButton);
		loadQuestion();
		// Add a click listener to the start button to start the game
		$("#start-button").on("click",function(){
			
			displayQuestion();
		});
	}

	function resetGame(){

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

		clearQuestion();

		

		$("#category").html("");

		var score = $(".score-window");
		score.html(	'<p> Right Answers: ' + right + '</p>' +
					'<p> Wrong Answers: ' + wrong + '</p>' +
					'<p> Unanswered: ' + unanswered + '</p>');
		var startButton = $("<button>");


		startButton.text("Start Over?");
		startButton.attr("id", "start-button");
		startButton.addClass("btn start-button");
		$("#question-window").append(startButton);
		
		
		right = 0;
		wrong = 0;
		unanswered = 0;
		intervalId;
		timerIsRunning1 = false;
		questionsLoaded = false;
		isGameOver = false;

		loadQuestion();
		$("#start-button").on("click",function(){
			score.html("");
			displayQuestion();
			console.log("reset complete");
		});
	}

	function loadQuestion(){
		
		if(questionsLoaded === false){
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

			$("#answers-window").html(
								'<p>The Answer is ' + rightAnswer + '!</p>' +
								'<img src="'+ answerImg + '" >');
			$("#timer").html("");
			if(clickAnswer === rightAnswer){
				right++;
				showAnswerTimer();
				$("#timer").append("<p> Correct! </p>");
			} else {
				wrong++;
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
			unanswered++;
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
			timer = 5;
			
		}
	}

	function showAnswer(){

		timer--;

		if(timer === 0){
			if(questionsArray.length === 0){
				isGameOver = true;
			} 
			stopTimer();
			timerIsRunning1 = false;
			checkIsGameOver();
		}
	}

	function clearQuestion(){
		$("#question-window").html("");
		$("#answers-window").html("");
		$("#timer").html("");

	}

	function checkIsGameOver(){
		if(isGameOver){
			resetGame();
		} else {
			displayQuestion();
		}
	}

	function randomNumberGenerator(range){
		return Math.floor(Math.random() * range);
	}



	// Javascript Process

	startGame();

});