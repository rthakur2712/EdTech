const mongoose = require("mongoose");
const Section = require("./Section");
const SubSection = require("./SubSection");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required:true,
      ref: "SubSection",
    },
  ],
});

sectionSchema.methods.deleteSubSections = async function () {
  try {
    // const section = await this.findById(sectionId);
    console.log("this", this);
    await SubSection.deleteMany({ _id: { $in: this.subSection } });
  } catch (error) {
    console.log("Error occured while deleting sub-sections", error);
    throw error;
  }
};

module.exports = mongoose.model("Section", sectionSchema);
