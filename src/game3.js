document.addEventListener('DOMContentLoaded', () => {
    const petalGameBtn = document.getElementById('petalGameBtn');
    const petalContainer = document.getElementById('petalContainer');
    const petalText = document.getElementById('petalText');
    const petalStartBtn = document.getElementById('petalStartBtn');
    const petalArea = document.getElementById('petalArea');
    const petalResult = document.getElementById('petalResult');
    const petalHomeBtn = document.getElementById('petalHomeBtn');

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
    let turnIsLessLoving = true;


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

        document.body.style.backgroundColor = '#ffe4e8ff';
    });

    petalStartBtn.addEventListener('click', () => {
        petalStartBtn.classList.add('hidden');

        petalTotal = possiblePetals[Math.floor(Math.random() * possiblePetals.length)];
        touchCount = 0;
        turnIsLessLoving = true;
        petalResult.textContent = '';


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


        const onTouch = () => {
            const currentMyName = (typeof myName !== 'undefined' && myName) ? myName : (localStorage.getItem('myName') || '나');
            const currentOppName = (typeof oppName !== 'undefined' && oppName) ? oppName : (localStorage.getItem('oppName') || '상대');
            const currentRole = (typeof role !== 'undefined') ? role : (localStorage.getItem('role') || 'me');

            const moreLoving = (currentRole === 'me') ? currentMyName : currentOppName;
            const lessLoving = (currentRole === 'me') ? currentOppName : currentMyName;

            if (touchCount >= petalTotal) return;

            touchCount++;


            if (turnIsLessLoving) {
                petalResult.textContent = `${lessLoving} 이(가) 더 사랑한다...`;
            } else {
                petalResult.textContent = `${moreLoving} 이(가) 더 사랑한다...`;
            }
            turnIsLessLoving = !turnIsLessLoving;


            const img = document.createElement('img');
            img.src = 'images/petal.png';
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.margin = '2px';
            img.style.verticalAlign = 'middle';
            imageContainer.appendChild(img);


            if (touchCount >= petalTotal) {
                if (freshEmoji) freshEmoji.style.pointerEvents = 'none';
                setTimeout(() => {
                    petalResult.innerHTML = `<div style="font-weight:700; margin-top:8px;">모야 ~ ${moreLoving} 이(가) 더 사랑하는 거 맞자나 ~
                    ꒰ა ₍ ⁄ᐢ⁄~⁄ᐢ⁄ ₎ ໒꒱ <br>꽃잎 개수: ${petalTotal}</div>`;
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


        document.body.style.backgroundColor = '';
    });


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


        document.body.style.backgroundColor = '';
    });
});
