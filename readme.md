# Vaidya

Vaidya is a personal home doctor web application designed to bring healthcare diagnostics to the comfort of your home. Built with EJS, TailwindCSS, and ExpressJS, it offers a user-friendly interface for individuals to input their symptoms and receive potential diagnoses along with the accuracy of these diagnostics and the type of specialist they should consult.

## Features

- **Symptom Analysis**: Users can enter their personal information such as name, age, gender, and symptoms they are experiencing.
- **Diagnosis Suggestion**: Based on the input symptoms, Vaidya suggests the most probable illness the user might be facing, including the accuracy of this suggestion.
- **Specialization Recommendation**: The app recommends the type of medical specialization required for treatment, helping users seek the appropriate healthcare professional.

- All the above features are implemented using APImedic free API. To know more click here https://apimedic.com/

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- npm
- Nodejs Latest 
- .env file (Have E-mailed it to InternshipSF@supplyframe.com) If need a copy contact mahantheshr28@gmail.com

### Installation 

- Clone the repo
` git clone https://github.com/mahanthesh0r/vaidya.git `

- cd into the project 
` cd vaidya `

- Install the packages 
` npm install `

- Make sure the .env file is present in the project root directory

- start the application 
` npm start `

Visit http://localhost:8000/

### Jest Test 

- In the root directory run 
` npm test `


### Future Work
- Implement illness based seach queries
- Implement /issues API to populate illness details in the modal
- Handle Routes and Redirects 

