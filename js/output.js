function cleanUp() {
    document.getElementById("foodInput").style.display = "none";

    document.getElementById("loading").style.display = "flex";
    
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";

        document.getElementById("foodOutput").style.display = "block";
    }, 3000);

}

function capitalize(words) {
    let capN = true;
    for (let i = 0; i < words.length; i++) {
        if (capN == true) {
            words = words.substring(0, i) + words.substring(i, i + 1).toUpperCase() + words.substring(i + 1);
            capN = false;
        }
        if (words.substring(i, i + 1) == " ") {
            capN = true;
        }
    }
    return words;
}

function addOutput(item) {
    let base = document.createElement("div");
    base.classList.add("meal-output");

    let name = document.createElement("h3");
    name.innerText = capitalize(item.name);
    base.appendChild(name);

    let ing = document.createElement("h4");
    ing.innerText = "Ingredients";
    base.appendChild(ing);

    let lis = document.createElement("ul");
    for (let i = 0; i < item.ingredients.length; i++) {
        let ois = document.createElement("li");
        ois.innerText = item.ingredients[i];
        lis.appendChild(ois);
    }
    base.appendChild(lis);

    document.getElementById("foodOist").appendChild(base);
}

function getData() {
    let list = document.getElementsByTagName("input");
    let listOfMeals = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].value != '') {
            listOfMeals.push(list[i].value);
        }
    }
    return listOfMeals;
}
function sort() {
    let items = submitMeals(getData());
    cleanUp();

    for (let i = 0; i < items.length; i++) {
        addOutput(items[i]);
    }
}
