# CP2project

Getting started with web technologies via a Tic Tac Toe project as part of a university course.

## Description

This project contains Tic Tac Toe's history, hypothetical cards from author, a leaderboard based on MongoDB playerlist and a Tic Tac Toe game.
The TTT page has a dumb AI and one that uses Minimax algorithm from 
[FreeCodeCamp](https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/)

## Comments

There are no major errors (according to me). I've probably made too much async / function.then() / await . But again this my first time using JS !

# Installation

Only one terminal is needed to run.

## App

```
$ git clone https://github.com/wazzabeee/CP2project
$ cd online_exercices
$ npm install
```
## Setup Database

This project is using mongodb with moogose. If you want to run this project on your computer/server you must modify line 8 in server.js with your connection string as followed.

```
mongoose.connect('mongodb+srv://<username>:<password>@[...]/test?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true});
```

`npm start` or `nodemon server` for development

Then open `http://localhost:8080/`
