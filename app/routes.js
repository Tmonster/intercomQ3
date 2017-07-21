fs = require('fs');

// read events from the calendar.json file
function readEvents(callback) {
    // find the file with the json of events and return it
    fs.readFile('calendar.json', 'utf8', function(err, data){
        if(err) {
            callback(err, data);
        }
        var events = JSON.parse(data).events;
        events.sort(function(a, b){
            var datea = new Date(a.year, a.month, a.day);
            var dateb = new Date(b.year, b.month, b.day);
            return (datea.getTime() - dateb.getTime());
        });
        callback(err, events);
    });
};

function getEvents(res) {
    readEvents(function(err, data){
        var today = new Date;
        var pastevents = [];
        var futureevents = [];
        for (var i = 0; i < data.length; i++) {
            // months are 0-11 in javascript
            // we want todays events to also be in the "future events" category
            // so we add 1 day to it to make sure it's added.
            console.log(data[i].year);
            console.log(data[i].month-1);
            console.log(data[i].day+1);
            var eventDate = new Date(data[i].year, data[i].month-1, data[i].day+1);
            if (eventDate.getTime() < today.getTime()) {
                pastevents.push(data[i]);
            } else {
                futureevents.push(data[i])
            }
        }
        data = {
            "pastevents" : pastevents,
            "futureevents" : futureevents
        };
        console.log(data);
        res.json(data);
    });
}

function createEvent(req, res, callback) {
    // req.body.ocassion
    var ocassion = req.body.occasion;
    var invitedCount = req.body.invitedCount;
    var date = new Date(req.body.eventDate);
    var eventYear = date.getFullYear();
    // getMonth returns month number from 0-11
    var eventMonth = date.getMonth()+1;
    var eventday = date.getDate();
    var cancelled = (req.body.cancelled == 'true');
    var newEvent = {
        "occasion": ocassion,
        "invited_count": invitedCount,
        "year" : eventYear,
        "month" : eventMonth,
        "day" : eventday,
        "cancelled" : cancelled
    };
    readEvents(function(err, data){
        if(err) {
            console.log(err);
        }
        var events = data;     
        events.push(newEvent);
        newCalendar = {
            "events" : events
        };
        console.log(JSON.stringify(newCalendar));
        fs.writeFile('calendar.json', JSON.stringify(newCalendar), (err) => {
            if (err) throw err;
            callback(req, res); 
        });
    });
}

function deleteEvent(req, res, callback) {
    readEvents(function(err, data){
        var occasion = req.params.occasion;
        if(err) {
            res.send(err);
        }
        var events = data;
        var index = events.findIndex((event) => {
            return (event.occasion === occasion);
        });
        events = events.slice(0, index).concat(events.slice(index+1, events.length));
        newCalendar = {
            "events" : events
        };
        fs.writeFile('calendar.json', JSON.stringify(newCalendar), (err) => {
            if (err) {
                res.send(err);
            }
            callback(req, res); 
        });
    });
};

module.exports = function (app) {
    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/events', function (req, res) {
        // use mongoose to get all todos in the database
        getEvents(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/events', function (req, res) {
        createEvent(req, res, function(req, res){
           getEvents(res); 
        });
    });

    // // delete a todo
    app.delete('/api/events/:occasion', function (req, res) {
        deleteEvent(req, res, function(req, res){
            getEvents(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
