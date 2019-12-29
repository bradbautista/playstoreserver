const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Assign express to app
const app = express();

// Define our data

const apps = require('./apps-data.js')

// Middleware
app.use(morgan('common'));
app.use(cors());

// Handlers
app.get('/apps', (req, res) => {

    // Defining query parameters, req.query.genres, req.query.sort
    // Genre will be one of an array, sort will be by rating or app
    const { genre, sort } = req.query;
    let results = apps;

    // If there's a sort option and no genre provided
    if (sort && !genre) {
  
        // Validate the value of the sort parameter
        if (!['Rating', 'App'].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be one of Rating or App');
        }

        // If they sort by rating, we want a descending list
        if (sort === 'Rating') {

            let results = apps
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })
            .reverse()

            return res.json(results);

        }

        // If they sort by app, we want an ascending list
        if (sort == 'App') {

            let results = apps
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })

            return res.json(results);

        }

    }

    // If there's a genre parameter and no sort parameter
    
    if (genre && !sort) {

        // Validate the parameter value
        if (!['action', 'arcade', 'card', 'casual', 'puzzle', 'strategy']
        .includes(genre)) {
          return res
            .status(400)
            .send('Genre must be one of action, arcade, card, casual, puzzle or strategy');
        }

        // And filter our apps list for apps whose genre, lowercased, matches the provided genre, lowercased
        let results = apps
        .filter (app => 
          app
              .Genres
              .toLowerCase()
              .includes(genre.toLowerCase()))
        // .sort((a, b) => {
        //     return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        // })

        return res.json(results);
    }

    if (genre && sort) {

        // Validate the parameter values
        if (!['action', 'arcade', 'card', 'casual', 'puzzle', 'strategy']
        .includes(genre)) {
          return res
            .status(400)
            .send('Genre must be one of action, arcade, card, casual, puzzle or strategy');
        }

        if (!['Rating', 'App'].includes(sort)) {
            return res
              .status(400)
              .send('Sort must be one of Rating or App');
        }

        // And filter our apps list for apps whose genre, lowercased, matches the provided genre, lowercased
        let results = apps
        .filter (app => 
          app
              .Genres
              .toLowerCase()
              .includes(genre.toLowerCase())
        )
        
        // If they sort by rating, we want to filter our results list 
        // in descending order
        if (sort === 'Rating') {

            results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })
            .reverse()

            return res.json(results);
        }
  
        // If they sort by app, we want an ascending list
        if (sort == 'App') {

            results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })

            return res.json(results);

        }
    }

    res.json(results);
})

module.exports = app;