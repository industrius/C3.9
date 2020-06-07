const city_input = document.querySelector(".city_input") //поле ввода названия города
const city_show_text = document.querySelector(".city_show_text") //отображаемое название города
const city_reset_btn = document.querySelector(".city_show_btn") //кнопка сброса названия города
const arr_checkbox = document.querySelectorAll('[type="checkbox"]') //массив чекбоксов
const save_checkbox_btn = document.querySelector(".btn_pref_save") //кнопка сохранения чекбоксов
const reset = document.querySelector(".reset") //кнопка удаления всех сохраняемых "сущностей" из браузера и сброс всех элементов

// организация методов для работы с куками этого сайта
const cookie = {
    set: function(value){
        document.cookie = "city_name=" + encodeURIComponent(value) + "; path=/; max-age=3600)"
        return cookie.get() ? "cookie created" : undefined;
    },
    get: function(){
        let matches = document.cookie.match(new RegExp('(?:^|\s)' + "city_name" + '=(.*?)(?:;|$)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    del: function(){
        document.cookie = "city_name=''; path=/; max-age=-1"
        return cookie.get() ? undefined : "cookie removed";
    }
}

// При выходе из поля input или нажатии Enter название 
// города сохраняется в куки
city_input.addEventListener("change", () => {
    if (event.target.value){
        city_input.classList.toggle("hide")
        city_show_text.textContent = event.target.value
        city_show_text.classList.toggle("hide")
        city_reset_btn.classList.toggle("hide")
        console.log(cookie.set(event.target.value))
    }    
})

// При нажатии кнопки сброса названия города куки удаляются 
// и поле остается пустым до перезагрузки странички
city_reset_btn.addEventListener("click", () => {
    city_show_text.classList.toggle("hide")
    city_reset_btn.classList.toggle("hide")
    console.log(cookie.del())
})

// Сохранение значений чекбоксов в локальное хранилище
save_checkbox_btn.addEventListener("click", () => {
    localStorage.setItem("saved_before", true) //сохранение признака, что состояние чекбоксов уже сохранено
    arr_checkbox.forEach(item => {
        if (item.checked){
            localStorage.setItem(item.classList, "checked") //сохраняем только включенные чекбоксы
        }
        item.disabled = true //выключаем все чекбоксы, чтобы их нельзя было изменить
    })
    save_checkbox_btn.classList.toggle("hide") //прячем кнопку сохранения чекбоксов
})

//кнопка удаления всех сохраняемых "сущностей" из браузера и сброс всех элементов
reset.addEventListener("click", () => {
    localStorage.clear()
    cookie.del()
    arr_checkbox.forEach(item => {item.checked = false; item.disabled = false})
    location.reload()
})

function init(){
    // Установка имени города из куки если она была сохранена ранее
    let city_name = cookie.get()
    if (city_name){
        // console.log("found cookie, Value is: " + city_name)
        city_show_text.textContent = city_name
    }else{ 
        // Если куки нет то показываем поле ввода названия города
        // console.log("not found cookie")
        city_input.value = ""
        city_show_text.value = ""
        city_input.classList.toggle("hide")
        city_show_text.classList.toggle("hide")
        city_reset_btn.classList.toggle("hide")
    }

    // Проверка локального хранилища на сохраненные данные по чекбоксам
    // если ключ saved_before найден - значит данные уже сохранялись ранее
    if (localStorage.getItem("saved_before")){
        save_checkbox_btn.classList.toggle("hide") //прячем кнопку "Сохранить"
        arr_checkbox.forEach(item => {item.checked = false; item.disabled = true}) //сбрасываем и отключаем все чекбоксы
        for (i=0; i<localStorage.length; i++){ //выставляем значения чекбоксов из локального хранилища
            let key = localStorage.key(i)
            if (key.includes("checkbox")){
                document.querySelector("." + key).checked = true
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", function(event){
    init();
});