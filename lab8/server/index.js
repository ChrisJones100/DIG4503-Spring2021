import Express from "express";
import CORS from 'cors';

const App = Express();
const port = 45030;

App.use(CORS());

let names = [
    'Cortney',
    'Dewayne',
    'Trenton',
    'Pamala',
    'Ettie',
    'Errol',
    'Lorrie',
    'Hang',
    'Lauryn',
    'Caterina',
    'Isa',
    'Marcela'
];

App.get('/people/:person', (req, res) => {
    let person = req.params.person
    let result = {"name" : "Not found!"};

    names.forEach((value) => {
        if(value == person) {
            result = {"name": value};
        }
    })
    res.json(result)
});

App.put("/people/:person", (req, res) => {

    let person = req.params.person
    let result = {"name": person}
    names.push(person)
    res.json(result)

});

App.get('/search/:name', (req, res) => {
    let result = {search: ["Not found!"]};

    let arrayResult = [];

    names.forEach((value) => {
        if(value.includes(req.params.name)) {
            arrayResult.push(value)
    }
    });

    if(arrayResult.length > 0) {
        result = {search: arrayResult};
    }
    res.json(result)
});


App.listen(port, function(){
    console.log("Server running!");
});
