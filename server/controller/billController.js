import BillModel from "../models/billModel.js";
import FeedModel from "../models/feedBackModel.js";
import userModel from "../models/userModel.js";

const createBill = async (req, res) => {
  const { locations, car, grandtotal, token, datetime } = req.body;

  console.log({ locations, car, grandtotal, token, datetime });
  try {
    // if(datetime.time!=="undefined:undefined")
    const bills = await BillModel.find({ email: token.email });

    const user = await userModel.find({ email: car.name });

    if (bills.length <= 0) {
      let newBill = new BillModel();
      newBill.locations = locations;
      newBill.car = car;
      newBill.grandtotal = grandtotal;
      newBill.email = token.email;
      newBill.datetime = datetime;
      await newBill.save();

      await userModel.findOneAndUpdate(
        { email: car.name },
        {
          $push: {
            msg: {
              message: "You have a booking",
              sender_email: token.email,
              locations: locations,
              car: car,
              grandtotal: grandtotal,
              datetime: datetime,
            },
          },
        }
      );
      res
        .status(200)
        .json({ msg: "Cab booking successfull, have a happy ride" });
    } else {
      res.status(400).json({ msg: "You have already booked a cab" });
    }
  } catch (error) {
    res.status(400).json({ msg: "create bill error" });
  }
};

const getBill = (req, res) => {
  const { token } = req.body;
  try {
    BillModel.find({ email: token.email }).then((bill) => {
      if (bill.length <= 0) {
        res.status(404).json({ msg: "You haven't booked a cab" });
      } else {
        res.status(200).json(bill);
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const cancelBill = async (req, res) => {
  const autoid = req.params.id;

  console.log(autoid);

  try {
    console.log(req.body.token.email);

    const response = await BillModel.deleteMany({
      email: req.body.token.email,
    });

    await userModel.findOneAndUpdate(
      { _id: autoid },
      {
        $push: {
          msg: {
            message: "Booking cancelled",
            sender_email: req.body.token.email,
          },
        },
      }
    );

    res.status(201).json({ msg: "Your booking has been canceled" });
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};

const feedBack = async (req, res) => {
  const { autoid, feedback, token } = req.body;

  console.log({ autoid, feedback });
  try {
    let newFeedBack = new FeedModel();
    newFeedBack.user = token.email;
    newFeedBack.auto_id = autoid;
    newFeedBack.feedback = feedback;

    await newFeedBack.save();

    res.status(400).json({ msg: "Your Feedback Added" });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
};

const getFeedback = async (req, res) => {
  const auto_id = req.params.auto_id;
  try {
    const feedBack = await FeedModel.find({ auto_id: auto_id });
    res.status(200).send(feedBack);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export { createBill, getBill, cancelBill, feedBack, getFeedback };
