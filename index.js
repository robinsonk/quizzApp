
//This is where the quiz questions and answers are stored
const quiz = [
    {
        question: 'Mortal Kombat was first released on which platform?',
        answers: [
            'Sega Genesis',
            'Playstation 1',
            'Arcade Cabinet',
            'Atari'
        ],
        correctAnswer: 2,
        correctText: 
        "Mortal Kombat was first released on Arcade Cabinets in 1992! Following the game's success in arcades, it was later launched on home gaming consoles as well"
      
    },
    {
        question: 'Mortal Kombat was created to rival which popular fighting game franchise?',
        answers: [
            'Tekken',
            'Street Fighter',
            'Soul Edge',
            'Virtua fighter'
        ],
        correctAnswer: 1,
        correctText: 'Mortal Kombat was created to rival the Street Fighter franchise after the sweeping success of Street Fighter 2'
    },
    {
        question: 'Which popular character was NOT playable on the original arcade version of Mortal Kombat?' ,
        answers: [
            'Sub-Zero',
            'Raiden',
            'Kano',
            'Baraka'
        ],
        correctAnswer: 3,
        correctText: 'Baraka was not a playable character until Mortal Kombat 2'
    },
    {
        question: "According to the franchise's lore, who was the reinging Mortal Kombat champion 500 years in a row?",
        answers: [
            'Shang Tsung',
            'Shao Kahn',
            'Goro',
            'Quan Chi'
        ],
        correctAnswer: 2,
        correctText: 'Goro was the champion of Mortal Kombat for 500 years running'
    },
    {
        question: 'What is the real name of the undead warrior, Scorpion?',
        answers: [
            'Hanzo Hisashi',
            'Kuai Liang',
            'Bi-Han',
            'Liu Kang'
        ],
        correctAnswer: 0,
        correctText: "Scorpion's real name is Hanzo Hisashi"
    },
    {
        question: 'How many unique Mortal Kombat games have been published as of December, 2018?',
        answers: [
            12,
            20,
            17,
            10
        ],
        correctAnswer: 1,
        correctText: "A whopping 20 Mortal Kombat titles have been published from 1992 through the end of 2018"
    },
    {
        question: "Which ninja is Scorpion's rival in the early games?",
        answers: [
            'Reptile',
            'Smoke',
            'Ermac',
            'Sub-Zero'
        ],
        correctAnswer: 3,
        correctText: "Sub-Zero is Scorpion's main rival in the early games"
    },
    {
        question: 'Which fighter uses deadly fans tipped with steel blades against her opponents?',
        answers: [
            'Sonya Blade',
            'Kitana',
            'Mileena',
            'Jade'
        ],
        correctAnswer: 1,
        correctText: 'The steel-fan weilder is Princess Kitana'
    },
    {
        question: 'Before winning Mortal Kombat, champion Liu Kang was once a:',
        answers: [
            'Monk',
            'Ninja',
            'Officer',
            'Soldier'
        ],
        correctAnswer: 0,
        correctText: 'Liu Kang was a Shaolin Monk who trained to compete in Mortal Kombat'
    },
    {
        question: 'What is the term used to commend beating your opponent without taking any damage?',
        answers: [
            'Perfect Score',
            'Flawless Finish',
            'Flawless Victory',
            'Perfect Win'
        ],
        correctAnswer: 2,
        correctText: 'If you manage to best your opponent without taking any damage, you have achieved a Flawless Victory'
    },
];

//setting up our variables. questionNum is the array position of the question. challengeNum is what the user sees displayed. Score is their # of correct answers
let questionNum = 0;
let challengeNum = 1;
let score = 0;

$('.final-score-page').hide();

function startButton() {
    //This function leads to the first set of questions, in the questionDisplay function
    //it will also show the challenge number
    //it will also show the curent score
    $('.start-button').on('click', function (event) {
        score = 0;
        $('.begin-quiz').hide();
        $('final-score-page').hide();
        questionDisplay(questionNum);
        $('.challengeNum').text(challengeNum);
    });
}

function questionDisplay(questionNum) {
        //This function will display the question and answers
        //it will also show the submit button
        if (questionNum < quiz.length) {
            $('.quiz-content').html(`
            <div class="challenge-question">
                <h2>${quiz[questionNum].question}</h2>
                <form class='questionForm'>
                    <fieldset>
                        <label class="choice">
                            <input type="radio" value="0" name="answer" required>
                            <span>${quiz[questionNum].answers[0]}</span>
                        </label>
                        <label class="choice">
                            <input type="radio" value="1" name="answer" required>
                            <span>${quiz[questionNum].answers[1]}</span>
                        </label>
                        <label class="choice">
                            <input type="radio" value="2" name="answer" required>
                            <span>${quiz[questionNum].answers[2]}</span>
                        </label>
                        <label class="choice">
                            <input type="radio" value="3" name="answer" required>
                            <span>${quiz[questionNum].answers[3]}</span>
                        </label>
                        <button type="submit" class="submitButton">Submit</button>
                    </fieldset>
                </form>
            </div>
            `);
            $('.quiz-content').show();
        };
}

