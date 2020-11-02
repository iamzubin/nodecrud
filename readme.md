here are the basic requests

## post : /chars

```
{"firstName":"charlie", "lastName":"harper", "organization": "Marvel", "id": 1 }
```

this adds a new charcter

## put : /chars/:id

```
{"firstName":"charlie", "lastName":"harper", "organization": "Marvel", "id": 1 }
```

this updates a character

## get : /chars

to get a list of all the chars

## delete : /char/:id

this deletes a char from the db

## get : /charsort

this fetches the characters in a sorted manner with the org as "Marvel" and unique lastnames

