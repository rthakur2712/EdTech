import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCatalogPageDetails } from "../services/operationa/course";
import { categories } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import CourseSlider from "../components/core/catalog/CourseSlider";
import Foooter from "../components/common/Footer";

export default function Catalog() {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("get", categories.CATEGORIES_API);
        // console.log("res", res);
        const category_id = res.data.categories.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;
        setCategoryId(category_id);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
    })();
  }, [catalogName]);
  useEffect(() => {
    if (categoryId) {
      (async () => {
        setLoading(true);
        try {
          const res = await getCatalogPageDetails(categoryId);
          setCatalogPageData(res);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      })();
    }
  }, [categoryId]);
  // console.log("categoryId",categoryId)
  console.log("catalogPageData", catalogPageData);
  if (!catalogPageData) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="bg-richblack-800 py-8 px-[120px] ">
        <div className="w-[70%] flex flex-col gap-3 ml-10">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-50">
              {catalogPageData.categoryCourses.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData.categoryCourses.name}
          </p>
          <p className="text-sm text-richblack-200">
            {catalogPageData.categoryCourses.description}
          </p>
        </div>
      </div>
      {/* section 1 */}
      <div className="px-[120px] py-11 ml-10 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="text-3xl text-richblack-5">
            Courses to get you started on {catalogPageData.categoryCourses.name}
          </div>
          <div className="flex border-b border-richblack-600 gap-1">
            <div
              className={`px-3 py-2 text-richblack-200 cursor-pointer ${
                active === 1 && "text-yellow-50 border-b border-yellow-50"
              }`}
              onClick={() => setActive(1)}
            >
              Most Popular
            </div>
            <div
              className={`px-3 py-2 text-richblack-200 cursor-pointer ${
                active === 2 && "text-yellow-50 border-b border-yellow-50"
              }`}
              onClick={() => setActive(2)}
            >
              New
            </div>
          </div>
        </div>
        <div>
          {active === 1 ? (
            <CourseSlider
              courses={catalogPageData.mostSellingCourses}
              delay={3000}
            />
          ) : (
            <CourseSlider courses={catalogPageData.newCourses} delay={3000} />
          )}
        </div>
      </div>
      {/* section 2 */}
      <div className="px-[120px] py-11 ml-10 flex flex-col gap-5">
        <p className="text-3xl text-richblack-5">
          Frequently bought {catalogPageData.categoryCourses.name} courses
        </p>
        <div>
          <CourseSlider
            courses={catalogPageData.mostSellingCourses}
            delay={2500}
          />
        </div>
      </div>
      {/* section 3 */}
      <div className="px-[120px] py-11 ml-10 flex flex-col gap-5">
        <p className="text-3xl text-richblack-5">Other Courses</p>
        <div>
          <CourseSlider
            courses={catalogPageData.differentCourses}
            delay={2000}
          />
        </div>
      </div>

      <Foooter />
    </div>
  );
}
