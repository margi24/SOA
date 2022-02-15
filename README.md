# SOA
Application using micro frontends and microservices through secured API calls.
run docker build -t image-name . for each project
run docker-compose up to create the containers and start thhe application.
# Diagrams
c4 context diagram
![image](https://user-images.githubusercontent.com/48327577/154115745-01e32ee1-4852-4c95-82b0-566106fd77fa.png)
c4 container diagram
![image](https://user-images.githubusercontent.com/48327577/154115770-6469c991-9b23-4430-ac60-b67ff33b3c8d.png)
UML diagram of the frontend components
![image](https://user-images.githubusercontent.com/48327577/154115795-d3f3dde5-c0ea-4074-8b13-8dcf563a2bc0.png)

# SOA design patterns
Decompose by Business Capability - The microservices are loosely coupled and each serves a different business object. One holds the user data and the other one has the city break data.
Sidecar Pattern - All the components are deployed into separate isolated containers that have the same lifecycle, functioning independently but providing supporting features.
API Gateway - The API gateway is the single entry point for the microservices calls. It routes requests to the concerned microservice. All clients call the API gateway.
# Web server (Node)
The web server has 3 parts. One microservice is the user service that holds the users information and exposes a secured REST API to perform the authentication.
Another microservice is the city break service that holds the city break information and exposes a secured REST API to add a new city break and retrieve the information for the users.
The third component is the API Gateway that exposes a secured REST API which is used by the frontend applications. The gateway validates information and sends requests to the two microservices in order to perform the needed actions.
The securization is done through JWT.
# Web app (Angular)
The web app uses microfrontend architecture and consists of a main app that has the login component and the logout and a secondary app that has the city break component which allows the user to add or see the city breaks and  also to send mails. The module in the secondary app is exposed by webpack module federation and imported and integrated in the main app.
# Integration
The API Gateway sends API calls to SendGrid (a 3rd party email service). There is a section in the frontend where the user can put an email address and with the press of a button, a request is sent to the API Gateway that triggers the send of another API request to SendGrid which sends the mail to the email address.
SendGrid can show information about the mails that have been sent
![image](https://user-images.githubusercontent.com/48327577/154115855-d6cd2199-c5cb-49d8-915b-5cb3e78ad26d.png)

# Docker Images and Containers
All the projects that form the application have config files for building the Docker images and docker-compose is used to create and start all the containers in the right order in the same internal network.
**Images**
![image](https://user-images.githubusercontent.com/48327577/154115898-8b31ce1e-db03-48eb-ad99-ab034b414504.png)
**Containers**
![image](https://user-images.githubusercontent.com/48327577/154115974-5c1f9764-291e-4cde-9d54-cf464a20acff.png)

