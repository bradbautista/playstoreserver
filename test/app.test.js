const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {

    // Does the user receive an array back?
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
            })
    });

    // Does the user get a 400 if they provide a bad sort parameter?
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'foo' })
            .expect(400, 'Sort must be one of Rating or App')
    });

    // Does the user get a 400 if they provide a bad genre parameter?
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .query({ genre: 'foo' })
            .expect(400, 'Genre must be one of action, arcade, card, casual, puzzle or strategy')
    });

    // Does app sort work?
    it('should sort by title', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'App' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {

                expect(res.body).to.be.an('array');
                
                let sorted = true;

                let i = 0;
                // iterate once less than the length of the array
                // because we're comparing 2 items in the array at a time
                while (i < res.body.length - 1) {
                // compare book at `i` with next book at `i + 1`
                const bookAtI = res.body[i];
                const bookAtIPlus1 = res.body[i + 1];
                // if the next book is less than the book at i,
                if (bookAtIPlus1.title < bookAtI.title) {
                    // the books were not sorted correctly
                    sorted = false;
                    break; // exit the loop
                }

                i++;
                
                }
                expect(sorted).to.be.true;
            });
    });

    // Does rating sort work?
    it('should sort by rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {

                expect(res.body).to.be.an('array');
                
                let sorted = true;

                let i = 0;
                // iterate once less than the length of the array
                // because we're comparing 2 items in the array at a time
                while (i < res.body.length - 1) {
                // compare book at `i` with next book at `i + 1`
                const bookAtI = res.body[i];
                const bookAtIPlus1 = res.body[i + 1];
                // if the next book is less than the book at i,
                if (bookAtIPlus1.title < bookAtI.title) {
                    // the books were not sorted correctly
                    sorted = false;
                    break; // exit the loop
                }

                i++;
                
                }
                expect(sorted).to.be.true;
            });
    });

    // Does genre filtering work?
    it('should filter by genre', () => {
        return supertest(app)
            .get('/apps')
            .query({ genre: 'arcade' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {

                expect(res.body).to.be.an('array');
                
                let sorted = true;

                let i = 0;
                // iterate once less than the length of the array
                // because we're comparing 2 items in the array at a time
                while (i < res.body.length - 1) {
                // compare book at `i` with next book at `i + 1`
                const bookAtI = res.body[i];
                const bookAtIPlus1 = res.body[i + 1];
                // if the next book is less than the book at i,
                if (bookAtIPlus1.title < bookAtI.title) {
                    // the books were not sorted correctly
                    sorted = false;
                    break; // exit the loop
                }

                i++;
                
                }
                expect(sorted).to.be.true;
            });
    });

    // Does genre filtering + sorting work?
    it('should filter by genre and sort by rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Rating', genre: 'arcade' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {

                expect(res.body).to.be.an('array');
                
                let sorted = true;

                let i = 0;
                // iterate once less than the length of the array
                // because we're comparing 2 items in the array at a time
                while (i < res.body.length - 1) {
                // compare book at `i` with next book at `i + 1`
                const bookAtI = res.body[i];
                const bookAtIPlus1 = res.body[i + 1];
                // if the next book is less than the book at i,
                if (bookAtIPlus1.title < bookAtI.title) {
                    // the books were not sorted correctly
                    sorted = false;
                    break; // exit the loop
                }

                i++;
                
                }
                expect(sorted).to.be.true;
            });
    });


})