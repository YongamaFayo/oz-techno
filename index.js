const flash = require('express-flash');
const session = require('express-session');
const gpBookings = require('./gp-bookings')
const express = require("express");
const app = express();

const exphbs = require('express-handlebars');

// //get body parser / instantiate
const bodyParser = require('body-parser');


// always require your pg
const pg = require("pg");
const Pool = pg.Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/gp-bookings';

const pool = new Pool({
    connectionString
});

var moment = require('moment'); // require
moment().format()


app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(express.static('public'));

//const greetings = greet(pool);

//after ive instantiate my app ,configure , expressJs as handlebars(middleware)
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');



// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
app.use(bodyParser.json());

const bookings = [];
var ticket = 0;

console.log(bookings)

// get something back on the screen, one route
app.get("/", function (req, res) {



    //flash warning message
    req.flash('info',);

    // // 'Flash Message Added'
    // let greet = {
    //   count: await greetings.overallCounter()
    // };

    // const greetedNames = await pool.query('select id, name,count as greets, time as "timeOfGreets" from greetings');


    // put it again the settingsbill data on screen , render it on second parameter:
    res.render("index",
        //{
        //greet,
        // timeOfGreets,
        // names: await greetedNames.rows, title: "Home"
        // }
    );
});




app.post("/booking", function (req, res) {
    const day = req.body.day
    const name = req.body.name;
    const arrivingOn = req.body.time;

    // console.log(day, name, arrivingOn)

    if (day && name && arrivingOn) {
        bookings.push({
            id: bookings.length + 1,
            day,
            name,
            arrivingOn
        });
        ticket++

        res.render("index", {
            bookings,
            //  daysInvalid,
            //  arrivingOnInvalid,
            //  bookingsNameInvalid
        });

    } else {

        function validate(value, result) {
            if (!value) {
                return result;
            }
            return {};
        }

        const daysInvalid = validate(days, {
            style: "is-invalid",
            message: "Enter a valid day"
        });

        const bookingsNameInvalid = validate(name, {
            style: "is-invalid",
            message: "Enter a valid day"
        });

        const arrivingOnInvalid = validate(arrivingOn, {
            style: "is-invalid",
            message: "Please select a arrival day"
        });

    }






    })

    app.get("/confirm" ,function (req, res) {
        // console.log(ticket);
        for (let i = 0; i < bookings.length; i++) {
            var element = bookings[i];
            console.log(element.id);
        }
        // var count = bookings.length;
    res.render("confirm", {num:  element.id})

        
    })

    const PORT = process.env.PORT || 3012
    app.listen(PORT, function () {
        console.log("app started at port:", PORT);
});
