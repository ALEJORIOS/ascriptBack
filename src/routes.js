import bodyParser from "body-parser";

export function routes(app) {
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.send('Hola mundo!');
    })

    app.post('/new', (req, res) => {
        console.log(req.body)
        res.send(req.body);
    })
    return app;
}