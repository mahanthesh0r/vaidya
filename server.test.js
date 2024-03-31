const request = require('supertest');
const app = require('./server');

describe("GET /", () => {
    it("should render the index page", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('<form'); // Assuming your index.ejs contains a form
      // Add more assertions here as per your index.ejs content
    });
  });