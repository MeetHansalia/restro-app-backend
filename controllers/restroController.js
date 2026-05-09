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

const getAllResturantController = async (req, res) => {
  try {
    const resturants = await Resturant.find();
    res.status(200).send({
      success: true,
      message: "All resturants fetched successfully",
      resturants,
      totalCount: resturants.length,
    });
  } catch (error) {
    console.log("error in getAllResturantController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

const getRestrauntByIdController = async (req, res) => {
  try {
    const restroId = req.params.id;
    if (!restroId) {
      return res
        .status(404)
        .send({ success: false, message: "Id is required" });
    }
    const resturant = await Resturant.findById(restroId);
    if (!resturant) {
      return res
        .status(404)
        .send({ success: false, message: "Resturant not found" });
    }
    res.status(200).send({
      success: true,
      message: "Resturant fetched successfully",
      resturant,
    });
  } catch (error) {
    console.log("error in getRestrauntByIdController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

const updateResturantController = async (req, res) => {
  try {
    const { id } = req.userId;
    const { resturant } = req.body;
    const updatedResturant = await Resturant.findByIdAndUpdate(id, resturant, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "Resturant updated successfully",
      updatedResturant,
    });
  } catch (error) {
    console.log("error in updateResturantController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

const deleteResturantController = async (req, res) => {
  try {
    const restroId = req.params.id;
    if (!restroId) {
      return res
        .status(404)
        .send({ success: false, message: "Id is required" });
    }
    const deletedResturant = await Resturant.findByIdAndDelete(restroId);
    if (!deletedResturant) {
      return res
        .status(404)
        .send({ success: false, message: "Resturant not found" });
    }
    res.status(200).send({
      success: true,
      message: "Resturant deleted successfully",
      // deletedResturant,
    });
  } catch (error) {
    console.log("error in deleteResturantController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  updateResturantController,
  getRestrauntByIdController,
  deleteResturantController,
};
