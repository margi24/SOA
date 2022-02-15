const router = require('express').Router();
const fs = require('fs');
const jwt = require('jsonwebtoken')

var error = 'Internal server error';

router.route('/authenticate').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    fs.readFile('./users.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log('Error opening users.json: ' + err);
            res.json(error);
        } else {
            var data;
            try {
                data = JSON.parse(jsonString);
            } catch (err) {
                console.log('Error parsing JSON: ' + err);
                res.json({ error });
            }

            var is_data_ok = false;
            data.forEach((entry) => {
                if (username === entry.username && entry.password === password) {
                    is_data_ok = true;
                }
            });

            if(is_data_ok) {
                const token = generateAccesToken(username)
                console.log(token)
                res.json(token);
            } else {
                error = 'Wrong password';
                res.json({ error });
            }
        }
    });
});

function generateAccesToken(userEmail) {
    return jwt.sign({ userEmail: userEmail }, 'secret', { expiresIn: '3600s' })
}

module.exports = router;