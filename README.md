# Galactic Fleet Battles

A web game where users can build a fleet made of different ships from Star Wars and battle enemies. It's a full-stack MERN app that uses Firebase for user authentication and Google Gemini for narrative generation.

**Link to project:** [https://starwars-frontend-wb6z.onrender.com/](https://starwars-frontend-wb6z.onrender.com/)

---

## Included Features

* Turn-based starship combat
* AI narrative generation
* User accounts
* Star Wars starship data

## Scrapped Features

* Star Wars character data
* Friend system
* PvP combat
* Turnless combat

## Technologies Used

### Frontend: React, React-Bootstrap
The frontend of this site was built with React, using it to create a modern and dynamic design with components and routing. The logic for the game part of the app was also controlled with React. I used React-Bootstrap to get styles and components for the site.

### Backend: Node.js, Express, MongoDB
The backend of the app runs on a Node.js server hosted on Render, using Express to communicate with the database. MongoDB was used for that, with ship info and data related to users being stored there.

### Firebase
The user authentication process is handled through Firebase, which is integrated into the app's frontend.

### Gemini
As an addition to the game, when the battle is completed, the data is then packaged up and sent to Gemini, which generates a fun narrative of the battle's events.

## Lessons Learned

While this was not my first full-stack project, this was the one where I really put everything together.

Originally, this was going to be a basic MERN app, but I decided adding Firebase and Gemini would enhance the project, and it got more complex from there.

While I did somewhat manage to implement a friend system and user on user combat, I decided that since it wasn't **good**, I should instead switch to a turn-based system vs the computer.

I learned the importance of planning from building this, and my poor planning from the start made finishing it a lot more difficult than it needed to be.
