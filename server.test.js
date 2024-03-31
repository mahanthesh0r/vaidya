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

  //Test /Diagnosis endpoint with mock axios call
  describe('GET /diagnosis', () => {
    beforeAll(() => {
        //expected api response
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
        ] 
      });
    });
  
    it('fetches diagnosis information and renders the diagnosis page', async () => {
        //input params for the api
      const mockedFormData = {
        gender: "Male",
        age: "30",
        selectedOptionID: "10" // Mocked symptom ID
      };
  
      const response = await request(app)
        .get('/diagnosis');
  
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain("Common Cold"); 
      expect(response.text).toContain("General Practice"); 
    });

  });