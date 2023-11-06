let flagName = false;
let flagSex = false;
let flagDate = false;
let flagTg = false;
let flagPhone = false;
let flagAbout = false;



let flag1 = false;
//считаем возраст потерпевшего
function getAge(birthDateString) {
    let today = new Date();
    let birthDate = new Date(birthDateString);

    let age = today.getFullYear() - birthDate.getFullYear(); 
    let monthDifference = today.getMonth() - birthDate.getMonth();


    if (monthDifference < 0 || (monthDifference == 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

//разблокируем кнопку продолжения
function checkForContinue(flagName, flagSex,  flagDate,  flagPhone){
    if (flagPhone && flagName && flagSex && flagDate){
        let button = document.getElementById("continue");
        button.disabled = false;
        button.style.opacity = 1;
    }
    else{
        let button = document.getElementById("continue");
        button.disabled = true;
        button.style.opacity = 0.2;
    }
}

// ща будем проверять инпуты
let input_name_surname = document.getElementById("name_surname");
input_name_surname.addEventListener('input', function(e) {
    let k = validateNameSurname(e.target);
    if(k){
        let name_surname_card = document.getElementById('p_name_data');
        let name_surname_text = document.createElement('p');
        name_surname_text.id = 'p_name_data';
        name_surname_text.textContent = e.target.value;
        name_surname_text.style.color = '#040013';
        name_surname_text.style.fontFamily = 'Museo Sans Cyrl';
        name_surname_text.style.fontSize = '18px';
        name_surname_text.style.fontWeight = '600';
        name_surname_text.style.lineHeight = '22px';
        name_surname_card.replaceWith(name_surname_text);
    }
    checkForContinue(flagName, flagSex, flagDate, flagPhone);
});

function validateNameSurname(input) {
    const regex = /^[A-Za-zА-Яа-я\s\-']*$/;
    const newLocal = `label[for="${input.id}"]`;
    let label = document.querySelector(newLocal);

    if (!regex.test(input.value)) {
        input.classList.add('error');
        label.textContent = "Ошибка: введите только буквы";
        label.style.color = 'red';
        flagName = false;
        return false;
    } else {
        input.classList.remove('error');
        label.textContent = "Имя и фамилия";
        label.style.color = '#5D5B66';
        flagName = true;
        return true;
    }
}

let input_sex1 = document.getElementById("sex1");
let input_sex2 = document.getElementById("sex2");
input_sex1.addEventListener('input', function(e){
    flagSex = true;
    let p_sex = document.getElementById('p_abt_sex');
    let p_male = document.createElement('p');
    p_male.textContent = "Парень";
    p_male.id = "p_abt_sex";
    p_male.classList.add('p_abt');
    p_sex.replaceWith(p_male);
    checkForContinue(flagName, flagSex, flagDate, flagPhone);
    
});
input_sex2.addEventListener('input', function(e){
    flagSex = true;
    let p_sex = document.getElementById('p_abt_sex');
    let p_female = document.createElement('p');
    p_female.textContent = "Девушка";
    p_female.id = "p_abt_sex";
    p_female.classList.add('p_abt');
    p_sex.replaceWith(p_female);
    checkForContinue(flagName, flagSex, flagDate, flagPhone);
});

let input_date = document.getElementById("input_tgm");
input_date.addEventListener('change', function(e){
    const regdate = /^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (regdate.test(e.target.value)){
        flagDate = true;
        let p_age = document.getElementById("age");
        let p_age_text = getAge(e.target.value) + (getAge(e.target.value) % 10 == 1 ? " год" : " лет");
        let p_age_element = document.createElement('p');
        p_age_element.textContent = p_age_text;
        p_age_element.classList.add('p_abt');
        p_age_element.id = 'age';
        p_age.replaceWith(p_age_element);
        checkForContinue(flagName, flagSex, flagDate, flagPhone);
    }
    else{
        flagDate = false;
    }

});



let input_tg = document.getElementById("tg");
input_tg.addEventListener('input', function(e){
    const regtg = /^(@[A-Za-z0-9]*)?$/;
    let labeltg = document.querySelector(`label[for="${e.target.id}"]`);
    if (!regtg.test(e.target.value)){
        flagTg = false;
        e.target.classList.add('error');
        labeltg.textContent = "Ошибка: неверный формат tg (начинать с @)";
        labeltg.style.color = 'red';
    }
    else{
        e.target.classList.remove('error');
        labeltg.textContent = "Телеграм";
        labeltg.style.color ='#5D5B66';
        flagTg = true;
    }
});

// теперь сделаю маску

let input_phone = document.getElementById("number");
input_phone.addEventListener('input', function(e){
    let cursorPosition = e.target.selectionStart;
    let oldValueLength = e.target.value.length;  

    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    
    e.target.value = (x[1] ? '+' : '') + (x[1] ? x[1] + ' ' : '') + 
                     (x[2] ? '(' + x[2] + ')' : '') + 
                     (x[3] ? ' ' + x[3] : '') + 
                     (x[4] ? '-' + x[4] : '') + 
                     (x[5] ? '-' + x[5] : '');
    
    if (e.inputType === "deleteContentBackward") {
        if (e.target.value[cursorPosition - 1] === ' ' || e.target.value[cursorPosition - 1] === '-' || e.target.value[cursorPosition - 1] === '(' || e.target.value[cursorPosition - 1] === ')') {
            cursorPosition--;
        }
        e.target.setSelectionRange(cursorPosition, cursorPosition);
    } else if (e.inputType === "insertText") {
        let diff = e.target.value.length - oldValueLength;
        cursorPosition += diff;
        e.target.setSelectionRange(cursorPosition, cursorPosition);
    }
    validatePhone(e.target);
});

function validatePhone(input) {
    const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    let label = document.querySelector(`label[for="${input.id}"]`)
    if (!regex.test(input.value)) {
        if (input.value != ''){
            input.classList.add('error');
            label.textContent = "Ошибка: введите нормально номер!";
            label.style.color = 'red';
            flagPhone = false;
    
        }else{
            input.classList.add('error');
            label.textContent = "Ошибка: заполните поле!";
            label.style.color = 'red';
            flagPhone = false;
        }
    } else {
        input.classList.remove('error');
        label.textContent = "Номер телефона";
        label.style.color = '#5D5B66';
        flagPhone = true;
        checkForContinue(flagName, flagSex, flagDate, flagPhone);
    }
}

// по идее маска работает. нужны тесты

// текст о себе не вижу смысла проверять. сейчас добавим его в карточку

let input_text_about = document.getElementById("about");
input_text_about.addEventListener('input', function(e){
    let p_abt_text = document.getElementById("p_info");
    let p_new_text = document.createElement('p');
    p_new_text.textContent = e.target.value;
    p_new_text.classList.add('p_info_text');
    p_new_text.id = 'p_info';
    p_abt_text.replaceWith(p_new_text);
});


let button = document.getElementById("continue");
button.addEventListener('click', function(e){
    let oldDiv = document.getElementById("column_one");
    let newDiv = document.createElement('div');
    newDiv.innerHTML = 
    `<form class="form2">
    <div class="div_student_vipusk">
        <label class="text_sex">
            <input type="radio" name="stud" id="stud1" value="Студент/Выпускник">
            Студент/Выпускник
        </label>
        <label class="text_sex">
            <input type="radio" name="stud" id="stud2" value="Работающий">
            Работающий
        </label>
    </div>
    <div class="div_course">
        <p class="p_tell_abt">
            Курс
        </p>
        <div class="div_course_with_gal">
            <div class="div_course_choose">
                <label class="radio_course">
                    <input type="radio" name="course" value="1" id="k1">
                    <span class="radio-indicator"><p class="p_footer_down">1</p></span>
                    
                </label>
                <label class="radio_course">
                    <input type="radio" name="course" value="2" id="k2">
                    <span class="radio-indicator"><p class="p_footer_down">2</p></span>
                    
                </label>
                <label class="radio_course">
                    <input type="radio" name="course" value="3" id="k3">
                    <span class="radio-indicator"><p class="p_footer_down">3</p></span>
                    
                </label>
                <label class="radio_course">
                    <input type="radio" name="course" value="4" id="k4">
                    <span class="radio-indicator"><p class="p_footer_down">4</p></span>
                    
                </label>
                <label class="radio_course">
                    <input type="radio" name="course" value="5" id="k5">
                    <span class="radio-indicator"><p class="p_footer_down">5</p></span>
                    
                </label>
                <label class="radio_course">
                    <input type="radio" name="course" value="6" id="k6">
                    <span class="radio-indicator"><p class="p_footer_down">6</p></span>
                </label>
            </div>
            <div class="div_gal">
                <input type="checkbox">
                <p class="p_footer_down">Я уже смешарик</p>
            </div>
            <div class="div_inputs_dop">
                <div class="div_inputs">
                    <select id="stud" name="studs" class="input_name_surname" placeholder="">
                        <option value="" selected disabled>Выберите элемент...</option>
                        <option value="Бакалавриат">Бакалавриат</option>
                        <option value="Магистратура">Магистратура</option>
                        <option value="Специалитет">Специалитет</option>
                    </select>
                    <label for="stup" class="label">Ступень образования</label>
                </div>
                <div class="div_inputs">
                    <select id="fac" name="facs" class="input_name_surname" placeholder="">
                        <option value="" selected disabled>Выберите элемент...</option>
                        <option value="МИЭМ">МИЭМ</option>
                        <option value="ФКН">ФКН</option>
                    </select>
                    <label for="fac" class="label">Факультет</label>
                </div>
                <div class="div_inputs">
                    <input type="text" id="op" class="input_name_surname" placeholder="">
                    <label for="op" class="label">Образовательная программа</label>
                </div>
            </div>
        </div>
    </div>
    <script src=js/script2.js></script>
</form>`
        newDiv.classList.add("div_column_one");
        oldDiv.parentNode.replaceChild(newDiv, oldDiv);

        let p1 = document.getElementById("need_to_change");
        let p2 = document.createElement('p');
        p2.classList.add('p_extra');
        p2.textContent = "Образование";
        p1.replaceWith(p2);

        let p3 = document.getElementById("change2");
        let p4 = document.createElement('p');
        p4.classList.add('p_dontknow');
        p4.textContent = 'Расскажи, какой ты смешарик';
        p3.replaceWith(p4);

        let p5 = document.getElementById("change3");
        let p6 = document.createElement('p');
        p6.classList.add('p_tell_abt');
        p6.textContent = 'Одинаковым смешарикам гораздо легче ужиться';
        p5.replaceWith(p6);

        let p_em_old = document.getElementById('emoji');
        let p_em_new = document.createElement('p');
        p_em_new.classList.add('p_emoji');
        p_em_new.textContent = '🙂';
        p_em_old.replaceWith(p_em_new);

        let k1 = document.getElementById('k1');
        let k2 = document.getElementById('k2');
        let k3 = document.getElementById('k3');
        let k4 = document.getElementById('k4');
        let k5 = document.getElementById('k5');
        let k6 = document.getElementById('k6');

        let obj = {
            stud : "",
            course : "",
            fac : "",
            op : ""
        }


        function reload(){
            let p_3 = document.getElementById("p_abt_text_course");
            p_3.textContent = obj.course + " " + obj.stud + " " + obj.fac + " " + obj.op;
        }

        k1.addEventListener('input', function(e){
            obj.course = "1 курс";
            reload();
        });

        k2.addEventListener('input', function(e){
            obj.course = "2 курс";
            reload();
        });

        k3.addEventListener('input', function(e){
            obj.course = "3 курс";
            reload();
        });

        k4.addEventListener('input', function(e){
            obj.course = "4 курс";
            reload();
        });

        k5.addEventListener('input', function(e){
            obj.course = "5 курс";
            reload();
        });

        k6.addEventListener('input', function(e){
            obj.course = "6 курс";
            reload();
        });

        let stud1 = document.getElementById("stud");
        stud1.addEventListener("input", function(e){
            if (e.target.value === "Бакалавриат"){
                k5.setAttribute("disabled", "")
                k6.setAttribute("disabled", "")
            }
            else if (e.target.value === "Магистратура"){
                k3.setAttribute("disabled", "")
                k4.setAttribute("disabled", "")
                k5.setAttribute("disabled", "")
                k6.setAttribute("disabled", "")
            }
            else {
                k3.removeAttribute("disabled")
                k4.removeAttribute("disabled")
                k5.removeAttribute("disabled")
                k6.removeAttribute("disabled")
            }
            obj.stud = e.target.value;
            reload();
        });

        let fac1 = document.getElementById("fac");
        fac1.addEventListener("input", function(e){
            obj.fac = e.target.value;
            reload();
        });

        let op1 = document.getElementById("op");
        op1.addEventListener('input', function(e){
            obj.op = e.target.value;
            reload();
        })

});



