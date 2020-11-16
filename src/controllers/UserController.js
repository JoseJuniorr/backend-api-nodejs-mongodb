const User = require("../models/User");
module.exports = {
  async index(req, res) {},
  async show(req, res) {},
  async store(req, res) {
    const data = req.body;

    const user = await User.create();
  },
  async update(req, res) {},
  async delete(req, res) {},
};
