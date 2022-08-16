const express = require('express');
const path = require('path');
const {graphqlHTTP} = require('express-graphql')
const sequelize = require('./utils/sequelize');
const schema = require('./graphql/schema');
const revolver = require('./graphql/revolver');
// const todoRouters = require('./routs/todo');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(graphqlHTTP({
    schema: schema,
    rootValue: revolver,
    graphiql: true
}))

// app.use('/api/todo',todoRouters)

app.use((req, res, next) => {
    res.sendFile('/index.html')
})

async function start() {
    try {
        await sequelize.sync(
            // {
            // force: true // обновляет таблицы при изменении модели
        // }
        );
        app.listen(PORT)
    } catch (e) {
        console.log(e);
    }
}
start();
