import express from "express";

const router = express.Router();

const users = [
  {
    firstname: "john",
    lastname: "Doe",
    age: "24",
  },
  {
    firstname: "Jane",
    lastname: "Doe",
    age: "23",
  },
];

router.get("/", (eq, res) => {
  console.log(users);

  res.send("Hello");
});

router.post("/", (req, res) => {
  console.log("POST ROUTE REACHED");
  res.send("POST ROUTE REACHED");
});

router.post("/", (req, res) => {});

export default router;
