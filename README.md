# Youtube video id to mpd

This small server gets video id from url, grabs youtube audio stream url, and plays it in mpd.

## How to use

Install dependencies using `bun install`.

Replace the port/ip of mpd server in `index.ts`, run using `bun run start`.

Go to `http://localhost:3002/video/VIDEO_ID` and it will play in mpd. 

Simplest website that extracts video id from youtube url and sends request to this server is provided in `index.html`.
