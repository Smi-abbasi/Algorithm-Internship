let water = 0;
let waterGoal=2500;

let waterTip = document.getElementById("waterTip");
let habitTip = document.getElementById("habitTip");
let calorieTip = document.getElementById("calorieTip");

let savedWater=localStorage.getItem("water");
if(savedWater!==null){
    water=Number(savedWater);
}

let waterAmount=document.getElementById("waterAmount");
let waterProgress=document.getElementById("waterProgress");
let waterPercentage=document.getElementById("waterPercentage");
let waterMessage=document.getElementById("waterMessage");

let add250=document.getElementById("add250");
let add500=document.getElementById("add500");
let resetWater=document.getElementById("resetWater");

let headerWater = document.getElementById("headerWater");
let headerHabits = document.getElementById("headerHabits");
let headerCalories = document.getElementById("headerCalories");

function updateWater(){
    
    localStorage.setItem("water",water)

    waterAmount.textContent=water;
    let percentage = (water/waterGoal)*100;
    if (percentage>100){
        percentage=100;
    }
    waterProgress.style.width=percentage + "%";
    waterPercentage.textContent=Math.round(percentage)+ "%";

    if(water>= waterGoal){
        waterMessage.textContent="Goal Achieved! 🎉";
    }
    else{
        waterMessage.textContent="";

    }

    if (water >= waterGoal) {
    waterTip.textContent = "🎉 Great job! You reached your hydration goal!";
    } else if (water >= waterGoal * 0.75) {
    waterTip.textContent = "💧 You're almost there! Keep drinking.";
    } else if (water >= waterGoal * 0.5) {
       waterTip.textContent = "👍 Halfway there! Keep going.";
    } else {
       waterTip.textContent = "💧 Stay hydrated to keep your energy and focus up.";
    }

    headerWater.textContent = Math.round(percentage) + "%";
 
}

add250.addEventListener("click",function () {
    water += 250;
    updateWater();

});

add500.addEventListener("click", function () {
    water += 500;
    updateWater();
});

resetWater.addEventListener("click", function(){
    water=0;
    updateWater();

})
updateWater();

let habits=JSON.parse(localStorage.getItem("habits")) || [];

let habitInput=document.getElementById("habitInput");
let addHabit=document.getElementById("addHabit");
let habitList=document.getElementById("habitList");
let habitWarning=document.getElementById("habitWarning");

addHabit.addEventListener("click",function(){

    let habitName= habitInput.value.trim();

    if (habitName===""){
        habitWarning.textContent = "Please Enter a habit.";
        return;
    }
    if(habits.length >= 4){
        habitWarning.textContent="You can Only add 4 habits";
        return;
    }
    habits.push({
        name : habitName,
        streak: 0
    });

    habitInput.value="";
    habitWarning.textContent=""

    displayHabits();
});

function displayHabits(){
    localStorage.setItem("habits",JSON.stringify(habits));
    habitList.innerHTML ="";
    habits.forEach(function (habit, index){
        let habitCard = document.createElement("div");

        habitCard.innerHTML=`
        <span>${habit.name}</span>
        <span>🔥 ${habit.streak}</span>
        <button onclick="logHabit(${index})">
        Log Today
        </button>

        <button onclick="deleteHabit(${index})">
        Delete
        </button>
        `;
        habitList.appendChild(habitCard);
    });
    if (habits.length === 0) {
       habitTip.textContent = "🔥 Start with one small habit today.";
    } else if (habits.length === 4) {
       habitTip.textContent = "💪 Your habit list is full. Focus on consistency!";
    } else {
       habitTip.textContent = "🔥 Keep showing up. Small habits create big results.";
    }

    headerHabits.textContent = habits.length + "/4";

}
function logHabit(index){
    habits[index].streak++;
    displayHabits();

}
function deleteHabit(index){
    habits.splice(index,1);
    displayHabits();

}
displayHabits();

let activity=document.getElementById("activity");
let duration = document.getElementById("duration");
let calculateCalories = document.getElementById("calculateCalories");
let calorieTotal = document.getElementById("calorieTotal");

let calories = Number(localStorage.getItem("calories")) ||0;


calculateCalories.addEventListener("click", function () {

    let minutes = Number(duration.value);
    let rate = Number(activity.value);

    if (minutes <= 0) {
        return;
    }

    let burnedCalories = minutes * rate;

    calories += burnedCalories;
    localStorage.setItem("calories",calories);


    calorieTotal.textContent = calories;

    duration.value = "";
    headerCalories.textContent = calories;
});
calorieTotal.textContent = calories;
if (calories >= 500) {
    calorieTip.textContent = "🔥 Amazing work! You've had a strong active day.";
} else if (calories >= 250) {
    calorieTip.textContent = "💪 Great progress! Keep moving.";
} else {
    calorieTip.textContent = "⚡ Every active minute counts. Keep moving!";
}

let resetCalories = document.getElementById("resetCalories");
resetCalories.addEventListener("click", function () {
    calories = 0;

    localStorage.setItem("calories", calories);

    calorieTotal.textContent = calories;
    headerCalories.textContent = calories;
});


let themeBtn = document.getElementById("themeBtn");
let savedTheme=localStorage.getItem("theme");

if (savedTheme==="true"){
    document.body.classList.add("light-mode");
    themeBtn.textContent="☀️ Light Mode";
}
themeBtn.addEventListener("click",function(){
    document.body.classList.toggle("light-mode");
    let theme = document.body.classList.contains("light-mode");
    localStorage.setItem("theme",theme);
    if(theme){
        themeBtn.textContent = "☀️ Light Mode";
    }else{
        themeBtn.textContent = "🌙 Dark Mode";
    }
});