function submit() {
    //this function will lead to the solution function when the user hits 'submit'
    $('.quiz-content').on('submit', '.questionForm', function (event) {
        event.preventDefault();
        $('.quiz-content').hide();
        let answer = $('input[name="answer"]:checked').val();
        solution(questionNum, answer);
        $('.wrongOrRight').show(questionNum);
    });
}

function solution(questionNum, answer) {
    //This function will display whether or not they got the answer right
    //it will also show what the correct answer is
    //it will also contain a button to go to the next question
    //if correct, the users score will go up
    console.log(`solution called with answer `,answer);
    if (answer == quiz[questionNum].correctAnswer) {
        console.log('correct');
        score++;
        $('.score').text(score);
        $('.wrongOrRight').html(`
        <section role="region" class="right-answer">
            <h2>CORRECT</h2>
            <h3>You may move onto the next challenge!</h3>
            <button type="button" class="next-button">NEXT</button>
        </section>`);
    } else {
        console.log('Wrong');
        $('#container').html(`
        <section role="region" class="wrong-answer">
            <h2>WRONG</h2>
            <h3>${quiz[questionNum].correctText}</h3>
            <button type="button" class="next-button">NEXT</button>
        </section>`); 
    } 
}

function next() {
    //This function displays the next question once the user selects the 'next question' button
    //When the next button is clicked, the questionNum and challengeNum variables increase
    //If they've reached the last quiz question, the final score section will display instead of another question
    //If they've reached the last question, the Challenge number will not pass 10/10
    $('#container').on('click', '.next-button', function (event) {
        questionNum++
        challengeNum++
        $('.challengeNum').text(challengeNum);
        $('.wrongOrRight').hide();
        if (questionNum >= quiz.length) {
            finalScore(score);
            $('.wrong-or-right').hide();
            console.log('this is the end');
            $('.challengeNum').text(10);
        } else {
            questionDisplay(questionNum); 
        } 
    });
}

function finalScore(score) {
    //This function displays the player's final score
    //it also tells them how they did (bad, good, okay, or great)
    //it also provides a button to restart the quiz
    $('.final-score-page').show();
    console.log('The finalScore function has been called');
    if (score > 7 && score < 10) {
        console.log('Wow good job!');
        $('#final-score').html(`
        <div class="final">
            <h2>Your score is: ${score}/10</h2>
            <img src="https://i.imgur.com/t8hc6zO.gif" alt="Liu Kang smiling at your great effort">
            <h3>You really know your stuff! Sounds like you're ready to compete!</h3>
            <button type="button" class="restart-button">RESTART QUIZ</button>
        </div>`);
    }
    else if (score === 10) {
        console.log('flawless victory!');
        $('.final-score-page').html(`
        <div class="final">
            <h2>Your score is: ${score}/10</h2>
            <img src="https://i.imgur.com/zva9ZIS.gif" alt="Johnny Cage taking off his $500 sunglasses">
            <h3>Flawless victory! You've won a tournament or two!</h3>
            <button type="button" class="restart-button">RESTART QUIZ</button>
        </div>`);
    }   
    else if (score < 8 && score > 5) {
        console.log('Not so good');
        $('.final-score-page').html(`
        <div class="final">
            <h2>Your score is: ${score}/10</h2>
            <img src="https://i.imgur.com/LOUUj8V.gif" alt="Raiden laughing at your score">
            <h3>Sounds like you need more training...</h3>
            <button type="button" class="restart-button">RESTART QUIZ</button>
        </div>`);
    } else {
        console.log("that's...bad");
        $('.final-score-page').html(`
        <div class="final">
            <h2>Your score is: ${score}/10</h2>
            <img src="https://i.imgur.com/Yz8BOmh.gif" alt="Shang Tsung giving you a warning for your low score">
            <h3>You've lost this tournament...</h3>
            <button type="button" class="restart-button">RESTART QUIZ</button>
        </div>`);
    }
    restart();
}

function restart() {
    //This function reverts the quiz to the beginning page with the start button
    //Once the restart button is clicked, the score, questionNum, and challengeNum are all reset back to their original values
    $('.final-score-page').on('click', '.restart-button', function (event) {
        $('.final-score-page').hide();
        $('.begin-quiz').show();
        score = 0;
        $('.score').text(0);
        $('.challengeNum').text(0);
        console.log('the restart button is working');
        questionNum = 0;
        challengeNum = 1;
    });
}


//This is the main function which tells most of our other functions to load on page load
function runQuizApp() {
    startButton();
    questionDisplay();
    submit();
    next();
 
}

$(runQuizApp);