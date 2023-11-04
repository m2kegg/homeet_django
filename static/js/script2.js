let k1 = document.getElementById('k1');
let k2 = document.getElementById('k2');
let k3 = document.getElementById('k3');
let k4 = document.getElementById('k4');
let k5 = document.getElementById('k5');
let k6 = document.getElementById('k6');

let obj = new Object(),
course = "",
stud = "",
fac = "",
op = "";


function reload(){
    let p_3 = document.getElementById("p_abt_text_course");
    p_3.textContent = obj[course] + " " + obj[stud] + " " + obj[fac] + " " + obj[op];
}

k1.addEventListener('input', function(e){
   obj[course] = "1 курс";
   reload();
});

k2.addEventListener('input', function(e){
    obj[course] = "2 курс";
    reload();
});

k3.addEventListener('input', function(e){
    obj[course] = "3 курс";
    reload();
});

k4.addEventListener('input', function(e){
    obj[course] = "4 курс";
    reload();
});

k5.addEventListener('input', function(e){
    obj[course] = "5 курс";
    reload();
});

k6.addEventListener('input', function(e){
    obj[course] = "6 курс";
    reload();
});

let stud1 = document.getElementById("stud");
stud1.addEventListener("input", function(e){
    obj[stud] = e.target.value;
    reload();
});

let fac1 = document.getElementById("fac");
fac1.addEventListener("input", function(e){
    obj[fac] = e.target.value;
    reload();
});

let op1 = document.getElementById("op");
op1.addEventListener('input', function(e){
    obj[op] = e.target.value;
    reload();
})
