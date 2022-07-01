# mix-a-mood

![](/public/images/logo.png)


A light-hearted web app to bring a smile to your day.

A personal sofware engineering project completed in the final weeks of the Makers Academy course, using Node.js and Express. Also using some product design skills learned on Udacity's Product Manager Nanodegree, and some inspiration from Mattias Adolfsson's course on Domestika, The Art of Sketching: Transform Your Doodles into Art.

## Visit the production site

Visit the live site [here](https://mix-a-mood.herokuapp.com/) and have a play.

Some things you could do:
1. Type in a common emotion (e.g. `happy`, `sad` or `tired`) and press `Generate`. See the expression for your mood appear and read how it was generated in the console.
2. Randomly select a mood by pressing `Randomise`. Again, see the expression appear and read how it was generated.
3. Try more left-field emotions. Some of them might be in the in-built front-end library (e.g. `curious`, `surprised`, `thoughtful`), but for sure some will not (e.g. `exhausted`, `bright`). For those, see how the app requested the backend to go check the *WordApi.com* thesaurus for similar words and try to match one of them to an expression in the library. Sometimes it'll find a match (e.g. `exhausted` matches with `tired`, and `bright` with `happy`) but sometimes it'll not find anything (e.g. `blue`).

## Getting started

Clone the repo: `git clone https://github.com/almorcrette/mix-a-mood`

Install the dependencies: `npm install`

Get an authorisation key for WordsApi (e.g. at [RapidApi](https://rapidapi.com/hub), and set it as the `X_RAPIDAPI_KEY` environment variable in a `.env` file in the project root folder. Here's what to put in the `.env` file: 

```
X_RAPIDAPI_KEY=<your-authorisation-key-here>
```

## Usage

Start the app with `npm run start`
(This will run esbuild to bundle JS source files, then run the app on node)

Then, navigate to `http://localhost:3030/` (or different local HTTP port if you have set in in your environment variables)

## Alternate usage

- Bundle JS source files once without launching the app using: `npm run build`
- Bundle JS source files and listen for further code changes using: `npm run build:dev`
- Launch the app (without (re)bundling) with `npm run app`
- Bundle and launch the app in listening mode: `npm run app:dev

## Running tests

Run all tests: `npm run test`

Run unit tests with: `npm run test:unit`

Run end-to-end testing using Cypress with: `npm run test:e2e`

## About the app

The initial concept for mix-a-mood was to build _an app to take a moment to consider your mood, smile, become more aware, and go back to your day more grounded in yourself_

The concept draws on 'check-in' routines that are common in team-working environments, but which sometimes feel superficial, and don't allow team members to genuinely signal that they are anything but 'fine' or 'ok'. Perhaps an app where you are able to generate a humourous cartoon of your mood for yourself based on how you are feeling and share it with your colleagues could create a safer place to be honest, and contribute to greater trust and productivity.

## Design process

I drew on what I've learned about product design from Udacity's Product Manager nanodegree to develop the concept for the app, using the triple diamond design approach, as follows

![](/public/images/triple-diamond-product-design.excalidraw.png)
