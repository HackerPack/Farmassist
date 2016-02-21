# Tracktor
An application to help and assist farmers. Built for HackIllinois. Try it out at http://hackerpack.me/Farmassist

![alt text](https://raw.githubusercontent.com/HackerPack/Farmassist/master/Screenshots/index.png "Login Page")

## Inspiration
Farming is a big industry. But most of the solutions for a farmer's day-to-day problems are not automated, if this is automated then the productivity of farming can be increased. Also the communication between farmers are is difficult because it is difficult for the farmers to know about the farmers beyond their surrounding counties. If farmers were to connect with each others, they can share their solutions for the problems they faced in the past, share their old or unused equipment to other farmers. We wanted to develop a solution to address major problems faced a farmer. This app can be developed further to integrate resources to provide solutions for various issues faced by farmers.

## What it does
You have to login using your climate fieldview account. Using the account details from climate fieldview, the app will provides several tools for a farmer. Map tool provides the shortest path to use to cover all the farms of the farmer. Chat tool allows farmers to communicate with all other farmers. This is helpful for asking suggestions and discussing with farmers on farming activities. We-share tool allows a farmer to share his farming equipment with other farmers. Dashboard provides an overview on the number of equipment owned, borrowed, lent, money saved, and money donated. Suggestion tool provides suggestions on what crops should be grown in the farmer's field based on the climatic conditions and the county. Because the soil type can vary based on county, the suggestion tool uses county as a criteria.

## How we built it
We built the application on HTML, firebase as the backend, climate corp APIs to retrieve farmer details. We used Climate Corp API to login into the application. We used google maps to find the shortest path, find the place at where a equipment can be picked up in the we-share tool. We used various jquery built in functions to embed various other functionalities. We had our own built in database javascript API which communicated with firebase database.

We started by dividing tasks on various levels, like database, frontend and backend. Then as the app kept going we kept taking up tasks and working on it.

## Challenges we ran into
The main challenge was to be able to built a working application using new technologies in such sort span of time. But that was the fun of it too. Hence we love hackathons ;) :P .

Since none of us had worked on UI, we faced quite some challenges on that end.

## Accomplishments that we are proud of
To be able to come here even after having so many assignments' overhead ;) Frankly it would be to able to mock about how we were pathetic at different aspects, still overcoming them and coming up with an awesome app which has a scope of lot of improvements and can help ppl

## What we learned
We learned that what makes a great app is an awesome and noble idea and its not so difficult to built on a new technology. You always end up learning from them.

## What's next for Tracktor
There is a lot to Tracktor next and we are looking forward to create and deploy this app for the general public. The suggestions feature can be extended to enable a farmer to place order for raw materials required for the suggested crop. Track the order until it is delivered. Also the app can provide customized suggestions for the raw materials bought by the farmer in the past.

Front end can be made better.

## Built With
- climate-corp-api
- google-maps
- firebase
- javascript
- jquery
- api
- bootstrap

## Screenshots
![alt text](https://raw.githubusercontent.com/HackerPack/Farmassist/master/Screenshots/index.png "Login Page")
![alt text](https://raw.githubusercontent.com/HackerPack/Farmassist/master/Screenshots/dashboard.png "Dashboard Page")
![alt text](https://raw.githubusercontent.com/HackerPack/Farmassist/master/Screenshots/borrow.png "Sharing Page")
![alt text](https://raw.githubusercontent.com/HackerPack/Farmassist/master/Screenshots/lend.png "Equipment Lending Page")
![alt text](https://raw.githubusercontent.com/HackerPack/Farmassist/master/Screenshots/map.png "Maps Page")
![alt text](https://raw.githubusercontent.com/HackerPack/Farmassist/master/Screenshots/chat.png "Chat Page")
![alt text](https://raw.githubusercontent.com/HackerPack/Farmassist/master/Screenshots/suggest.png "Suggestion Page")
