# Health Harbour app for InterSystems FHIR Contest

### About

Welcome to Health Harbour, an all-in-one health companion! Our dedicated team has crafted an application that seamlessly combines the functionalities of a medical assistant with the power of habit tracking, designed to empower users on their journey to better health.

Medical Assistant Features:
- Vital Signs Monitoring: Easily log and monitor essential health metrics such as blood pressure, providing users with valuable insights, ensuring them stay organized and never miss a follow-up.
- Personalized Care Plans: Collaborate with a personal doctor to create customized wellness plans tailored to the patient's unique needs.

Habit Tracker for Wellness:
- Daily Habit Tracking: Stay on course with health improvement goals by tracking and cultivating positive habits.

At Health Harbour, we believe that managing health should be comprehensive, intuitive, and empowering. 

Download Health Harbor now and take charge of your well-being!

## Features and technical description

### Prerequisites

Client side: TypeScript with Angular framework.
Server side:  InterSystems IRIS for Health and FHIR SQL Builder.

Make sure you have git and Docker desktop installed.

### How to run

Execute the following commands in the terminal to start the project:
```
git clone https://github.com/banksiaglobal/MyYearOfHealth.git

docker-compose up -d
```

This project has test data for loading into IRIS.
Preloaded data is available in the following folder : _data/fhir_

### FHIR SQL Builder

To convert data from FHIR server to SQL server in IRIS:

http://localhost:32783/csp/fhirsql/index.html

Data for log in:
Username: _ _SYSTEM_
Password: _SYS_

**Create an analysis of our FHIR repo**


<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/1.png' width='800'/>


Click on **New** for server connection settings:


<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/2.png' width='600' height='600'/>


FHIR Server Name: _FHIRSERVER_
- Host: _localhost_
- Port: _52773_
- Press **New Credentials**, add a new credentials like
- Credentials: _SuperUser_ /  login: _ _SYSTEM_ password: _SYS_ 
- FHIR repository url : _/fhir/r4_

<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/3.png' width='600' height='600' />

<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/4.png' width='600' height='600'/>

<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/5.png' width='600' height='400'/>

The prepared projection from FHIR to SQL is in the path _data/fhir-builder/Harbour.json_ for **Import**.

<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/6.png' width='800'/>

After the form appears, we fill it with data:
Name: _Harbour_
Analysis: select a newly created analysis from the dropdown list

<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/7.png' width='800'/>



To move the projection from FHIR to SQL, click **New** and fill the form with data



<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/8.png' width='800'/>

- FHIR Repository: _FHIRSERVER_
- Trans. Spec: _Harbour_
- Package Name: _HarbourFHIR_

<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/9.png' width='600' height='600' />

Сheck the availability of tables in the management portal: 

- HarbourFHIR.Patient
- HarbourFHIR.Observation
- HarbourFHIR.CarePlan
- HarbourFHIR.Goal



<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/fhir.png' width='800'/>

### Locations

The application backend is available at http://localhost:32783/ [](http://localhost:32783/)

The application frontend is available at http://localhost:4200/ [](http://localhost:32783/)


### Use of API 

For more efficient and convenient interaction with the api of the application you can use postman-collection or swagger.
The files with are in the root of the project.

It uses swagger-ui module to provide documentation and test environment for API.



<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/swagger.png' width='800'/>


<img src='https://github.com/banksiaglobal/MyYearOfHealth/blob/main/data/image/postman.png' width='800'/>


### Team
- Backend: Maria Gladkova[](https://community.intersystems.com/user/maria-gladkova)
- Frontend: Katsiaryna Shaustruk[](https://community.intersystems.com/user/katsiaryna-shaustruk)
- Backend: Maria Nesterenko[](https://community.intersystems.com/user/maria-nesterenko)
- QA / design: Alena Krasinskiene[](https://community.intersystems.com/user/alena-krasinskiene)
