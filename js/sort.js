fetch('../recipes.json')
    .then((response) => response.json())
    .then((json) => recipes = json);

fetch('../nutrition.json')
    .then((response) => response.json())
    .then((json) => NutritionFacts = json);

    proteins = ['Legumes and Legume Products','Sausages and Luncheon Meats','Poultry Products','Finfish and Shellfish Products','Beef Products','Pork Products','American Indian/Alaska Native Foods','Lamb, Veal, and Game Products'];
    vegPs = ['Spices and Herbs',];
    fats = ['Dairy and Egg Products','Fats and Oils','Soups, Sauces, and Gravies',];
    carbs = ['Baked Products','Sweets','Cereal Grains and Pasta','Breakfast Cereals'];

function submitMeals(meals) {
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
        console.log(data["nuts"]);
        console.log(totNuts);
    });
    totNutsTot = totNuts[0] + totNuts[1] + totNuts[2];
    goals = [.2, .145, .65];
    percentages = [totNuts[0]/totNutsTot, totNuts[1]/totNutsTot, totNuts[2]/totNutsTot];
    needs = [2*goals[0]-percentages[0], 2*goals[1]-percentages[1], 2*goals[2]-percentages[2]];
    return chooseMeals(needs);
}

function processMeal(mealName) {
    idx = meal(mealName);
    nm = Object.values(recipes["name"])[idx];
    ingredients = recipes["ingredients"][idx];
    ingredients = ingredients.substring(2,ingredients.length-2).split("', '");
    return nutrition(ingredients);
}

function meal(mealName) {
    nm = fuzzysort.go(mealName, Object.values(recipes["name"]), options={limit: 1})[0]['target'];
    console.log(nm)
    idx = Object.values(recipes["name"]).indexOf(nm);
    return idx;
}

function nutrition(ingredients) {
    nuts = [0, 0, 0]
    numFruits = 0
    numVegs = 0
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
            nuts[0] += Object.values(NutritionFacts[nf[0]["target"]]["nutrients"])[0];
            nuts[1] += Object.values(NutritionFacts[nf[0]["target"]]["nutrients"])[1];
            nuts[2] += Object.values(NutritionFacts[nf[0]["target"]]["nutrients"])[2];
        }
    });
    return {"fruit": numFruits, "veg": numVegs, "nuts": nuts};
}

function chooseMeals(needs) {
    found = false;
    RKs = Object.keys(recipes["name"]);
    scores = [];
    while (scores.length < 100) {
        idx = Math.floor(Math.random()*RKs.length);
        ingredients = recipes["ingredients"][idx];
        ingredients = ingredients.substring(2,ingredients.length-2).split("', '");
        igNuts = nutrition(ingredients)["nuts"];
        igSum = igNuts[0] + igNuts[1] + igNuts[2];
        igScore = [igNuts[0]/igSum, igNuts[1]/igSum, igNuts[2]/igSum];
        igNScore = Math.abs(needs[0]-igNuts[0]) + Math.abs(needs[1]-igNuts[1]) + Math.abs(needs[2]-igNuts[2]);
        obj = new Object();
        obj.score = igNScore;
        obj.name = recipes["name"][idx];
        obj.ingredients = ingredients;
        scores.push(obj);
        RKs.splice(idx, 1);
    }
    scores.sort(function(a, b){return a.score-b.score});
    out = [];
    for (i=0; i < 10; i++) {
        out.push(scores[i]);
    }
    return out;
}