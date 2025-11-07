const startScreen = document.getElementById('startScreen');
const questionScreen = document.getElementById('questionScreen');
const gameSelectScreen = document.getElementById('gameSelectScreen');
const gameScreen = document.getElementById('gameScreen');

const myNameInput = document.getElementById('myName');
const oppNameInput = document.getElementById('oppName');

const startBtn = document.getElementById('startBtn');
const chooseMeBtn = document.getElementById('chooseMeBtn');
const chooseOppBtn = document.getElementById('chooseOppBtn');

const rpsGameBtn = document.getElementById('rpsGameBtn');
const marbleGameBtn = document.getElementById('marbleGameBtn');

const playBtn = document.getElementById('playBtn');
const homeBtn = document.getElementById('homeBtn');
const gameText = document.getElementById('gameText');
const result = document.getElementById('result');

let myName = '';
let oppName = '';
let role = '';
let roundCount = 0;

const emojiMap = {
    '가위': '✌️',
    '바위': '✊',
    '보': '✋'
};

startBtn.addEventListener('click', function () {
    myName = myNameInput.value.trim() || '나';
    oppName = oppNameInput.value.trim() || '상대';
    localStorage.setItem('myName', myName);
    localStorage.setItem('oppName', oppName);
    startScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    chooseMeBtn.textContent = myName;
    chooseOppBtn.textContent = oppName;
});

chooseMeBtn.addEventListener('click', function () {
    role = 'me';
    localStorage.setItem('role', role);
    questionScreen.classList.add('hidden');
    gameSelectScreen.classList.remove('hidden');
});

chooseOppBtn.addEventListener('click', function () {
    role = 'opp';
    localStorage.setItem('role', role);
    questionScreen.classList.add('hidden');
    gameSelectScreen.classList.remove('hidden');
});

rpsGameBtn.addEventListener('click', function () {
    gameSelectScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    document.getElementById('rpsContainer').classList.remove('hidden');
    document.getElementById('marbleContainer').classList.add('hidden');

    document.body.style.backgroundColor = '#a8dff5ff';
    showInitialScreen();
});

function showInitialScreen() {
    gameText.innerHTML = `
        ${myName} : <span style="font-size:60px;"> </span><br><br>
        ${oppName} : <span style="font-size:60px;"></span>
    `;
    result.textContent = '';
    playBtn.style.display = 'inline-block';
    homeBtn.classList.add('hidden');
}

playBtn.addEventListener('click', function () {
    let myPick, oppPick;
    const choices = ['가위', '바위', '보'];

    if (roundCount === 0) {
        myPick = '가위';
        oppPick = '가위';
        roundCount++;
        gameText.innerHTML = `${myName} : <span style="font-size:60px;">${emojiMap[myPick]}</span><br><br>${oppName} : <span style="font-size:60px;">${emojiMap[oppPick]}</span>`;
        result.textContent = `${myName} : 헉! 역시 우린 천생연분?! 무승부네!`;
        restartAfter(2500);
        return;
    }

    if (roundCount === 1) {
        if (role === 'me') {
            myPick = '가위';
            oppPick = '보';
        } else {
            myPick = '보';
            oppPick = '가위';
        }
        roundCount++;
        gameText.innerHTML = `${myName} : <span style="font-size:60px;">${emojiMap[myPick]}</span><br><br>${oppName} : <span style="font-size:60px;">${emojiMap[oppPick]}</span>`;
        result.textContent = '큼... 다시 해보자!';
        restartAfter(3000);
        return;
    }

    if (role === 'me') {
        myPick = '가위';
        oppPick = choices[Math.floor(Math.random() * 3)];
    } else {
        myPick = choices[Math.floor(Math.random() * 3)];
        oppPick = '가위';
    }
    gameText.innerHTML = `${myName} : <span style="font-size:60px;">${emojiMap[myPick]}</span><br><br>${oppName} : <span style="font-size:60px;">${emojiMap[oppPick]}</span>`;
    checkResult(myPick, oppPick);
});

function checkResult(myPick, oppPick) {
    result.textContent = '';
    playBtn.style.display = 'inline-block';

    if (myPick === oppPick) {
        result.textContent = `${myName} : 무승부네!`;
        restartAfter(2500);
        return;
    }

    if (role === 'me') {
        if (oppPick === '바위') {
            result.innerHTML = `${myName} : <span class="lose">패</span> ${oppName} : <span class="win">승!</span><br><br>(아무래도..더 조아하는 쪽이 늘 질 수밖에 없는 탓일까...?)`;
            applyWinLoseStyle();
            playBtn.style.display = 'none';
            homeBtn.classList.remove('hidden');
        } else {
            result.textContent = '음...ㅎㅎ 다시 해볼까?';
            restartAfter(3000);
        }
    } else {
        if (myPick === '바위') {
            result.innerHTML = `${myName} : <span class="win">승!</span> ${oppName} : <span class="lose">패</span><br><br>(아무래도..더 조아하는 쪽이 늘 질 수밖에 없는 탓일까...?)`;
            applyWinLoseStyle();
            playBtn.style.display = 'none';
            homeBtn.classList.remove('hidden');
        } else {
            result.textContent = '큼.. 다시 해볼까?';
            restartAfter(3000);
        }
    }
}

function applyWinLoseStyle() {
    const loseSpan = result.querySelector('.lose');
    if (loseSpan) {
        loseSpan.style.color = 'red';
        loseSpan.style.fontSize = '30px';
        loseSpan.style.fontWeight = 'bold';
    }

    const winSpan = result.querySelector('.win');
    if (winSpan) {
        winSpan.style.color = 'blue';
        winSpan.style.fontSize = '30px';
        winSpan.style.fontWeight = 'bold';
    }

    result.style.marginTop = '40px';
    result.style.textAlign = 'center';
}

homeBtn.addEventListener('click', function () {
    gameScreen.classList.add('hidden');
    gameSelectScreen.classList.remove('hidden');
    roundCount = 0;

    document.body.style.backgroundColor = '#FFFFFF';
});

function restartAfter(time) {
    setTimeout(() => {
        showInitialScreen();
    }, time);
}
