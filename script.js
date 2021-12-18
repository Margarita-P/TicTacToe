window.addEventListener('DOMContentLoaded', () => {
    const langelis = Array.from(document.querySelectorAll('.langelis'));
    const playerDisplay = document.querySelector('.display-player');
    const valytiMygtukas = document.querySelector('#valyti');
    const laimetojoPranesimas = document.querySelector('.laimetojas');

    let lenta = ['', '', '', '', '', '', '', '', ''];
    let zaidejas = 'X';
    let isGameActive = true;
    let taskaiX = 0;
    let taskaiO = 0;

    const LaimejoX = '1';
    const LaimejoO = '2';
    const Lygiosios = '3';

    const laimejimoKombinacijos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function CounterX() {
        document.getElementById("taskuLentaX").innerHTML = taskaiX;
    }
    function CounterO() {
        document.getElementById("taskuLentaO").innerHTML = taskaiO;
    }

    function tikrintiArYraLaimetojas() {
        let laimetojasYra = false;
        for (let i = 0; i <= 7; i++) {
            const t = laimejimoKombinacijos[i];
            const a = lenta[t[0]];
            const b = lenta[t[1]];
            const c = lenta[t[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                laimetojasYra = true;
                break;
            }
        }

    if (laimetojasYra) {
        if(zaidejas === 'X') {
            pranesti(LaimejoX);
        }
        else {
            pranesti(LaimejoO);
        }
            isGameActive = false;
            CounterX();
            CounterO();
            return;
        }

    if (!lenta.includes(''))
        pranesti(Lygiosios);
    }

    function pranesti (type) {
        if(type === LaimejoX) {
            laimetojoPranesimas.innerHTML = '<span class="playerX">X</span> laimėjo!';
            taskaiX++; 
        }
        else if(type === LaimejoO) {
            laimetojoPranesimas.innerHTML = '<span class="playerO">O</span> laimėjo!';
            taskaiO++;
        }
        else if(type === Lygiosios) {
            laimetojoPranesimas.innerText = 'Lygiosios!';
        }
        laimetojoPranesimas.classList.remove('paslepti');
    };

    function tikrintiVeiksma (langelis) {
        if (langelis.innerText === 'X' || langelis.innerText === 'O'){
            return false;
        }
        return true;
    };

    function keistiZaideja () {
        playerDisplay.classList.remove(`player${zaidejas}`);
        if(zaidejas === 'X') {
            zaidejas = 'O';
        }
        else if(zaidejas === 'O') {
            zaidejas = 'X';
        }
        playerDisplay.innerText = zaidejas;
        playerDisplay.classList.add(`player${zaidejas}`);
    }

    function veiksmas (langelis, index) {
            if(tikrintiVeiksma(langelis) && isGameActive) {
                langelis.innerText = zaidejas;
                langelis.classList.add(`player${zaidejas}`);
                lenta[index] = zaidejas;
                tikrintiArYraLaimetojas();
                keistiZaideja();
            }
    }

    function valytiLenta () {
        lenta = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        laimetojoPranesimas.classList.add('paslepti');

        if (zaidejas === 'O') {
            keistiZaideja();
        }

        langelis.forEach(langelis => {
            langelis.innerText = '';
            langelis.classList.remove('playerX');
            langelis.classList.remove('playerO');
        });
    }

    langelis.forEach( (langelis, index) => {
        langelis.addEventListener('click', () => veiksmas(langelis, index));
    });

    valytiMygtukas.addEventListener('click', valytiLenta);
});