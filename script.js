const medium_nickname = document.querySelector('#medium');
const nicks_array = document.querySelectorAll(".nickname");
const main_btn = document.querySelector('#main-btn');
const prev_btn = document.querySelector('#prev-btn');
const textarea = document.querySelector('#styles-area');

var prevStyle = new Map();

medium_nickname.onclick = function() {
    let question = prompt('Введите ник');
    if (question.length > 0) {
        nicks_array.forEach(nick => {
            nick.innerText = question
        })
    }
}

// Замена стилей при клике и добавление стиля в TextArea
main_btn.onclick = () => {

    // Добавление предыдущего стиля в Map
    prevStyle.delete('col_style')
    prevStyle.delete('sh_style')
    prevStyle.delete('bg_style')

    prevStyle.set('col_style', nicks_array[0].style.color);
    prevStyle.set('sh_style', nicks_array[0].style.textShadow);
    prevStyle.set('bg_style', nicks_array[0].style.background);

    textarea.innerHTML = '';
    const color = randint(0, 1);
    const shadow = randint(0, 1);
    const background = randint(0, 1);

    const colorAttr = random_color('rgb');
    const shadowAttr = textShadow();
    const backgroundAttr = backgroundFunc();

    let col_style = '';
    let sh_style = '';
    let bg_style = '';

    nicks_array.forEach(nick => {
        nick.style = "" // Убирает стили перед новыми
        if (color === 1 && background != 1) {
            nick.style.color = colorAttr
            col_style = `color: ${colorAttr}`
        }
        if (shadow === 1) {
            nick.style.textShadow = shadowAttr
            sh_style = `text-shadow: ${shadowAttr}`
        }
        if (background === 1) {
            nick.style.background = backgroundAttr
            nick.style.setProperty('-webkit-background-clip', 'text')
            nick.style.setProperty('-webkit-text-fill-color', 'transparent')
            bg_style = `background: ${backgroundAttr}\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;`
        }
        if (color != 1 && shadow != 1 && background != 1) {
            sh_style = `text-shadow: ${shadowAttr}`
            nick.style.background = backgroundAttr
            nick.style.setProperty('-webkit-background-clip', 'text')
            nick.style.setProperty('-webkit-text-fill-color', 'transparent')
            bg_style = `background: ${backgroundAttr}\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;`
        }
    })

    //Добавление стилей в TextArea
    if (col_style != '') {
        textarea.innerHTML += `${col_style}\n`
    }
    if (sh_style != '') {
        textarea.innerHTML += `${sh_style}\n`
    }
    if (bg_style != '') {
        textarea.innerHTML += `${bg_style}\n`
    }   
}

// Возврат предыдущего стиля
prev_btn.onclick = () => {
    nicks_array.forEach(nick => {
        nick.style.removeProperty('color')
        nick.style.removeProperty('text-shadow')
        nick.style.removeProperty('background')
        nick.style.removeProperty('-webkit-background-clip')
        nick.style.removeProperty('-webkit-text-fill-color')
        nick.style.removeProperty('background-clip')

        if (!!prevStyle.get('col_style')) {
            nick.style.color = prevStyle.get('col_style')
        }
        if (!!prevStyle.get('sh_style')) {
            nick.style.textShadow = prevStyle.get('sh_style')
        }
        if (!!prevStyle.get('bg_style')) {
            nick.style.background = prevStyle.get('bg_style').replace('text', '')
            nick.style.setProperty('-webkit-background-clip', 'text')
            nick.style.setProperty('-webkit-text-fill-color', 'transparent')
        }
    })

    textarea.innerHTML = ''

    if (!!nicks_array[0].style.color) {
        textarea.innerHTML += `color: ${nicks_array[0].style.color}\n`
    }
    if (!!nicks_array[0].style.textShadow) {
        textarea.innerHTML += `text-shadow: ${nicks_array[0].style.textShadow}\n`
    }
    if (!!nicks_array[0].style.background) {
        console.log(nicks_array[0].style.background)
        textarea.innerHTML += `background: ${nicks_array[0].style.background}\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;`
    }
}

// функция выбора рандомного числа
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция выбора из массива
function choice(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

//генератор
function random_color(type=NaN) {
    if (type === 'rgb') {
        return `rgb(${randint(1, 255)}, ${randint(1, 255)}, ${randint(1, 255)})`
    }
    if  (type === 'rgba') {
        return `rgba(${randint(1, 255)}, ${randint(1, 255)}, ${randint(1, 255)}, 0.${randint(1, 9)})`
    }
}

// генератор
function shadowGenerator() {
    return `${randint(1, 6)}px ${randint(1, 6)}px ${randint(1, 10)}px ${random_color('rgba')}`
}

// Линейный градиент
function linearGradient() {
    const type = randint(1, 2)
    let string = `linear-gradient(${randint(-360, 360)}deg, `
    
    if (type === 1) { // Градиент с неограниченным кол-вом цветов
        let num = randint(1, 5)
        for (let i = 0; i < num + 1; i++) {
            if (i != num) {
                string += random_color('rgba') + ", "
            }
            if (i == num) {
                string += random_color('rgba') + ")"
            }
        }
    }
    if (type == 2) { // Обычный градиент из 2х цветов
        string += `${random_color('rgba')} ${randint(0, 100)}%, ${random_color('rgba')} ${randint(0, 100)}%)`
    }
    return string
}

// Радиальный градиент
function radialGradient() {
    const type = 2
    let string = "radial-gradient("

    if (type === 1) { // Градиент с неограниченным кол-вом цветов
        let num = randint(1, 4)
        for (let i = 0; i < num + 1; i++) {
            if (i != num) {
                string += random_color('rgba') + ", "
            }
            if (i == num) {
                string += random_color('rgba') + ")"
            }
        }
    }
    if (type == 2) { // Обычный градиент из 2х цветов
        let max = randint(10, 100)
        let min = randint(1, max)
        string += `circle ${randint(10, 100)}px, ${random_color('rgb')} ${min}%, ${random_color('rgb')} ${max}%)`
    }
    return string
}

//Тень
function textShadow() {
    let string = ""
    const num = randint(1, 10)
    for (let i =0; i < num + 1; i++) {
        let shadow = shadowGenerator()
        if (i != num) {
            string += shadow + ", "
        }
        if (i == num) {
            string += shadow
        }
    }
    return string
}


function backgroundFunc() {
    let string = ""
    const num = randint(1, 3)
    const type = randint(1, 4)
    if (type == 1) { // Линейные градиенты
        for (let i =0; i < num + 1; i++) {
            if (i != num) {
                string += linearGradient() + ", "
            }
            if (i == num) {
                string += linearGradient()
            }
        }
    }
    if (type == 2) { // Радиальные градиенты
        for (let i =0; i < num + 1; i++) {
            if (i != num) {
                string += radialGradient() + ", "
            }
            if (i == num) {
                string += radialGradient()
            }
        }
    }
    if (type == 3) { // Одиночный линейный градиент
        string += linearGradient()
    }
    if (type == 4) { // Одиночный радиальный градиент
        string += radialGradient()
    }

    return string
}

// Копирование стиля при клике на TextArea
textarea.onclick = () => {
    textarea.select()
    document.execCommand('copy')
}