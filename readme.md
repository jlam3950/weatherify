# Overview 

<img src="images/readme_img.png" alt="ClimbShop Logo" min-width="320">

Weatherify is a full-stack applcation that utilizes the spotify API, and the weather.gov API, to create personalized music recommendations based on the current weather. 
- Video Walkthrough: https://www.youtube.com/watch?v=Ii44Iu3tfB4

## Features 
- Application accesses both the Spotify API and Weather.gov   API. 
- Node, Express integration.  
- Save favorite tracks to SQL database. 
​- Utilizes Spotify's O Auth to link account to application. 
- UI/UX styled with CSS Grid, Flexbox. 

## Navigating the App 

1. Clone the repo
   ```sh
   git clone https://github.com/jlam3950/weatherify.git
   ```
2. Enter the following code in the terminal 
   ```sh
   NPM Start
   ```

Requires login to your Spotify account to access music recommendations. Once logged in succesfully, select up three genres and enter a zip code. After clicking the magnifying glass button, 15 tracks will be rendered onto the screen. From here, you can save this to your favorites list. Navigate back to the home page with the back arrow, or home page link in the nav bar. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies Used

Javascript, NodeJS, Express, Oauth, PostgreSQL were used to create this application. 

## Future Plans

- Integrate MVC.  
- Update UI/UX with tailwind. 