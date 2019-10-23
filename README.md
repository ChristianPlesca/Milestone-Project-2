# Night Out 

Night Out is a single page application helping the user find Bars, Restaurants, Accommodation, Night Clubs in a selected location. The application shows the destination inputted by the user on the map. It will provide the user with up to 20 places around the inputted area. Information on each place found it is available upon clicking on the marker. The goal of the project is to showcase different technologies used in this project as well as a sample of the Google Maps API and Places API.

## UX
### Strategy
Night Out is designed for users willing to find their next place to have a great night out. The layout of the application includes Navigation Bar, Search Section, Map, Info-Cards, Section, Footer.


The following link shows the initial mockups for the Wintersun Website using pen and paper https://github.com/ChristianPlesca/Milestone-Project2/tree/master/wireframes

### User Stories 
1. As a User, I must be able to search for any place in the World
2. As a User, I must have the options to choose between Accommodations, Bars, Restaurants, Night Clubs
3. As a User, I must have displayed an image of the place 
4. As a User, I must be able to see info of the place such as the website, address, name of the place, etc..
5. As a User, I must use a well designed and easy to use Application

## Features 
### Existing Features
1. Navigation bar with the App logo and a short description
2. The map allows you to switch between night mode and normal default map
3. Incrementally drop markers on the map for a better visual experience
4. Clicking on a marker allows users to see more information about the place
5. The option to chose between Accommodation, Bars, Restaurants and Night Clubs
6. Images displayed of each place witch allows the user to click on it and to see the place on the map with more information
7. Go Top button on the footer allows the user to scroll up to the Navigation Bar

### Features Left To Implement
1. Geolocation where user can enable its location
2. Opening Hours of each place 
3. Directions from Users location to the desired place
4. Loading Gif when the Map Loads  


## Technologies  
1. Html 5 
2. CSS 3 
3. Javascript ES6 
4. Boostrap 
5. jQuery 
6. Google Fonts
7. Font Awesome 
8. Visual Studio Code
9. Google Maps API
10. Google Places API

### Resources
* [Stackoverflow](https://stackoverflow.com/)
* [W3schools](https://www.w3schools.com/)
* [Google](https://www.google.com/)
* [Google Documentation](https://developers.google.com/maps/documentation)


## Testing

* The application was constantly tested during development using Opera GX dev tools. I used this to resize the browser to check the new code was working, breakpoints, and different mobile/tablet screen sizes.
* After deployment, I've tested the website on multiple browsers such as Mozilla(FireFox), Opera, Chrome, Microsoft Edge, Safari.
* Used https://jshint.com for testing Javascript files - No major issues were found
* Used [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly?utm_source=support.google.com/webmasters/&utm_medium=referral&utm_campaign=%206352293) - received this page is easy to use on a mobile device
* Used HTML and CSS validator [NuHTMLChecker](https://validator.w3.org/nu/#textarea) and [W3C-CSS](https://jigsaw.w3.org/css-validator/validator) - No major issues found
* Used Opera GX Console for testing the Javascript code - No issues and Bugs found 
* Finally did a lot of testing on Google API:
  1. Inputted London UK - 20 markers will be displayed on the map with accurate info about the place.
  2. Tested with Google if the information such as Phone Number, Address, etc.. is accurate.
  3. Tested if the option selected such as Bars, Restaurants will display the type correctly. 
  4. Tested on the locations that I have physically visited to see if they appear on the search. 
  5. Tested with Google if the images of each place are accurate.
  6. Tested on places that do not contain an image (There is an error handling for that)

### Issues encountered
The Issues I've encountered it was to do with mainly Javascript and Maps and Places API:
* I had an issue with displaying images of the places 
* The cancel button was not working on iOS 

### Steps taken to resolve issues
* I had to go through Google API documentation also did lots of researches on Stackoverflow
* I resolved the issue by removing the default "-webkit-appearance: none;" and custom style it.

## Deployment
Deployed using Github Pages - https://christianplesca.github.io/Milestone-Project-2/ directly from the master branch. The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named `index.html`.

To run locally, you can clone this repository directly into the editor of your choice by pasting `git clone https://github.com/ChristianPlesca/Milestone-Project-2.git` into your terminal. Type `git remote rm origin` into the terminal.

## Credits

### Content 
Some of the functions were taken from Google API documentation and StackOverflow and modified to fit my needs

### Media 
* Images were taken from [Google](https://www.google.com/)

### Acknowledgements
I have received inspiration for colours contrast from: [Spotify](https://open.spotify.com/browse/featured),[Razer](https://www.razer.com/gb-en).

Website for educational purposes only.