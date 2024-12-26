    // Add required variables to do DOM manipulation
    const rockButton = document.querySelector('.rockBtn');
    const scissorButton = document.querySelector('.scissorBtn');
    const paperButton = document.querySelector('.paperBtn');

    const pcScore = document.getElementById('PcScoreUpdate');
    const userScore = document.getElementById('UserScoreUpdate');

    const triangleContainer = document.getElementById('Triangle');
    const gameRulesContainer = document.querySelector('.Game-Rules');

    const userImage = document.querySelector('.userImg');
    const pcImage = document.querySelector('.pcImg');

    const closeRulesButton = document.querySelector('.closeRulesBtn');
    const openRulesButton = document.querySelector('.openRulesBtn');

    const resultText1 = document.querySelector('.result-text-1');
    const resultText2 = document.querySelector('.result-text-2');
    const gameBtn = document.querySelector('.gameButton');

    const userColor = document.querySelector('.userDiv');
    const pcColor = document.querySelector('.pcDiv');

    const rulesBtn = document.querySelector('.openRulesBtn');
    const nextBtn = document.querySelector('.nextButton');

    const resultFrame = document.querySelector('.resultFrame-1');
    const hurrayFrame = document.querySelector('.result-Frame-2');

    const hurrayGameButton = document.querySelector('.hurrayGameButton');

    const section1 = document.querySelector('.ScoreBar');
    const section2 = document.querySelector('.options-container');
    const section3 = document.querySelector('.GameRulesConatiner');
    const section4 = document.querySelector('.FinalPage');

    const outerCircleUser = document.querySelector('.outer-circle-user');
    const middleCircleUser = document.querySelector('.middle-circle-user');
    const innerCircleUser = document.querySelector('.inner-circle-user');
    const userColorDiv = document.querySelector('.userColor')

    const outerCirclePc = document.querySelector('.outer-circle-pc');
    const middleCirclePc = document.querySelector('.middle-circle-pc');
    const innerCirclePc = document.querySelector('.inner-circle-pc');
    const pcColorDiv = document.querySelector('.pcColor');

    const UserAndPcConatiner = document.querySelector('.UserAndPcConatiner');
    const pcParentDiv = document.querySelector('.pcParentDiv');
    const userParentDiv = document.querySelector('userParentDiv');


    // Adding event listeners to three Buttons

    rockButton.addEventListener("click", userClicked);
    scissorButton.addEventListener("click", userClicked);
    paperButton.addEventListener("click", userClicked); 

    // Event handler when User clicked a button
    function userClicked(event) {

    triangleContainer.style.display = 'none';
    gameRulesContainer.style.display = 'none';
    resultFrame.style.display = 'block';

    const choiceOfButton = event.target.closest('button').id; 

    if (!choiceOfButton) {
        console.error("User clicked without a valid button!");
        return;  
    }

    const userChoice = getUserChoice(choiceOfButton);

    if (!userChoice) {
        console.error("Invalid user choice:", choiceOfButton);
        return; 
    }
    // Get the Pc's random choice
    const pcChoice = pcRandomValue();

    // Compare User choice and Pc choice
    const result = compareUserAndPcoOptions(userChoice, pcChoice);

    // Display the result Based on Comparision
    displayResult(result);
    }


    function getUserChoice(choiceOfButton) {
    if (choiceOfButton === 'rockButton') {
        return 'rock';
    }
    if (choiceOfButton === 'scissorButton') {
        return 'scissors';
    }
    if (choiceOfButton === 'paperButton') {
        return 'paper';
    }
    }

    function pcRandomValue() {
    return Math.floor(Math.random() * 3) + 1;
    }

    let userCounter = 0;
    let pcCounter = 0;

    function loadScores() {

        const storedUserScore = localStorage.getItem('userScore');
        const storedPcScore = localStorage.getItem('pcScore');

        userCounter = storedUserScore !== null ? parseInt(storedUserScore, 10) : 0;
        pcCounter = storedPcScore !== null ? parseInt(storedPcScore, 10) : 0;

        userScore.innerHTML = userCounter;
        pcScore.innerHTML = pcCounter;
    }

    function displayResult(result) {

    resultText2.style.display = 'block';

        function createCircles(container) {
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('outer-circle', 'circle');

        const middleDiv = document.createElement('div');
        middleDiv.classList.add('middle-circle', 'circle');

        const innerDiv = document.createElement('div');
        innerDiv.classList.add('inner-circle', 'circle');

        container.appendChild(outerDiv);
        outerDiv.appendChild(middleDiv);
        middleDiv.appendChild(innerDiv);
    }


    if (result === 'User') {   
        removeCircles();
        nextBtn.style.display = "block";
        resultText1.textContent = "YOU WIN";
        gameBtn.innerHTML = "PLAY AGAIN";
        gameBtn.style.marginTop = '10px';
        rulesBtn.style.right = '233px';

        const userColorDiv = document.querySelector('.userColor');
        createCircles(userColorDiv);

        userCounter++; 
        userScore.innerHTML = userCounter;  
        localStorage.setItem('userScore', userCounter);
    } else if (result === 'Pc') {
        removeCircles();
        resultText1.textContent = "YOU LOST";
        gameBtn.innerHTML = "PLAY AGAIN";
        gameBtn.style.marginTop = '10px';
        rulesBtn.style.right = '63px';
        
        const pcColorDiv = document.querySelector('.pcColor');
        createCircles(pcColorDiv);

        pcCounter++;  
        pcScore.innerHTML = pcCounter; 
        localStorage.setItem('pcScore', pcCounter);
    } else {
        removeCircles();
        resultText1.textContent = "TIE UP";
        resultText1.style.textAlign = 'center';
        resultText2.style.display="none";
        gameBtn.innerHTML = 'REPLAY';
        gameBtn.style.marginTop = '20px';
        rulesBtn.style.right = '63px';
    }
    }
    window.addEventListener('load', loadScores);
   

    function compareUserAndPcoOptions(userChoice, pcChoice) {

    console.log(`UserChoice is ${userChoice} and PcChoice is ${pcChoice}`);

        if (userChoice === 'rock') {
        userImage.src = 'images/fist.png';  
        userColor.style.borderColor = '#0078ff';
    } else if (userChoice === 'scissors') {
        userImage.src = 'images/peace-sign.png'; 
        userColor.style.borderColor = 'rgb(170, 3, 170)';
    } else if (userChoice === 'paper') {
        userImage.src = 'images/palm-of-hand.png';  
        userColor.style.borderColor = 'orange';
    }

    if (pcChoice === 1) {
        pcImage.src = 'images/fist.png';
        pcColor.style.borderColor = '#0078ff';
    } else if (pcChoice === 2) {
        pcImage.src = 'images/peace-sign.png';
        pcColor.style.borderColor = 'rgb(170, 3, 170)';
    } else if (pcChoice === 3) {
        pcImage.src = 'images/palm-of-hand.png';
        pcColor.style.borderColor = 'orange';
    }

    if (userChoice === 'rock') {
        if (pcChoice === 1) { return 'Tie'; }
        else if (pcChoice === 2) { return 'User'; }
        else if (pcChoice === 3) { return 'Pc'; }
    }
    else if (userChoice === 'scissors') {
        if (pcChoice === 1) { return 'Pc'; }
        else if (pcChoice === 2) { return 'Tie'; }
        else if (pcChoice === 3) { return 'User'; }
    }
    else if (userChoice === 'paper') {
        if (pcChoice === 1) { return 'User'; }
        else if (pcChoice === 2) { return 'Pc'; }
        else if (pcChoice === 3) { return 'Tie'; }
    }
    }


    function removeCircles() {
    const allCircles = document.querySelectorAll('.circle');
    allCircles.forEach(circle => {
        circle.remove();
    });
    }

    gameBtn.addEventListener('click', () => {
        removeCircles();
        resultFrame.style.display = 'none';
        triangleContainer.style.display = 'block';
        gameRulesContainer.style.display = 'block';
        resultText1.textContent = '';
        resultText2.style.display = 'none';
        gameBtn.style.marginTop = '0';
        nextBtn.style.display = 'none';
        userColor.style.borderColor = '';
        pcColor.style.borderColor = '';
        userImage.src = '';
        pcImage.src = '';
        rulesBtn.style.right = '63px';

    });



    closeRulesButton.addEventListener("click", () => {
        gameRulesContainer.style.display = 'none';
    });

    openRulesButton.addEventListener('click', () => {
        gameRulesContainer.style.display = 'block';
    });


    hurrayGameButton.addEventListener('click', () =>{
        section4.style.display = 'none';
        section1.style.display = 'block';
        section2.style.display = 'block';
        section3.style.display = 'block';
        gameRulesContainer.style.display = 'block';
        console.log('play again clicked');
        rulesBtn.style.right = '63px';
    })

    nextBtn.addEventListener('click', () =>{
        section4.style.display = 'block';
        resultFrame.style.display = 'none';
        section1.style.display = 'none';
        section2.style.display = 'none';
        section3.style.display = 'none';
        console.log('next button clicked')
    })





