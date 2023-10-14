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
    name.innerText = "Name of Meal";
    base.appendChild(name);

    let ing = document.createElement("h6");
    ing.innerText = "Ingredients";
    base.appendChild(ing);

    let lis = document.createElement("ul");
    for (let i = 0; i < 10; i++) {
        let ois = document.createElement("li");
        ois.innerText = "cow tools";
        lis.appendChild(ois);
    }
    base.appendChild(lis);

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

    for (let i = 0; i < 10; i++) {
        addOutput(i);
    }
}
