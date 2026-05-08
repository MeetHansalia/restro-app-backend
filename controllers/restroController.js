const Resturant = require("../models/resturantModel");

const createResturantController = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      food,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rattings,
      rattingCount,
      code,
      coordinates,
    } = req.body;

    if (!title) {
      return res
        .status(500)
        .send({ success: false, message: "title is required" });
    }
    if (!coordinates) {
      return res
        .status(500)
        .send({ success: false, message: "coordinates is required" });
    }

    const newResturant = new Resturant({
      title,
      description,
      image,
      food,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rattings,
      rattingCount,
      code,
      coordinates,
    });
    await newResturant.save();
    res.status(200).send({
      success: true,
      message: "Resturant created successfully",
      newResturant,
    });
  } catch (error) {
    console.log("error in createResturantController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

module.exports = {
  createResturantController,
};
