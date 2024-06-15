import { useParams } from "react-router-dom";
import { useGetADocument } from "../hooks/useGetADocument";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Recipe() {
  const { id } = useParams();
  const { getDocument } = useGetADocument();
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [cartNum, setCartNum] = useState(1);
  const dispatch = useDispatch();


  const cartIncrease = () => {
    setCartNum(cartNum + 1);
  };

  const cartDecrease = () => {
    if (cartNum > 1) {
      setCartNum(cartNum - 1);
    }
  };

  const addToChartHandler = () => {
    const cartProduct = {
      id: crypto.randomUUID(),
      quantity: cartNum,
      title: document.title,
      images: document.images[0],
      cookingTime: document.cookingTime,
    };
    dispatch(addItemToCart(cartProduct));
    toast.success("Added to cart!");
  };

  getDocument("recipe", id)
    .then((data) => setDocument(data))
    .catch((error) => setError(error));
  return (
    <div className="max-container pt-4">
      <Link to="/" className="text-start">
        <button>Go back</button>
      </Link>
      <h1 className="text-3xl my-4 font-bold">Recipe elements:</h1>
      {document && (
        <>
          <div className="hero gap-5 flex flex-col">
            <div className="carousel carousel-center md:h-full md:max-h-[300px] w-full md:max-w-[1110px]  max-w-md space-x-4 rounded-box bg-neutral p-4">
              {document.images && document.images.map((image) => {
                return (
                  <div key={image} className="carousel-item">
                    <img
                      src={image}
                      className="object-cover rounded-xl h-[500px] md:h-full w-[150px] sm:w-[500px]"
                    />
                  </div>
                )
              })}
            </div>
            <div className="right md:flex md:flex-col md:items-start md:text-left md:w-full">
              <h1 className="text-2xl mb-5">
                <strong>Food's name:</strong> {document.title}
              </h1>
              <h3 className="text-xl mb-5">
                <strong>Cooking times:</strong> {document.cookingTime}
              </h3>
              <h3 className="text-xl mb-5">
                <strong>Ingredients: </strong>
                {document.ingredients && document.ingredients.map((ing, index, ingArray) => {
                  return (
                    <span className="list-none" key={ing}>
                      {ing}
                      {index == ingArray.length - 1 ? "." : ","}{" "}
                    </span>
                  );
                })}
              </h3>
              <p className="text-base mb-5">
                <strong>Method:</strong> {document.method}
              </p>
              <div className="mb-5 text-center mr-auto ml-auto">
                <div className="flex items-center gap-5">
                  <button className="btn btn-accent" onClick={cartDecrease}>
                    <FaMinus />
                  </button>
                  <div>
                    <span>{cartNum}</span>
                  </div>
                  <button className="btn btn-accent" onClick={cartIncrease}>
                    <FaPlus />
                  </button>
                  <button
                    onClick={addToChartHandler}
                    className="btn btn-success text-white w-[140px]"
                  >
                    Add item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Recipe;
