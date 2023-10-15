import pandas as pd
usda = pd.read_json('foundationDownload.json')
sr = pd.read_json('FoodData_Central_sr_legacy_food_json_2021-10-28.json')
out = {}

for food in usda["FoundationFoods"]:
    nutrients = {"proteinValue": 0, "fatValue": 0, "carbohydrateValue": 0}
    if (len(food["nutrientConversionFactors"]) > 1):
        for test in food["nutrientConversionFactors"]:
            if (test["type"] == ".CalorieConversionFactor"):
                if ("proteinValue" in test.keys()):
                    nutrients["proteinValue"] = test["proteinValue"]
                if ("fatValue" in test.keys()):
                    nutrients["fatValue"] = test["fatValue"]
                if ("carbohydrateValue" in test.keys()):
                    nutrients["carbohydrateValue"] = test["carbohydrateValue"]
    nm = food["description"].split(',')
    out[nm[0]] = {"category": food["foodCategory"]["description"], "nutrients": nutrients} 
for food in sr["SRLegacyFoods"]:
    nutrients = {"proteinValue": 0, "fatValue": 0, "carbohydrateValue": 0}
    if (len(food["nutrientConversionFactors"]) > 1):
        for test in food["nutrientConversionFactors"]:
            if (test["type"] == ".CalorieConversionFactor"):
                if ("proteinValue" in test.keys()):
                    nutrients["proteinValue"] = test["proteinValue"]
                if ("fatValue" in test.keys()):
                    nutrients["fatValue"] = test["fatValue"]
                if ("carbohydrateValue" in test.keys()):
                    nutrients["carbohydrateValue"] = test["carbohydrateValue"]
    nm = food["description"].split(',')
    out[nm[0]] = {"category": food["foodCategory"]["description"], "nutrients": nutrients} 
categories = []
for item in out:
    if (not out[item]["category"] in categories):
        categories.append(out[item]["category"])
out = pd.DataFrame(out)
out.to_json(r'nutrition.json')
print(categories)