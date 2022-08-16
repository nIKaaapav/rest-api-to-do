const Todo = require('../models/todo')
const users = [{
    name: 'Nika',
    age: 30,
    email: 'nika@gmail.com'
}, {
    name: 'Elena',
    age: 22,
    email: 'elena@gmail.com'
}]
module.exports = {
    test() {
        return  {
            count: Math.trunc(Math.random() *10),
            users: users
        }
    },
    random({min, max, count}) {
        const arr = [];
        for (let i =0; i<count;i++) {
            const random = Math.random() *(max -min) + min;
            arr.push(random)
        }
        return arr;
    },
    addTestUser({user: {name, email}}) {
        const user = {
            name,
            email,
            age: Math.ceil(Math.random() *30)
        }
        users.push(user);
        return user
    },
    async getTodos() {
        try {
            return await Todo.findAll();
        } catch (e) {
            console.log(e);
            throw new Error('Fetch todos not avalible')
        }
    },
    async createTodo({todo}) {
        try{
            return  await Todo.create({
                title: todo.title,
                done: false
            })
        } catch (e) {
            throw new Error('Title is required')
        }
    },
    async completeTodo({id}) {
        try{
            const todo = await Todo.findByPk(+id);
            todo.done = true;
            await todo.save();
            return todo;
        } catch (e) {
            console.log(e)
            throw new Error('id is required')
        }
    },
    async deleteTodo({id}) {
        try{
            const todos = await Todo.findAll({
                where: {
                    id: +id
                }
            });
            const todo = todos[0]
            await todo.destroy();
            return true;
        } catch (e) {
            console.log(e)
            throw new Error('id is required')
            return false;
        }
    }
}