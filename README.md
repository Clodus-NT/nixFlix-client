# nixFlix React App
A client-side application created with React.js that is based on existing server-side core (REST API and database).

## User Stories
- As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.
- As a user, I want to be able to update and/or delete my profile.

## Key Features
- The app displays a welcome view where users can either login or register an account.
- Once authenticated, the user should now view all movies.
- Upon clicking on a particular movie, users will see a single movie modal open. The single movie view allows you to:
  - A button that takes the user to a director view with information on the director
  - A button that takes the user to a genre view with information about the genre
  - A button that allows the user to add the movie to their list of favorites
- A profile button in the navbar that takes the user to a profile view that allows them to:
  - Updatae their profile information
  - Delete their profile
  - View a list of their favorite movies and remove them if desired

## Tech Specs
- Written in React.js using JSX
- Styled with React Bootstrap