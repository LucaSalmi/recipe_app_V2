/*
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '071c24e17fmsh4275638029000d1p173340jsncf3efebc4e7a',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    
    fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10&limitLicense=true', options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setJsonString(JSON.stringify(data));
            console.log(JSON.stringify(data));
            Crud.createJSON(JSON.stringify(data));
        })
        .catch(err => console.error(err));
*/