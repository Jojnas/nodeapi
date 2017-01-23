var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
// var todos = [{
//     id: 1,
//     description: 'meet mom for lunch',
//     completed: false
// }, {
//     id: 2,
//     description: 'go to market',
//     completed: false
// }, {
//     id: 3,
//     description: 'feed the cat',
//     completed: false
// }];
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('todo api');
});

// GET /todos
app.get('/todos', function (req, res) {
    res.json(todos);
});

// GET /todos/:id
// app.get('/todos/:id', function (req, res) {
//     var todoId = parseInt(req.params.id, 10);
//     var matchedTodo;
//
//     // iterate over todos array to find match
//     todos.forEach(function (todo) {
//        if(todoId === todo.id) {
//            matchedTodo = todo;
//        }
//     });
//        if(matchedTodo) {
//            res.json(matchedTodo);
//        } else {
//            res.status(404).send();
//        }
//
// });

app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});

    if(matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }

});

// POST /todos
// app.post('/todos', function (req, res) {
//     var body = req.body;
//
//     //add id field
//     body.id = todoNextId++;
//
//     // push body into array
//     todos.push(body);
//
//
//     res.json(body);
// });

app.post('/todos', function (req, res) {
    var body = req.body;

    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim()) {
        return res.status(400).send();
    }
    //add id field
    body.id = todoNextId++;

    // push body into array
    todos.push(body);


    res.json(body);
});


app.listen(PORT, function () {
   console.log('hej hou: ' + PORT);
});