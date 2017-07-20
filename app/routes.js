fs = require('fs');

function getEvents(res) {
    // find the file with the json of events and return it
    fs.readFile('calendar.json', 'utf8', function(err, data){
        if(err) {
            console.log("heellooo");
            res.send(err);
        }
        var events = JSON.parse(data).events;
        events.sort(function(a, b){
            var datea = new Date(a.year, a.month, a.day);
            var dateb = new Date(b.year, b.month, b.day);
            return (datea.getTime() - dateb.getTime());
        });
        res.json(events);
    });
};

// function deleteEvent(occasion) {
//     var events = getEvents(res);
//     var updatedevents;
//     for (var event in events["events"]){
//         if (event["occasion"] != occasion) {
//             updatedevents.push(event);
//         }
//     }
//     fs.writeFile('calendar.json', updatedevents, (err) => {
//         if (err) res.send(err);
//         res.json("success");
//     });
// }

function createEvent(req, res, callback) {
    // req.body.ocassion
    // req.body.invitedCount blah blah blah
    var ocassion = 'test new ocassion';
    var invitedCount = '340';
    var eventYear = '2017';
    var eventMonth = '8';
    var eventday = '20';
    var cancelled = false;
    var newEvent = {
        "occasion": ocassion,
        "invited_count": invitedCount,
        "year" : eventYear,
        "month" : eventMonth,
        "day" : eventday,
        "cancelled" : cancelled
    };
    fs.readFile('calendar.json', function(err, data){
        if(err) {
            console.log(err);
            res.send(err);
        }
        var events = (JSON.parse(data)).events;
        var updatedevents = [];
        for (var i = 0 ; i < events.length ; i++){
            updatedevents.push(events[i]);
        }
        updatedevents.push(newEvent);
        newCalendar = {
            "events" : updatedevents
        };
        console.log(JSON.stringify(newCalendar));
        fs.writeFile('calendar.json', JSON.stringify(newCalendar), (err) => {
            if (err) throw err;
            callback(req, res); 
        });
    });
    
}

module.exports = function (app) {
    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/events', function (req, res) {
        // use mongoose to get all todos in the database
        getEvents(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        // create a todo, information comes from AJAX request from Angular
        createEvent(req, res, function(req, res){
           getEvents(res); 
        });
    });

    // // delete a todo
    // app.delete('/api/todos/:todo_id', function (req, res) {
    //     deleteEvent();
    //     getEvents(res);
    // });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
