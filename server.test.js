const request = require('supertest');
const app = require('./server');
const axios = require('axios');



describe("GET /", () => {
    it("should render the index page", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('<form'); 
    });
  });

  jest.mock('axios');

  describe('GET /diagnosis', () => {
    beforeAll(() => {
      // Mock successful axios response for the diagnosis API call
      axios.get.mockResolvedValue({
        data: [
          {
            Issue: {
              ID: 10,
              Name: "Common Cold",
            },
            Specialisation: [
              {
                ID: 15,
                Name: "General Practice"
              }
            ]
          }
        ] // Mocked diagnosis data; adjust as necessary for your application
      });
    });
  
    it('fetches diagnosis information and renders the diagnosis page', async () => {
      // Mock formData and selectedOptionID as if they were stored in your session or cache
      // You might need to adjust this setup based on how your app handles sessions or caching
      const mockedFormData = {
        gender: "Male",
        age: "30",
        selectedOptionID: "10" // Mocked symptom ID
      };
  
      // Simulate storing formData in cache or session before making the GET request
      // This step depends on how you're managing state in your application
  
      const response = await request(app)
        .get('/diagnosis');
  
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain("Common Cold"); // Check for diagnosis in the response
      expect(response.text).toContain("General Practice"); // Check for specialisation in the response
      // Further assertions can be added based on the content of your diagnosis.ejs template
    });
  
    // You can add more tests here to cover different scenarios like handling API failures or missing formData
  });