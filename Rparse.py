import pandas as pd

recipes = pd.read_csv('RAW_recipes.csv').filter(items=["name", "ingredients", "id", "minutes"])
print(recipes.head())
recipes.to_json(r'recipes.json')
