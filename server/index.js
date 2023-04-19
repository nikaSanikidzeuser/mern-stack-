import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//config
mongoose.connect(
  "mongodb+srv://sdd990671:araferi1234@cluster0.tkrn0wq.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

//model

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = new mongoose.model("user", userSchema);
//routes

//login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login successfull", user: user });
      } else {
        res.send({ message: "password did not match" });
      }
    } else {
      res.send({ message: "user not registered" });
    }
  } catch (err) {
    res.send(err);
  }
});


//register route

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      await user.save();
      res.send({ message: "Successfully Registered, Please login now." });
    }
  } catch (err) {
    res.send(err);
  }
});

app.listen(5000, () => {
  console.log("started at port 5000");
});
