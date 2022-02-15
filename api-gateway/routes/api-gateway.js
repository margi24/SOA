const express = require('express')
const route = express.Router()
const axios = require('axios');
const sgMail = require('@sendgrid/mail')

var loggedInUsers = []
const url_user = 'http://usersmicroservice:8090/authenticate';
const url_city_breaks = 'http://citybreaksmicroservice:8091/cityBreaks';
sgMail.setApiKey("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");

route.post('/login', async (req, res) => {
    try {
        console.log("In login")
        const user = req.body.username
        const pass = req.body.password
        if (loggedInUsers.findIndex((elem) => elem === user) > -1) {
            console.log('User already logged in')
            res.status(500).send()
        } else {
            console.log("Creating payload")
            payload = {
                "username": user,
                "password": pass
            };
            axios.post(url_user, payload)
                .then(data => {
                    console.log("Response from user microservice")
                    console.log(data)
                    const api_error = data.error;
                    if (typeof api_error == 'undefined') {
                        loggedInUsers.push(user)
                        res.status(200).json(
                            data.data
                        ).send()
                    } else {
                        console.log("Response from user microservice")
                        console.log(api_error);
                        error = data.error;
                        res.json({ error });
                    }
                })
        }
    } catch {
        console.log("Error")
        res.status(500).send()
    }
})

route.post('/logout', async (req, res) => {
    try {
        const username = req.body.username;
        var index = loggedInUsers.indexOf(username);
        console.log(index)
        if (index > -1) {
            loggedInUsers.splice(index, 1);
        }
        console.log(`Logged in users: ${loggedInUsers}`);
        res.json(true);
    } catch {
        console.log("Error")
        res.status(500).send()
    }
});

route.get('/CityBreaks', async (req, res) => {
    const reqUsername = req.query.username;

    try {
        axios.get(url_city_breaks, { params: { username: reqUsername } })
            .then(data => {
                console.log(data)
                const api_error = data.error;
                if (typeof api_error == 'undefined') {

                    res.status(200).json(
                        data.data
                    ).send()
                } else {
                    console.log(api_error);
                    error = data.error;
                    res.json({ error });
                }
            })
    } catch {
        console.log("Error")
        res.status(500).send()
    }
})

route.post('/CityBreaks', async (req, res) => {
    const username = req.body.username;
    const town = req.body.town;
    const date = req.body.date;
    const cost = req.body.cost;
    payload = {
        "username": username,
        "town": town,
        "date": date,
        "cost": cost
    };

    try {
        axios.post(url_city_breaks, payload)
            .then(data => {
                console.log(data)
                const api_error = data.error;
                if (typeof api_error == 'undefined') {

                    res.status(200).json(
                        data.data
                    ).send()
                } else {
                    console.log(api_error);
                    error = data.error;
                    res.json({ error });
                }
            })
    } catch {
        console.log("Error")
        res.status(500).send()
    }
})

route.route('/mail').post((req,res)=>{
    const email = req.body.email;
    console.log(email)
    sgMail.send({
        to: email,
        from: 'dorelpopescu260@gmail.com',
        subject: 'City break review!',
        text: `This is a message from the city break app to you, ${email}`
    }).then(() => {
        console.log('Email sent.');
        res.json({email});
    }).catch((err) => {
        console.log(`Error sending mail: ${err}`);
        res.json({error});
    });
});

module.exports = route;
