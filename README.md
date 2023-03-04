# coding-club-website

## Local Development

Local development uses the Vercel CLI. This ensures the consistent output in the developer and production environments, especially since a Node server script cannot run on Vercel due to its serverless nature. The site needs to run on a server so that it can rewrite html files from the pages subdirectory to not need the html extension and make XML requests such as to FontAwesome.

First, you will need the Vercel CLI installed on your computer. Run `npm install -g vercel`
More information on the [Vercel docs](https://vercel.com/docs/cli)

(You will need npm to install this. Install [Node](https://nodejs.org/en/))


### Run Locally

1. Run `vercel dev`
2. Open http://localhost:3000 or another port as instructed