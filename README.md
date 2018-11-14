# MoviesAPI
Recruitment Task for Netguru (lets check if I'm a real Node Guru! ;)

## Requirements:
1. Node.js + NPM + GIT installed on your computer
2. Internet connection (this app use online MongoDB on mLab)

## URL to test this API online:
http://movie-a.herokuapp.com/movies

> For nice view I recommend __jsonView__ Google Extension:
> https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc
>
> I could use pretty-printing eg. on `JSON.stringify(obj, null, 2)` to have spacing = 2, but I don't want to do it on "Production" ;)

## Setup instructions:
1. In your console/terminal get to your preferred folder for this app.
2. Clone this repo: `git clone git@github.com:LucasMatuszewski/MoviesAPI.git`
3. Enter app's folder and install it: `cd MoviesAPI && npm install`
4. Start this app locally: `npm start` and open it on http://localhost:3000
5. To manually test POST Routes you can use Postman.
6. To run Unit Tests use: `npm run test` or `yarn test`

## Routes:
- http://movie-a.herokuapp.com/movies - GET all movies
- http://movie-a.herokuapp.com/movies - POST - add new movie (var: title)
- http://movie-a.herokuapp.com/comments - GET all comments
- http://movie-a.herokuapp.com/comments/5bec87864958b042bcb97702 - GET comments from one movie
- http://movie-a.herokuapp.com/comments - POST add new comment (var: movieId, text, userName)
There are many other ways to solve this task and to format json data. I can do it better, but time limitations didn't let me optimize it.


## Reasoning behind used tools:
1. __Express__ - small and fast framework, good enough for API (__Restify__ could be better, but Express is more popular === it's easier to find a developer to maintain your App)
2. __MongoDB__ - it's easy to build and understand a json API when your DB follow similar structure of data. In this basic Movies API we don't need any joints / relations, so noSQL DB should be more effective. I assume that it's not a big scale app with tons of comments, so I save comments embedded in Movies collection, and limit number of characters.
3. __Jest__ - I like React.js, so I just like Jest ;)
4. __Supertest__ - makes testing HTTP easier
4. __Postman__ - for manual tests of API.