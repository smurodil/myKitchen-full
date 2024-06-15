import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function BarChart() {
  const { user } = useSelector((state) => state.currentUser);
  const { documents: recipe } = useCollection("recipe", [
    "uid",
    "==",
    user.uid,
  ]);

  const recipeInfo = recipe && recipe

  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Cooking Time",
      data: [],
    },
  ]);

  useEffect(() => {
    if (recipe && recipe.length > 0) {
      const categories = recipe.map((recipeItem) => recipeItem.title);
      const cookingTime = recipe.map((recipeItem) => recipeItem.cookingTime);

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: categories,
        },
      }));
      setSeries([
        {
          name: "Cooking Time",
          data: cookingTime,
        },
      ]);
    } else {
      console.error("No data found in the recepies collection");
    }
  }, [recipe]);

  return (
    <div className="app">
      <h2 className="font-bold text-xl mb-5">Statistics of recipes depending on cookingtime, (in minutes)</h2>
      <div className="row">
        <div className="mixed-chart w-full">
          <Chart options={options} series={series} type="bar" width="480" />
        </div>
      </div>
    </div>
  );
}

export default BarChart;
