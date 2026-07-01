# Spots

Spots is a social media-style web app where users can share photos, like posts, and customize their profile. This is the final stage of the project for the Software Engineering program at TripleTen, where the app was connected to a real backend API so that all user changes persist in a database.

## Description

In earlier stages, this project was built with semantic HTML5, Flexbox, and BEM-structured CSS, then later upgraded with Webpack for module bundling, transpilation, and asset optimization. In this final stage, the app was connected to a live server via the Fetch API, replacing all hardcoded data with real, persistent data.

## Features

- Cards and profile information load from a database on page load
- Editing the profile (name, description, avatar) saves changes to the server and persists after refresh
- Adding a new card saves it to the server
- Deleting a card opens a confirmation modal; once confirmed, the card is removed from both the database and the page
- Liking and unliking a card persists after refresh
- Buttons display loading text ("Saving...", "Deleting...") while a request is in progress
- Hovering over the profile picture reveals an edit icon that opens an avatar-update modal

## Technologies and techniques used

- Semantic HTML5
- Flexbox and BEM (Flat BEM file structure)
- CSS animations and transitions
- JavaScript ES6 modules
- Webpack 5 (bundling, Babel transpilation, PostCSS, asset optimization)
- Fetch API and Promises (including `Promise.all` for parallel requests)
- An `Api` class encapsulating all server requests (GET, POST, PATCH, PUT, DELETE)
- Form validation with native HTML5 attributes and the `ValidityState` API

## Live site

https://moise97.github.io/se_project_spots/

## Project Pitch Videos

Check out these videos, where I describe my project and some challenges I faced while building it:

- [Spots Stage 2 Pitch](https://drive.google.com/file/d/1K_Kfwh-7xRiyaCGlSvr3afaQXshjygB2/view?usp=drivesdk)
- [Spots stage 3](https://drive.google.com/file/d/1yCKZR02fnOAERunNhec4zlLFMzvpZ_aE/view?usp=drive_link)

- [Spots Final Stage Pitch](https://drive.google.com/file/d/1igAJd_I7aYBhkPQCtKW5Bi3EwEzl_MwB/view?usp=sharing)

## Plan on improving the project

- Add inline error messages tied to specific API error codes
- Add a loading spinner animation in addition to button text changes
- Implement user authentication so multiple users can have their own profiles
