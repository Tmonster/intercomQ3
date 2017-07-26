## Calendar interface

You can run this on a local environment.
If you don't have node, first install [node and npm](https://www.npmjs.com/get-npm)
make sure you have them proper installed by running the following on the command line.
```
node -v
npm -v
```

Then run the following
```
git clone https://github.com/Tmonster/intercomQ3.git
npm install
npm start
```

and the the calendar app should be running locally at http://localhost:8080

Make sure you have a calendar.json in the home directory of the app that looks like this.
```
{
"events": [
  {
    "occasion": "event0",
    "invited_count": 120,
    "year": 2016,
    "month": 2,
    "day": 14
  },
  {
    "occasion": "event1",
    "invited_count": 23,
    "year": 2016,
    "month": 11,
    "day": 24
  },
  {
    "occasion": "event2",
    "invited_count": 64,
    "year": 2015,
    "month": 12,
    "day": 17,
    "cancelled": true
  },
  {
    "occasion": "event3",
    "invited_count": 55,
    "year": 2016,
    "month": 1,
    "day": 1
  }
]
}
```

## Improvements
There's a lot of room for improvement on this app. I'm still new to node and angular, but this project really helped me get the hang of it. Here are some improvements I would make

1. Run server side validation on new event inputs. Right now you should be able to enter just any random string into ocassion and going input fields
2. Better error handling would go along with the validation of the inputs. Callback functions still rack my brain a bit, so I need to get better at using those.
3. Better structure on how the events are displayed. It's not too bad right now with only future events being shown, but I think it should be easier to see events closer to the current date.
4. Separate CSS and HTML in index.html and remove any inline style rules from HTML elements
5. Implement a better read write function. Right now all events are being read and written when a new event is created/deleted.
6. Add unique ID's to the calendar events. I wasn't sure what liberties I could take with changing the json fields. Looking back at it now though, I'm sure that would not have been a problem. 
7. Make the web-page more mobile-friendly?

