# Example using `winston-graylog2`

## Get a local Graylog running in docker-compose
We use `docker-compose` to get a test Graylog instance up and running locally.

I use pipenv to keep docker-compose a bit safer, so if you don't have `docker-compose`
installed globally, but do have pipenv:

```
pipenv install
pipenv shell
docker-compose up
# just type `exit` at the pipenv shell to exit the virtual environment
```

If you do have `docker-compose` installed globally, just do `docker-compose up`.

When it's done pulling all the images and it's into it's logging phase, you can
open a web browser to http://localhost:9000 and login using `admin/admin`.
You'll want to dismiss the User Guide.

## Launch the proof-of-concept

In another terminal (unless you daemonized `docker-compose`).

```
npm install
npm run start
```

## Check that logs are appearing in Graylog.
You should be able to refresh the Graylog page (or set it to autorefresh) and you'll
start seeing new Graylog messages about every 3 seconds.
