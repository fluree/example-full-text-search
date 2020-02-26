// To issue these queries, go to: http://localhost:8080/flureeql

// 1. Basic search query
// Searched for "apple" in either the title, instructions, OR ingredients
// Replace 'apple' with any term
const basic_search = 
{
    "select": {"?recipe": [  {"*": {"_compact": true} } ] },
    "where": [
      ["?recipe", "fullText:recipe", "apple"]
    ],
    "limit": 10,
    "offset": 0
}

// 2. Search in recipe/title
// By specifying, "fullText:recipe/title", we are only searching `recipe/title` for the given recipe
// Replace 'apple' with any term
const title_search = 
{
    "select": {"?recipe": [  {"*": {"_compact": true} } ] },
    "where": [
      ["?recipe", "fullText:recipe/title", "apple"]
    ],
    "limit": 10,
    "offset": 0
}

// 3. Count of recipes
// Count of recipes with "turkey" in the ingredients
const count = 
{
    "select": "(count ?recipe)",
    "where": [
      ["?recipe", "fullText:recipe/ingredients", "turkey"]
    ]
}

// 4. Two term
// Recipes that have "baste" in the instructions AND "lamb" in the ingredients
const two_terms  = 
{
    "select": {"?recipe": [  {"*": {"_compact": true} } ] },
    "where": [
      ["?recipe", "fullText:recipe/instructions", "baste"],
       ["?recipe", "fullText:recipe/ingredients", "lamb"]
    ]
}

// 5. OR query
// Recipes that have "lamb" OR "goat" in the ingredients
const or_query = {
    "select": {"?recipe": [  {"*": {"_compact": true} } ] },
    "where": [
        {
            "union": [
                [ ["?recipe", "fullText:recipe/ingredients", "lamb"]],
                [ ["?recipe", "fullText:recipe/ingredients", "goat"]]  
                ]
        }
    ]
}


// 6. OR and AND query
// Recipes that have either "lamb" OR "goat" in the ingredients, that also have "fenugreek".
const or_and_and_query = 
{
    "select": {"?recipe": [  {"*": {"_compact": true} } ] },
    "where": [
        {
            "union": [
                [ ["?recipe", "fullText:recipe/ingredients", "lamb"]],
                [ ["?recipe", "fullText:recipe/ingredients", "goat"]]  
                ]
        },
        ["?recipe", "fullText:recipe/ingredients", "fenugreek"]
    ]
}