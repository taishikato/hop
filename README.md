# Hop - A Tinder like job board app
## What is Hop?
Hop is a Tinder-like job board app that you can hit the button or arrow keys to decide to pass or add it to your favourite job posting list.

This is a project for Supabase Hackathon!

All the development process is here!: [https://twitter.com/taishik_/status/1558484020320768007](https://twitter.com/taishik_/status/1558484020320768007)

## What you can
* Fetch job posting data via Startup.jobs API (Thanks to [@marckohlbrugge](https://twitter.com/marckohlbrugge))
* Add job postings to your favourite job posting list and view it
* Login / Logout with GitHub account
* Edit your profile

## Why I created Hop
During the pandemic, I had a very difficult time finding a job in Canada as an immigrant. In the process, I thought that job hunting in particular should be more fun.

I felt that most of the existing job sites had a lot of text and overall very boring designs, and these made the job search process boring.

I created Hop in the hope that I could change this situation, even if only a little.

## How lucky I was
So [@marckohlbrugge](https://twitter.com/marckohlbrugge) let me use the [Startup.Jobs](https://startup.jobs/) API for Hop.

I call the API on Supabase Edge Function.

## Difficulties

The fact that 50 jobs were retrieved together via API when the /app page of the app was launched, and that these jobs were managed in a global state.

It's hard to manage them so that users don't see the same jobs multiple times.
[It's managed mainly here](https://github.com/taishikato/hop/blob/main/src/pages/app/app-top.tsx#L33-L104)

### Demo
https://hop-app.vercel.app/

### Team member
taishikato: [Twitter](https://twitter.com/taishik_)

### a brief description of how I used Supabase
I used Supabase
* auth
* store data
* function to build an API

### any other info I want the judges to know

* I was interested in Solid.js, so I used it this time as a way to learn about a new technology.

* During the pandemic, I had a very difficult time finding a job in Canada as an immigrant. In the process, I thought that job hunting in particular should be more fun.
I felt that most of existing job sites had a lot of text and overall very boring designs, and these made the job search process boring. I created Hop in the hope that I could change this situation, even if only a little.

### Photo

<img src="https://user-images.githubusercontent.com/980588/185810162-04dcbd67-2574-4691-a8c7-44688a9867a5.jpg" width="300px" style="border-radius: 10px;">

## Routes structure

* `/` - redirect to `/app` if the user is logged in, otherwise shows the LP.
* `/app` - kinda top page for logged in users
* `/profile` - profile setting page
* `/favorites` - favorite job list page

## API repository

* [taishikato/hop-api](https://github.com/taishikato/hop-api)
