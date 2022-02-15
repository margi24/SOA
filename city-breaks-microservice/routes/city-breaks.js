const router = require('express').Router();
const fs = require('fs');

router.route('/cityBreaks').get((req, res) => {
    const username = req.query.username;
    console.log(`query username:  ${username}`);

    fs.readFile('./city-breaks.json', 'utf-8', (err, jsonString) => {

        if (err) {
            console.log(`Error opening file.json:  ${err}`);
            res.json(error);
        } else {
            var data;
            try {
                data = JSON.parse(jsonString);
            } catch (err) {
                console.log(`Error parsing JSON:  ${err}`);
                res.json({ error });
            }

            var cityBreaks = [];
            data.forEach((entry) => {
                if (username === entry.username) {
                    cityBreaks.push({
                        "username": entry.username,
                        "town": entry.town,
                        "date": entry.date,
                        "cost": entry.cost
                    });
                }
            });

            res.json(cityBreaks);
        }
    });
});

router.route('/cityBreaks').post((req, res) => {
    const username = req.body.username;
    const town = req.body.town;
    const date = req.body.date;
    const cost = req.body.cost;

    fs.readFile('./city-breaks.json', 'utf-8', (err, jsonString) => {

        if (err) {
            console.log(`Error opening file.json:  ${err}`);
            res.json(error);

        } else {

            var data;
            try {
                data = JSON.parse(jsonString);
            } catch (err) {
                console.log(`Error parsing JSON:  ${err}`);
                res.json({ error });
            }

            data.push({
                "username": username,
                "town": town,
                "date": date,
                "cost": cost
            });

            fs.writeFile('./city-breaks.json', JSON.stringify(data), (err) => {
                if (err) {
                    console.log(`Error opening file.json: ${err}`);
                    res.json(error);
                } else {
                    res.json({
                        "username": username,
                        "town": town,
                        "date": date,
                        "cost": cost
                    });
                }
            });
        }
    });
});

module.exports = router;