const express = require("express");

const cors = require("cors");
const { connection } = require("./config/db");
const { Car } = require("./models/cars.model");
const { carsData } = require("./data/car.data");
const { bikesData } = require("./data/bike.data");
const { Bike } = require("./models/bikes.model");
const { bookingModel } = require("./models/booking.model");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("This is the Home Page");
});

app.get("/api", (req, res) => {
  carsData.forEach((car) => {
    const newCar = new Car(car);
    newCar.save();
  });
  bikesData.forEach((bike) => {
    const newBike = new Bike(bike);
    newBike.save();
  });
});

//GET - values of CAR
app.get("/api/cars", async (req, res) => {
  const cars = await Car.find({});
  res.json(cars);
});

//GET - values of Bike
app.get("/api/bikes", async (req, res) => {
  const bikes = await Bike.find({});
  res.json(bikes);
});

app.post("/api/booking", async (req, res) => {
  const { FirstName, LastName, wheels, vehicle, model, startDate, endDate } =
    req.body;

  const overlappingBookings = await bookingModel.find({
    vehicleType: vehicle,
    $or: [
      {
        startDate: { $lte: "2023 - 06 - 10" },
        endDate: { $gte: "2023 - 06 - 01 " },
      },
    ],
  });

  const booking = new bookingModel({
    FirstName,
    LastName,
    wheels,
    vehicle,
    model,
    startDate,
    endDate,
  });

  // if (overlappingBookings) {
  //   res
  //     .status(401)
  //     .send({ message: "Vehicle is already booked for the requested period." });
  // } else {
  if (booking) {
    await booking.save();
    res.status(201).send({ message: "Booking confirmed" });
  }
  // }
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`MongoDb COnnected: ${(await connection).connection.host}`);
  } catch (err) {
    console.log(err);
    console.log(`Error: ${err.message}`);
  }
  console.log(`Server is listening on PORT ${PORT}`);
});
