function drawChart(mama, mamaHouse) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable([
            ['Nutrient', 'Percent Nutient Intake'],
            ['Protein', Math.max(mama[0], 0)],
            ['Fats', Math.max(mama[1], 0)],
            ['Carbohydrates', Math.max(mama[2], 0)]
        ]);

        var options = {
            title: 'Current Intake'
        };

        var chart = new google.visualization.PieChart(document.getElementById(mamaHouse));

        chart.draw(data, options);
    }
}
function cleanUp() {
    document.getElementById("foodInput").style.display = "none";
    document.getElementById("description").style.display = "none";

    document.getElementById("loading").style.display = "flex";
    
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";

        document.getElementById("foodOutput").style.display = "block";
        document.getElementById("desb").style.display = "grid";

        drawChart();
    }, 3000);

}

function capitalize(words) {
    words = words.replace(" s ", "'s ");
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
    lis.classList.add("ingredients-list");
    for (let i = 0; i < item.ingredients.length; i++) {
        let ois = document.createElement("li");
        ois.innerText = item.ingredients[i];
        lis.appendChild(ois);
    }
    base.appendChild(lis);

    let pr = document.createElement("p");
    pr.innerHTML = "<b>Prep Time: </b>" + item.time + " minutes";
    base.appendChild(pr);

    let hr = document.createElement("a");
    hr.innerText = item.link;
    hr.href = item.link;
    base.appendChild(hr);

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
    drawChart(items[0].current, "piecharta");
    drawChart(items[0].needs, "piechartb");
    console.log(items);
    cleanUp();

    for (let i = 0; i < items.length; i++) {
        addOutput(items[i]);
    }
}
