const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var urlEncodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect("mongodb://localhost:27017/todo");

var todoSchema = new mongoose.Schema({
  item: String,
});

var ToDo = mongoose.model("Todo", todoSchema);

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    ToDo.find({}, function (err, data) {
      if (err) throw err;
      res.render("todo", { todoList: data });
    });
  });

  app.post("/todo", urlEncodedParser, function (req, res) {
    console.log(req.body);
    var newItem = ToDo(req.body).save(function (err) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo", function (req, res) {
    ToDo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};
