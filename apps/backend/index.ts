import express from 'express';
import { prismaClient } from "db/client";
const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
    prismaClient.user.findMany()
    .then((users: any) => {
        res.json(users);
    }).catch((err:any) => {
        res.status(500).json({error: err});
    })
})

app.post("/user", (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        res.status(400).json({error: "Username and password are required"});
        return;
    }
    prismaClient.user.create({
        data: {
            username,
            password
        }
    }).then((user: any) => {
        res.status(201).json(user);
        return;
    })
    .catch((err: any) => {
        res.status(500).json({error: err});
        return;
    })
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
