const Category = require("../models/Category");

// create category handler function
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log("Error occured while creating Category", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get all category handler function
exports.showAllCategory = async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      { name: true, description: true }
    );
    return res.status(200).json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    console.log("Error occured while fetching categories", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// get all courses for a particular category
exports.categoryPageDetails = async (req, res) => {
  try {
    // get category
    console.log("request", req.body);
    const { categoryId } = req.body;
    console.log("category id ", categoryId);
    // get courses for specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        populate: [
          {
            path: "instructor",
          },
          {
            path: "ratingAndReviews",
          },
        ],
      })
      .exec();
    // console.log(selectedCategory);
    if (!selectedCategory) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for this category");
      return res.status(404).json({
        success: false,
        message: "No courses found for this category",
      });
    }
    const categoryCourses = selectedCategory;
    // get courses from other categories
    const otherCategories = await Category.find({
      _id: { $ne: categoryId },
    }).populate({
      path: "course",
      populate: {
        path: "instructor",
      },
    });
    console.log(otherCategories);
    let differentCourses = [];
    for (const category of otherCategories) {
      differentCourses.push(...category.course);
    }
    // Get top-selling courses across all categories
    //   const allCategories = await Category.find()
    //   .populate({
    //       path: "course",
    //       match: { status: "Published" },
    //       populate: {
    //           path: "instructor",
    //       },
    //   })
    //   .exec()

    //   const allCourses = allCategories.flatMap((category) => category.course)
    const mostSellingCourses = categoryCourses.course
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    const newCourses = categoryCourses.course.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    res.status(200).json({
      success: true,
      data: {
        categoryCourses: categoryCourses,
        differentCourses: differentCourses,
        mostSellingCourses: mostSellingCourses,
        newCourses: newCourses,
      },
    });
  } catch (error) {
    console.log("Error occured while fetching category page details", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
