const getTestUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Hello World",
    });
  } catch (error) {
    console.log("error in getTestUserController", error);
    res.status(500).json({ message: "error in getTestUser" });
  }
};

module.exports = { getTestUserController };
