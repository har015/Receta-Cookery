const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3001;

//Creates MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '@Winytqg4',
  database: 'recipesschema'
});

//Connecting to the MySQL database
connection.connect((err) => {
  if (err) {
      console.error('Error connecting to database:', err);
      return;
  }
  console.log('Connected to database');
});



// Serve static files from the 'public' directory
app.use(express.static('public'));

// Redirect requests to the root URL to Home.html
app.get('/', (req, res) => {
  // Fetch recipe data from the 'recipes' table
  const sqlQuery = 'SELECT * FROM recipes';
  
  connection.query(sqlQuery, (err, results) =>{
    if(err){
      console.error('Error fetching recipes:', err)
      res.status(500).send('Error fetching recipes');
      return;
    }
  })

  const recipe = results.map((recipe) => ({
    title: recipe.Title,
    imageUrl: recipe.ImageUrl
  }));

   // Render the HTML template and inject recipe data
   const recipeCards = results.map((recipe) => `
   <div style="width: 395px; height: 444px; background: #FAFAF5; border-radius: 24px; overflow: hidden; border: 2px #E6E6E6 solid;">
       <button style="color: black; font-size: 20px; font-weight: 600; line-height: 26px; background: none; border: none; cursor: pointer; padding: 0; margin: 0;">${recipe.Title}</button>
       <div style="color: #426B1F; font-size: 20px; font-weight: 600; line-height: 26px;">120 calories</div>
       <div style="color: #6D6D6D; font-size: 16px; font-weight: 400; line-height: 24px;">Not yet saved</div>
       <img style="width: 395px; height: 296px;" src="${recipe.ImageUrl}" />
   </div>
`).join('');

const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Home</title>
            </head>
            <body>
                <div style="width: 1440px; height: 1024px; position: relative; background: white">
                    <!-- Header and Navigation -->
                    <!-- Recipe Cards -->
                    <div style="display: flex; flex-wrap: wrap; justify-content: space-around; padding-top: 20px;">
                        ${recipeCards}
                    </div>
                    <!-- End of Recipe Cards -->
                    <div style="width: 727px; height: 68px; left: 356px; top: 353px; position: absolute; color: black; font-size: 64px; font-family: Newsreader; font-weight: 400; line-height: 76.80px; word-wrap: break-word">Recipe Recommendations</div>
                </div>
            </body>
            </html>
        `;
  // Send the populated HTML content to the client
  res.send(htmlContent);
  //res.sendFile(path.join(__dirname, 'public', 'Login.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
