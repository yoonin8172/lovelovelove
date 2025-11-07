// src/game3.js
document.addEventListener('DOMContentLoaded', () => {
    const petalGameBtn = document.getElementById('petalGameBtn');
    const petalContainer = document.getElementById('petalContainer');
    const petalText = document.getElementById('petalText');       // <h3> 영역
    const petalStartBtn = document.getElementById('petalStartBtn');
    const petalArea = document.getElementById('petalArea');     // 이모지+카운트 표시영역
    const petalResult = document.getElementById('petalResult');
    const petalHomeBtn = document.getElementById('petalHomeBtn');

    // 새 오프닝 버튼
    const petalOpeningBtn = document.createElement('button');
    petalOpeningBtn.textContent = '처음으로';
    petalOpeningBtn.style.display = 'none';
    petalOpeningBtn.style.marginTop = '10px';
    petalOpeningBtn.style.padding = '10px 20px';
    petalOpeningBtn.style.fontSize = '16px';
    petalOpeningBtn.style.cursor = 'pointer';
    petalContainer.appendChild(petalOpeningBtn);

    const possiblePetals = [6, 8, 10, 12];
    let petalTotal = 0;
    let touchCount = 0;
    let turnIsLessLoving = true; // 첫 터치는 '덜 사랑하는 사람' 표시

    // 진입 — 게임 선택 화면에서 꽃잎 게임 버튼 눌렀을 때
    petalGameBtn.addEventListener('click', () => {
        gameSelectScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');

        document.getElementById('rpsContainer').classList.add('hidden');
        document.getElementById('marbleContainer').classList.add('hidden');

        petalContainer.classList.remove('hidden');

        petalText.textContent = '꽃잎 세기 게임';
        petalResult.textContent = '';
        petalArea.innerHTML = '';
        petalStartBtn.classList.remove('hidden');
        petalHomeBtn.classList.add('hidden');
        petalOpeningBtn.style.display = 'none';

        petalTotal = 0;
        touchCount = 0;
        turnIsLessLoving = true;
    });

    // 시작 버튼
    petalStartBtn.addEventListener('click', () => {
        petalStartBtn.classList.add('hidden');

        petalTotal = possiblePetals[Math.floor(Math.random() * possiblePetals.length)];
        touchCount = 0;
        turnIsLessLoving = true;
        petalResult.textContent = '';

        // 꽃잎 수 ?로 표시 + 이미지 쌓이는 컨테이너
        petalArea.innerHTML = `
            <div id="petalEmoji" style="user-select:none; display:block;">🌸</div>
            <div id="petalCountText" style="margin-top:10px;font-size:18px;">꽃잎 수: ?</div>
            <div id="petalImageContainer" style="margin-top:10px;"></div>
        `;

        const emojiEl = petalArea.querySelector('#petalEmoji');
        const imageContainer = petalArea.querySelector('#petalImageContainer');

        emojiEl.style.cursor = 'pointer';
        emojiEl.style.fontSize = '100px';
        emojiEl.replaceWith(emojiEl.cloneNode(true));
        const freshEmoji = petalArea.querySelector('#petalEmoji');

        // 클릭/터치 핸들러
        const onTouch = () => {
            const currentMyName = (typeof myName !== 'undefined' && myName) ? myName : (localStorage.getItem('myName') || '나');
            const currentOppName = (typeof oppName !== 'undefined' && oppName) ? oppName : (localStorage.getItem('oppName') || '상대');
            const currentRole = (typeof role !== 'undefined') ? role : (localStorage.getItem('role') || 'me');

            const moreLoving = (currentRole === 'me') ? currentMyName : currentOppName;
            const lessLoving = (currentRole === 'me') ? currentOppName : currentMyName;

            if (touchCount >= petalTotal) return; // 이미 끝났으면 아무 일도 안 함

            touchCount++;

            // 번갈아가며 텍스트 표시
            if (turnIsLessLoving) {
                petalResult.textContent = `${lessLoving} 이(가) 더 사랑한다`;
            } else {
                petalResult.textContent = `${moreLoving} 이(가) 더 사랑한다`;
            }
            turnIsLessLoving = !turnIsLessLoving;

            // 이미지 추가 (아래쪽으로 쌓이게)
            const img = document.createElement('img');
            img.src = 'images/petal.png';
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.margin = '2px';
            img.style.verticalAlign = 'middle';
            imageContainer.appendChild(img);

            // 마지막 터치 판정
            if (touchCount >= petalTotal) {
                if (freshEmoji) freshEmoji.style.pointerEvents = 'none';
                setTimeout(() => {
                    petalResult.innerHTML = `<div style="font-weight:700; margin-top:8px;">${moreLoving} 이(가) 훨씬 더 사랑하는 거 맞네~<br>꽃잎 개수: ${petalTotal}</div>`;
                    petalHomeBtn.classList.remove('hidden');
                    petalOpeningBtn.style.display = 'inline-block';
                }, 700);
            }
        };

        if (freshEmoji) {
            freshEmoji.addEventListener('pointerup', onTouch);
            freshEmoji.tabIndex = 0;
            freshEmoji.addEventListener('keyup', (e) => {
                if (e.key === 'Enter' || e.key === ' ') onTouch();
            });
        }
    });

    // 홈 버튼 — 선택 화면으로
    petalHomeBtn.addEventListener('click', () => {
        petalContainer.classList.add('hidden');
        gameScreen.classList.add('hidden');
        gameSelectScreen.classList.remove('hidden');

        petalText.textContent = '';
        petalArea.innerHTML = '';
        petalResult.textContent = '';
        petalStartBtn.classList.remove('hidden');
        petalHomeBtn.classList.add('hidden');
        petalOpeningBtn.style.display = 'none';

        petalTotal = 0;
        touchCount = 0;
        turnIsLessLoving = true;
    });

    // 오프닝 버튼 — 맨 처음 페이지로
    petalOpeningBtn.addEventListener('click', () => {
        petalContainer.classList.add('hidden');
        gameScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');

        petalText.textContent = '';
        petalArea.innerHTML = '';
        petalResult.textContent = '';
        petalStartBtn.classList.remove('hidden');
        petalHomeBtn.classList.add('hidden');
        petalOpeningBtn.style.display = 'none';

        petalTotal = 0;
        touchCount = 0;
        turnIsLessLoving = true;
    });
});
