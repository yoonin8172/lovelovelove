document.addEventListener('DOMContentLoaded', () => {
    const marbleGameBtn = document.getElementById('marbleGameBtn');

    const marbleContainer = document.getElementById('marbleContainer');
    const marbleGameText = document.getElementById('marbleGameText');
    const marbleResult = document.getElementById('marbleResult');

    let clickCount = 0;
    let marbleFound = false;
    let starter = '';

    marbleGameBtn.addEventListener('click', () => {
        gameSelectScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');

        document.getElementById('rpsContainer').classList.add('hidden');
        marbleContainer.classList.remove('hidden');

        startMarbleGame();
    });

    function startMarbleGame() {
        clickCount = 0;
        marbleFound = false;
        marbleGameText.innerHTML = '';
        marbleResult.textContent = '';

        starter = role === 'me' ? myName : oppName;
        marbleGameText.innerHTML = `‘${starter}’ 먼저 게임을 시작합니다.<br><br>`;

        const startBtn = document.createElement('button');
        startBtn.textContent = '시작';
        startBtn.style.padding = '12px 20px';
        startBtn.style.fontSize = '18px';
        startBtn.style.cursor = 'pointer';
        startBtn.style.display = 'block';
        startBtn.style.margin = '20px auto';
        marbleGameText.appendChild(startBtn);

        startBtn.addEventListener('click', () => {
            showCupsFirstRound();
        });
    }

    function showCupsFirstRound() {
        marbleGameText.innerHTML = '';
        marbleResult.textContent = '';

        const cupContainer = document.createElement('div');
        cupContainer.style.position = 'relative';
        cupContainer.style.display = 'flex';
        cupContainer.style.justifyContent = 'center';
        cupContainer.style.gap = '40px';
        cupContainer.style.marginTop = '40px';

        for (let i = 0; i < 3; i++) {
            const cup = document.createElement('span');
            cup.textContent = '🥛';
            cup.style.fontSize = '100px';
            cup.style.cursor = 'pointer';
            cup.style.transform = 'rotate(180deg)';
            cup.style.position = 'relative';

            if (i === 1) cup.style.opacity = '0.5';
            else cup.style.opacity = '1';

            if (i === 0 || i === 2) {
                cup.addEventListener('click', () => {
                    marbleResult.textContent = '땡!';
                    setTimeout(() => {
                        marbleResult.textContent = '';
                        showCupsSecondRound();
                    }, 1000);
                });
            }

            cupContainer.appendChild(cup);
        }

        // 구슬을 가운데 컵에 넣고 역회전 적용
        const marble = document.createElement('span');
        marble.textContent = '🔮';
        marble.style.opacity = '0.5';
        marble.style.fontSize = '40px';
        marble.style.position = 'absolute';
        marble.style.transform = 'translate(-3px,50px)'; // 위치 및 역회전
        cupContainer.appendChild(marble);

        marbleGameText.appendChild(cupContainer);
    }

    function showCupsSecondRound() {
        marbleGameText.innerHTML = '';
        marbleResult.textContent = '';
        clickCount = 0;

        const infoText = document.createElement('div');
        infoText.textContent = '이번에는 상대의 차례입니다.';
        infoText.style.textAlign = 'center';
        infoText.style.marginBottom = '20px';
        marbleGameText.appendChild(infoText);

        const cupContainer = document.createElement('div');
        cupContainer.style.position = 'relative';
        cupContainer.style.display = 'flex';
        cupContainer.style.justifyContent = 'center';
        cupContainer.style.gap = '40px';
        cupContainer.style.marginTop = '40px';

        for (let i = 0; i < 3; i++) {
            const cup = document.createElement('span');
            cup.textContent = '🥛';
            cup.style.fontSize = '100px';
            cup.style.cursor = 'pointer';
            cup.style.transform = 'rotate(180deg)';
            cup.style.position = 'relative';
            cupContainer.appendChild(cup);

            cup.addEventListener('click', handleCupClick);
        }

        marbleGameText.appendChild(cupContainer);
    }

    function handleCupClick() {
        clickCount++;

        // 덜 사랑하는 사람인지 판단
        const isLessLoving = (role === 'me' && starter !== myName) || (role === 'opp' && starter !== oppName);

        // 덜 사랑하는 사람 3번째 클릭에서 무조건 찾기
        if (isLessLoving && clickCount === 3) {
            marbleResult.innerHTML = `찾았다! 🔮`;
            marbleFound = true;
            showEndButton();
            return;
        }

        if (clickCount <= 2) {
            marbleResult.textContent = '..다시 골라봐';
            disableCupsTemporarily(2500);
            return;
        }

        const rand = Math.random();
        if (rand < 0.2) {
            marbleResult.textContent = '..진짜 다시 골라봐;';
            disableCupsTemporarily(2500);
        } else {
            marbleResult.innerHTML = `찾았다! 🔮`;
            marbleFound = true;
            showEndButton();
        }
    }

    function disableCupsTemporarily(time) {
        const cups = marbleGameText.querySelectorAll('span');
        cups.forEach(cup => cup.style.pointerEvents = 'none');
        setTimeout(() => {
            cups.forEach(cup => cup.style.pointerEvents = 'auto');
            marbleResult.textContent = '';
        }, time);
    }

    function showEndButton() {
        const endBtn = document.createElement('button');
        endBtn.textContent = '끝내기';
        endBtn.style.display = 'block';
        endBtn.style.margin = '30px auto';
        endBtn.style.padding = '10px 20px';
        endBtn.style.fontSize = '16px';
        endBtn.style.cursor = 'pointer';

        marbleGameText.appendChild(endBtn);

        endBtn.addEventListener('click', () => {
            marbleContainer.classList.add('hidden');
            startScreen.classList.remove('hidden');
            marbleResult.textContent = '';
            marbleGameText.textContent = '';
            endBtn.remove();
        });
    }

});
