function cleanUp() {
    document.getElementById("foodInput").style.display = "none";

    document.getElementById("loading").style.display = "flex";
    
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";

        document.getElementById("foodOutput").style.display = "block";
    }, 3000);

}

function addOutput(item) {
    let base = document.createElement("div");
    base.classList.add("meal-output");

    let name = document.createElement("h3");
    name.innerText = "Meal";
    base.appendChild(name);

    let input = document.createElement("input");
    input.type = "text";
    base.appendChild(input);

    document.getElementById("foodOist").appendChild(base);
}

function getData() {
    let list = document.getElementsByTagName("input");
    let listOfMeals = [];
    for (let i = 0; i < list.length; i++) {
        listOfMeals.push(list[i].value);
    }
    return listOfMeals;
}
function sort() {
    console.log(getData());
    cleanUp();
}
