const city_input = document.querySelector(".city_input")
const city_show_text = document.querySelector(".city_show_text")
const city_reset_btn = document.querySelector(".city_show_btn")
document.querySelectorAll('[type="checkbox"]').addEventListener("checked", saveCheckBox)

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

city_input.addEventListener("change", () => {
    if (event.target.value){
        city_input.classList.toggle("hide")
        city_show_text.textContent = event.target.value
        city_show_text.classList.toggle("hide")
        city_reset_btn.classList.toggle("hide")
        console.log(cookie.set(event.target.value))
    }    
})

city_reset_btn.addEventListener("click", () => {
    city_show_text.classList.toggle("hide")
    city_reset_btn.classList.toggle("hide")
    console.log(cookie.del())
})

function init(){
    let city_name = cookie.get()
    if (city_name){
        console.log("found cookie, Value is: " + city_name)
        city_show_text.textContent = city_name
    }else{
        console.log("not found cookie")
        city_input.value = ""
        city_show_text.value = ""
        city_input.classList.toggle("hide")
        city_show_text.classList.toggle("hide")
        city_reset_btn.classList.toggle("hide")
    }

};

document.addEventListener("DOMContentLoaded", function(event){
    init();
});