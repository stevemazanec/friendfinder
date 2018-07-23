

var friendsList = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsList);
    });
    app.post("/api/friends", function (req, res) {
        var bestMatch = {
            name: "",
            photo: ""
        }

        var newUserScore = req.body.answers;
        var bestMatchDiff = 30;
        for (var j = 0; j < friendsList.length; j++) {
            var friendAnswers = friendsList[j].answers;
            var arrdiff = 0;
            for (var k = 0; k < 10; k++) {
                arrdiff += Math.abs(newUserScore[k] - friendAnswers[k])

            }
            if (arrdiff < bestMatchDiff) {
                bestMatch = {
                    name: friendsList[j].name,
                    photo: friendsList[j].photo
                }
                bestMatchDiff = arrdiff;
            }
        }
        console.log("Your best match is: " + bestMatch.name + "\n" + bestMatch.photo);
        res.json(bestMatch);
        friendsList.push(req.body);

    });
};