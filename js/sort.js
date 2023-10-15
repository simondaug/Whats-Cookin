fetch('../recipes.json')
    .then((response) => response.json())
    .then((json) => recipes = json);

fetch('../nutrition.json')
    .then((response) => response.json())
    .then((json) => NutritionFacts = json);

veg = ['Sausages and Luncheon Meats','Poultry Products','Finfish and Shellfish Products','Beef Products','Pork Products','American Indian/Alaska Native Foods','Lamb, Veal, and Game Products'];
pesk = ['Sausages and Luncheon Meats','Poultry Products','Beef Products','Pork Products','American Indian/Alaska Native Foods','Lamb, Veal, and Game Products'];
vgn = ['Dairy and Egg Products','Sausages and Luncheon Meats','Poultry Products','Finfish and Shellfish Products','Beef Products','Pork Products','American Indian/Alaska Native Foods','Lamb, Veal, and Game Products']
vegetarian = false;
vegan = false;
pesketaryen = false;
//Take the meals that the user has submitted and determine which food groups they need
function submitMeals(meals, diet) {
    switch (diet) {
        case "vegetarian":
            vegetarian = true;
            break;
        case "vegan":
            vegan = true;
            break;
        case "pescetarian":
            pesketaryen = true;
            break;
    }
    numFruits = 0;
    numVegs = 0;
    totNuts = [0, 0, 0];
    meals.forEach((inp) => {
        data = processMeal(inp);
        numFruits += data["fruit"];
        numVegs += data["veg"];
        totNuts[0] += data["nuts"][0]/4;
        totNuts[1] += data["nuts"][1]/9;
        totNuts[2] += data["nuts"][2]/4;
    });
    totNutsTot = totNuts[0] + totNuts[1] + totNuts[2];
    goals = [.285, .21, .505];
    percentages = [totNuts[0]/totNutsTot, totNuts[1]/totNutsTot, totNuts[2]/totNutsTot];
    needs = [2*goals[0]-percentages[0], 2*goals[1]-percentages[1], 2*goals[2]-percentages[2]];
    return chooseMeals(needs);
}

//Determine a passable recipe for the meal a user has eaten, and return the nutritional value of the ingredients
function processMeal(mealName) {
    idx = meal(mealName);
    nm = Object.values(recipes["name"])[idx];
    ingredients = recipes["ingredients"][idx];
    ingredients = ingredients.substring(2,ingredients.length-2).split("', '");
    return nutrition(ingredients);
}

//Find the closest stored recipe to the meal the user has eaten using fuzzy sort
function meal(mealName) {
    nm = fuzzysort.go(mealName, Object.values(recipes["name"]), options={limit: 1})[0]['target'];
    idx = Object.values(recipes["name"]).indexOf(nm);
    return idx;
}


//Determine the food groups and nutrition of a list of ingredients
function nutrition(ingredients) {
    nuts = [0, 0, 0];
    numFruits = 0;
    numVegs = 0;
    i = 0;
    ingredients.forEach(ing => {
        nf = fuzzysort.go(ing, Object.keys(NutritionFacts), options={limit: 1});
        if (nf["total"] != 0) {
            category = NutritionFacts[nf[0]["target"]]["category"];
            if (category == 'Fruits and Fruit Juices'){
                numFruits++;
            }
            else if (category == 'Vegetables and Vegetable Products') {
                numVegs++;
            }
            nuts[0] += Object.values(NutritionFacts[nf[0]["target"]]["nutrients"])[0]*(.5^i);
            nuts[1] += Object.values(NutritionFacts[nf[0]["target"]]["nutrients"])[1]*(.5^i);
            nuts[2] += Object.values(NutritionFacts[nf[0]["target"]]["nutrients"])[2]*(.5^i);
        }
        i++;
    });
    return {"fruit": numFruits, "veg": numVegs, "nuts": nuts};
}

//Recommend the user meals that would best fit the suggested food groups that they need
function chooseMeals(needs) {
    found = false;
    RKs = Object.keys(recipes["name"]);
    scores = [];
    while (scores.length < 1000) {
        idx = Math.floor(Math.random()*RKs.length);
        ingredients = recipes["ingredients"][idx];
        ingredients = ingredients.substring(2,ingredients.length-2).split("', '");
        dietary = true;
        igNuts = nutrition(ingredients)["nuts"];
        if (vegetarian) {
            ingredients.forEach(ing => {
                nf = fuzzysort.go(ing, Object.keys(NutritionFacts), options={limit: 1});
                if (nf["total"] != 0) {
                    category = NutritionFacts[nf[0]["target"]]["category"];
                    if (veg.includes(category)) {
                        dietary = false;
                    }
                }
            });
        }
        if (pesketaryen) {
            ingredients.forEach(ing => {
                nf = fuzzysort.go(ing, Object.keys(NutritionFacts), options={limit: 1});
                if (nf["total"] != 0) {
                    category = NutritionFacts[nf[0]["target"]]["category"];
                    if (pesk.includes(category)) {
                        dietary = false;
                    }
                }
            });
        }
        if (vegan) {
            ingredients.forEach(ing => {
                nf = fuzzysort.go(ing, Object.keys(NutritionFacts), options={limit: 1});
                if (nf["total"] != 0) {
                    category = NutritionFacts[nf[0]["target"]]["category"];
                    if (vgn.includes(category)) {
                        dietary = false;
                    }
                }
            });
        }
        if (dietary && !(igNuts[0] == 0 || igNuts[1] == 0 || igNuts[2] == 0)) {
            igSum = igNuts[0] + igNuts[1] + igNuts[2];
            igScore = [igNuts[0]/igSum, igNuts[1]/igSum, igNuts[2]/igSum];
            igNScore = Math.abs(needs[0]-igNuts[0]) + Math.abs(needs[1]-igNuts[1]) + Math.abs(needs[2]-igNuts[2]);
            obj = new Object();
            obj.score = igNScore;
            obj.name = recipes["name"][idx];
            obj.time = recipes["minutes"][idx];
            link = obj.name.split(" ");
            cLink = link[0].trim();
            for (i = 1; i < link.length; i++) {
                cLink = cLink + "-" + link[i].trim();
            }
            obj.link = 'https://www.food.com/recipe/' + cLink + "-" + recipes["id"][idx];
            obj.ingredients = ingredients;
            obj.needs = needs;
            obj.current = percentages;
            scores.push(obj);
        }
        RKs.splice(idx, 1);
    }
    scores.sort(function(a, b){return a.score-b.score});
    out = [];
    for (i=0; i < 12; i++) {
        out.push(scores[i]);
    }
    return out;
}