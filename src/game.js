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
let role = ''; // 'me' or 'opp'
let roundCount = 0;

const emojiMap = {
    '가위': '✌️',
    '바위': '✊',
    '보': '✋'
};

// 1. 시작 버튼
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

// 2. 질문 선택
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

// 3. 게임 선택 화면
rpsGameBtn.addEventListener('click', function () {
    gameSelectScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    document.getElementById('rpsContainer').classList.remove('hidden');
    document.getElementById('marbleContainer').classList.add('hidden');
    showInitialScreen();
});

// 4. 초기 화면
function showInitialScreen() {
    gameText.innerHTML = `${myName} : <br><br>${oppName} :`;
    result.textContent = '';
    playBtn.style.display = 'inline-block';
    homeBtn.classList.add('hidden');
}

// 5. 플레이 버튼 (가위바위보)
playBtn.addEventListener('click', function () {
    let myPick, oppPick;
    const choices = ['가위', '바위', '보'];

    if (roundCount === 0) {
        myPick = '가위';
        oppPick = '가위';
        roundCount++;
        gameText.innerHTML = `${myName} : ${emojiMap[myPick]}<br><br>${oppName} : ${emojiMap[oppPick]}`;
        result.textContent = `${myName} : 무승부네!`;
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
        gameText.innerHTML = `${myName} : ${emojiMap[myPick]}<br><br>${oppName} : ${emojiMap[oppPick]}`;
        result.textContent = '..다시 해보자!';
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
    gameText.innerHTML = `${myName} : ${emojiMap[myPick]}<br><br>${oppName} : ${emojiMap[oppPick]}`;
    checkResult(myPick, oppPick);
});

// 6. 결과 판정
function checkResult(myPick, oppPick) {
    result.textContent = '';
    playBtn.style.display = 'inline-block';

    if (myPick === oppPick) {
        result.textContent = `${myName} : 무승부네!`;
        restartAfter(2500);
        return;
    }

    if (role === 'me') {
        if (oppPick === '보') {
            result.textContent = '..다시 해보자!';
            restartAfter(3000);
        } else if (oppPick === '바위') {
            result.innerHTML = `${myName} : <span class="win">승!</span> ${oppName} : <span class="lose">패</span>`;
            applyWinLoseStyle();
            playBtn.style.display = 'none';
            homeBtn.classList.remove('hidden');
        }
    } else {
        if (myPick === '보') {
            result.textContent = '..다시 해보자!';
            restartAfter(3000);
        } else if (myPick === '바위') {
            result.innerHTML = `${myName} : <span class="lose">패</span> ${oppName} : <span class="win">승!</span>`;
            applyWinLoseStyle();
            playBtn.style.display = 'none';
            homeBtn.classList.remove('hidden');
        }
    }
}

// 7. 승/패 스타일
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

// 8. 홈 버튼
homeBtn.addEventListener('click', function () {
    gameScreen.classList.add('hidden');
    gameSelectScreen.classList.remove('hidden');
    roundCount = 0;
});

// 9. 초기화
function restartAfter(time) {
    setTimeout(() => {
        showInitialScreen();
    }, time);
}
