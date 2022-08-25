const TASK = require("../models/TODO");
const CardTask = require("../models/CardTASK");
const route = require("express").Router();
const Joi = require("joi");

const schema = Joi.object({
  text: Joi.string().required(),
  cardTaskId: Joi.number(),
  // isDone: Joi.boolean().required(),
});

const cardSchema = Joi.object({
  title: Joi.string().required(),
});

const debug = require("debug")("routes:admin");

//GET ALL TASK'S OF EACH CARD
route.get("/cards/", async (req, res) => {
  const allTasks = [];
  const allCard = await CardTask.findAll({});
  for (let i = 0; i < allCard.length; i++) {
    let card = {
      cardName: allCard[i].title,
      cardId: allCard[i].id,
      notDone: [],
      done: [],
      tasks: [],
    };
    const alltasks = await TASK.findAll({
      where: {
        cardTaskId: allCard[i].id,
      },
    });
    const done = await TASK.findAll({
      where: {
        cardTaskId: allCard[i].id,
        isDone: true,
      },
    });
    const notdone = await TASK.findAll({
      where: {
        cardTaskId: allCard[i].id,
        isDone: false,
      },
    });

    card["tasks"] = alltasks;
    card["done"] = done;
    card["notDone"] = notdone;
    allTasks.push(card);
  }

  return res.json(allTasks);
});

//GET ALL TASKS TO DO
route.get("/", async (req, res) => {
  const allTasksToDo = await TASK.findAll({
    where: {
      isDone: false,
    },
  });
  return res.json(allTasksToDo);
});
//CREATE NEW TASK
route.post("/", async (req, res) => {
  const { error, value } = schema.validate(req.body);
  let task;
  if (error) return res.status(400).json({ message: error.details[0].message });
  //debug(value);
  if (!value.cardTaskId) {
    const untitledCard = await CardTask.create();
    value.cardTaskId = untitledCard.id;
    task = await TASK.create({
      ...value,
    });
  } else {
    task = await TASK.create({
      ...value,
    });
  }
  if (!task) return res.json({ message: "insert task went wrong" });

  res.json(task);
});

//UPDATE CARD'S TITLE cuz why not
route.put("/card/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "invalid id" });
  const card = await CardTask.findByPk(id);
  if (!card)
    return res.status(404).json({ message: "card not found", status: false });

  const { error, value } = cardSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  await card.update(value);
  const updatedCard = await card.save();

  res.json(updatedCard);
});

//UPDATE TASK'S TEXT and card's ID
route.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "invalid id" });
  const task = await TASK.findByPk(id);
  if (!task)
    return res.status(404).json({ message: "task not found", status: false });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  await task.update(value);
  const updatedTask = await task.save();

  res.json(updatedTask);
});

// UPDATE TASK STATUS ISDONE TO TRUE
route.put("/check/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "invalid id" });

  const task = await TASK.findByPk(id);
  if (!task)
    return res.status(404).json({ message: "task not found", status: false });

  task.isDone = !task.isDone;
  const updatedTask = await task.save();

  res.json(updatedTask);
});

//DELETE TASK
route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "invalid id" });

  const count = await TASK.destroy({ where: { id: id } });

  if (!count) return res.status(500).json({ message: "error deleting task" });
  return res.status(200).json({ message: "task deleted succesfully" });
});

module.exports = route;
