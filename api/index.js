const express = require("express");
const Place = require("./models/PlaceModel");
const User = require("./models/UserModel");
const Booking = require("./models/BookingModel");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

const connection = mongoose.connect(process.env.MONGO_URI);

const salt = bcrypt.genSaltSync(10);
const jwtSecret = "jsonwebstring";

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:5173",
    origin: "https://travelbooking-app.netlify.app/",
  })
);

app.get("/test", (req, res) => {
  res.json("test");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = User.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });

    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    console.log(userDoc.password);
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (passOK) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              sameSite: "None",
              secure: true,
            })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.json({ name, email, _id });
    });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  console.log(link);
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedfiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    console.log(path);
    const parts = originalname.split(".");
    console.log(parts);
    const ext = parts[parts.length - 1];
    console.log(ext);
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedfiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedfiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  console.log(req.body);
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    price,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  //here , photos was an array of arrays , so converted all the arrays into strings first

  const photos = [];
  for (let i = 0; i < addedPhotos.length; i++) {
    photos[i] = addedPhotos[i].toString();
  }

  const addressF = address.toLowerCase();

  console.log(photos);

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      price,
      title,
      address: addressF,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(placeDoc);
  });
});

app.get("/places", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    const data = await Place.find({ owner: id });
    res.json(data);
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;

  const value = await Place.findById(id);
  console.log(value);
  res.json(value);
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;

  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    price,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  console.log("photos : - " + addedPhotos);

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const placeDoc = await Place.findById(id);
    if (placeDoc.owner.toString() === userData.id) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        price,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      await placeDoc.save();
      console.log(placeDoc);
      res.json("ok");
    }
  });
});

app.get("/index-places", async (req, res) => {
  const values = await Place.find();
  console.log(values);
  res.json(values);
});

app.get("/place/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Place.findById(id);
  res.json(data);
});

app.post("/booking", async (req, res) => {
  const { token } = req.cookies;
  const { place, checkIn, checkOut, guests, name, phone, price } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const doc = await Booking.create({
      place,
      user: userData.id,
      checkIn,
      checkOut,
      guests,
      name,
      phone,
      price,
    });
    res.json(doc);
  });
});

app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const doc = await Booking.find({ user: userData.id }).populate("place");

    res.json(doc);
  });
});

///
app.post("/delete-booking", async (req, res) => {
  const { data } = req.body;
  const { token } = req.cookies;
  console.log("value :-" + data);

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    await Booking.deleteOne({ _id: data });
    res.json("ok");
  });
});

app.get("/search-place/:name", async (req, res) => {
  const { name } = req.params;
  console.log("param" + name);
  const nameF = name.toLowerCase();
  const doc = await Place.find({ address: nameF });
  console.log(doc);
  res.json(doc);
});

app.listen(4000, console.log("Server Instantiated"));

// Harshitsri1625
