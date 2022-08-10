const original_nickname = document.querySelector('#original');
const nicks_array = document.querySelectorAll(".nickname");

const main_btn = document.querySelector('#main-btn');
const prev_btn = document.querySelector('#prev-btn');
const settings_btn = document.querySelector('#settings-btn')

const textarea = document.querySelector('#styles-area');

var input = document.querySelector('input');
input.addEventListener('input', resizeInput);
resizeInput.call(input);


// Кнопки настроек
let changeColorButton
let changeShadowButton
let changeBackgroundButton

let color_is_active = 0
let shadow_is_active = 1
let background_is_active = 1


function resizeInput() {
    this.style.width = this.value.length + 10 + "ch";
}

document.querySelectorAll('.settings span').forEach(settings_button => {
    if (settings_button.innerText == 'color') {
        console.log(1)
        changeColorButton = settings_button
        color_is_active = 0
    }
    if (settings_button.innerHTML === 'shadow') {
        changeShadowButton = settings_button
        shadow_is_active = 1
    }
    if (settings_button.innerHTML === 'background') {
        changeBackgroundButton = settings_button
        background_is_active = 1
    }
})

changeColorButton.onclick = () => {
    if (color_is_active === 1) {
        color_is_active = 0
        changeColorButton.classList.remove('btn_active')
    } else {
        color_is_active = 1
        changeColorButton.classList.add('btn_active')
    }
}
changeShadowButton.onclick = () => {
    if (shadow_is_active === 1) {
        shadow_is_active = 0
        changeShadowButton.classList.remove('btn_active')
    } else {
        shadow_is_active = 1
        changeShadowButton.classList.add('btn_active')
    }
}
changeBackgroundButton.onclick = () => {
    if (background_is_active === 1) {
        background_is_active = 0
        changeBackgroundButton.classList.remove('btn_active')
    } else {
        background_is_active = 1
        changeBackgroundButton.classList.add('btn_active')
    }
}

// Словарь с предыдущем стилем
var prevStyle = new Map();

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

    const colorAttr = random_color('rgb');
    const shadowAttr = textShadow();
    const backgroundAttr = backgroundFunc();

    let col_style = '';
    let sh_style = '';
    let bg_style = '';

    nicks_array.forEach(nick => {
        // Убирает прошлый стиль перед новой генерацией
        nick.style = ""
        if (color_is_active === 1) {
            nick.style.color = colorAttr
            col_style = `color: ${colorAttr};`
        }
        if (shadow_is_active === 1) {
            nick.style.textShadow = shadowAttr
            sh_style = `text-shadow: ${shadowAttr};`
        }
        if (background_is_active === 1) {
            nick.style.background = backgroundAttr
            nick.style.setProperty('-webkit-background-clip', 'text')
            nick.style.setProperty('-webkit-text-fill-color', 'transparent')
            bg_style = `background: ${backgroundAttr};\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;`
        }
        if (color_is_active === 0 && background_is_active === 0 && shadow_is_active === 0) {
            textarea.innerHTML = 'Выбери хотя бы один атрибут!'
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
        textarea.innerHTML += `color: ${nicks_array[0].style.color};\n`
    }
    if (!!nicks_array[0].style.textShadow) {
        textarea.innerHTML += `text-shadow: ${nicks_array[0].style.textShadow};\n`
    }
    if (!!nicks_array[0].style.background) {
        console.log(nicks_array[0].style.background)
        textarea.innerHTML += `background: ${nicks_array[0].style.background.replace('text', '')};\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;`
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

// генератор теней
function shadowGenerator() {
    return `${randint(1, 6)}px ${randint(1, 6)}px ${randint(1, 10)}px ${random_color('rgba')}`
}

// Линейный градиент
function linearGradient() {
    const type = randint(1, 2)
    let string = `linear-gradient(${randint(-360, 360)}deg, `
    
    // Градиент с неограниченным кол-вом цветов
    if (type === 1) {
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
    // Обычный градиент из 2х цветов
    if (type == 2) {
        string += `${random_color('rgba')} ${randint(0, 100)}%, ${random_color('rgba')} ${randint(0, 100)}%)`
    }
    return string
}

// Радиальный градиент
function radialGradient() {
    const type = 2
    let string = "radial-gradient("

    // Градиент с неограниченным кол-вом цветов
    if (type === 1) {
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
    // Обычный градиент из 2х цветов
    if (type == 2) {
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
    // Линейные градиенты
    if (type == 1) {
        for (let i =0; i < num + 1; i++) {
            if (i != num) {
                string += linearGradient() + ", "
            }
            if (i == num) {
                string += linearGradient()
            }
        }
    }
    // Радиальные градиенты
    if (type == 2) {
        for (let i =0; i < num + 1; i++) {
            if (i != num) {
                string += radialGradient() + ", "
            }
            if (i == num) {
                string += radialGradient()
            }
        }
    }
    // Одиночный линейный градиент
    if (type == 3) {
        string += linearGradient()
    }
    // Одиночный радиальный градиент
    if (type == 4) {
        string += radialGradient()
    }

    return string
}

// Копирование стиля при клике на TextArea
textarea.onclick = () => {
    textarea.select()
    document.execCommand('copy')
}

// Открытие поля настроек
settings_btn.onclick = () => {
    const settings = document.querySelector('#settings')
    if (settings.classList.contains('hide')) {
        settings.classList.remove('hide')
    } else {
        settings.classList.add('hide')
    }
}