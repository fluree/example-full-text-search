// To issue these queries, go to: http://localhost:8080/flureeql

// Basic search query

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

