# 1dl-client 
Frontend of the 1dl-project application. 1dl-project is an app that lets you save, 
find and share temporary text entries (such as notes), Each entry has a text tag and 
each tag has its own dedicated page where all entries with that tag are grouped 
together. Tags are also used to search for and access entries: any user can view any 
entry as long as they know its tag. Moreover, any user can save their entries using any tag, including tags already used by other users (however, users cannot delete 
entries created by others). Both the lifetime of entries and the number of entries 
sharing the same tag are limited.

## Requirements
* Node.js (version >= 20)

## Installation
To protect against bots, the application uses Cloudflare Turnstile. 
Therefore, before running the application, make sure you have a Turnstile 
site key and secret key. Then in the root directory of the project, 
create a `.env` file using the `.env.example` file as a base and define 
the following entries:
* `NEXT_PUBLIC_TURNSTILE_KEY`: Turnstile site key
* `TURNSTILE_SECRET_KEY`
* `JWT_KEY`: used to sign user cookies
* `SERVICE_ID`: used by the backend to verify requests. It must match the SERVICE_ID
value stored on the backend server

Then run the following command:
```bash
npm install
```

## Building
```bash
npm run build
```
The builder uses "standalone" preset. The build output will be located 
in the `.next/standalone` directory.

## Launching
Onve you have built the client, you can run the following command:
```bash
node ./.next/standalone/server.js
```
Alternatively, you can just preview the client:
```bash
npm run preview
```