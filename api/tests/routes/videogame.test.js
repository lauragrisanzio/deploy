/* eslint-disable import/no-extraneous-dependencies */
const {expect}  = require('chai');
// const session = require('supertest-session');
const session = require("supertest")
const app = require("../../src/server");
const { Videogame, conn } = require('../../src/db.js');
const agent = session(app); //hacemos la peticion al servidor

const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogame', () => {
    it('should get 200', () =>
      agent.get('/videogame').expect(200)
    );
  });
});

// describe("Videogames routes", () => {
//     describe("GET /videogame", () => {
//         it("Responde con status: 200", async () => {
//             await agent.get("/videogame").expect(200), 0.15;
//         });
        
//   })
// })