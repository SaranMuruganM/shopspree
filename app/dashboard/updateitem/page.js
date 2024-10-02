"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import FormRow from "@/components/FormRow";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 
const page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [updateClick, setUpdateClick] = useState(false);
  const [productID, setProductID] = useState(null);
  const { userId, role } = useAuth();
  console.log(userId);
  useEffect(() => {
    async function fetchData() {
      try {
        const products = await axios.get("http://localhost:3000/api/products/");

        setData(products.data.products);
      } catch (error) {
        console.error("fetching error", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {};
    formData.forEach((value, key) => {
      if (value.trim() !== "") {
        data[key] = value;
      }
    });
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/products/${productID}`,
        data
      );
      console.log("Product Updated", response);
      router.push("/dashboard");
    } catch (error) {
      console.error("there is an error", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${
          updateClick ? "block" : "hidden"
        } border-2 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vh] bg-white z-30 p-4 space-y-4`}
      >
        <h1 className="text-2xl tracking-wide font-bold text-center">
          Update Product
        </h1>

        <FormRow name="name" labelText="Name" type="text" required={false} />
        <FormRow
          name="description"
          labelText="Description"
          type="text"
          required={false}
        />
        <FormRow
          name="category"
          labelText="Category"
          type="text"
          required={false}
        />
        <FormRow name="price" labelText="Price" type="text" required={false} />
        <button
          type="submit"
          className="border rounded bg-black text-white px-4 py-2 mx-auto mt-2 w-[80%]"
        >
          Update
        </button>
      </form>
      <div
        className={`grid md:grid-cols-3 grid-cols-2 gap-4 ${
          updateClick && "opacity-50"
        }`}
      >
        {data.map(({ name, description, category, price, _id }) => {
          return (
            <div className="border p-4 space-y-2" key={_id}>
              <h1 className="text-2xl font-bold tracking-wide">{name}</h1>
              <p>{description}</p>
              <p className="opacity-50 ">{category}</p>
              <p>{price}</p>
              <button
                onClick={() => {
                  setUpdateClick(!updateClick);
                  setProductID(_id);
                }}
                className="border rounded bg-black text-white px-4 py-2 mx-auto mt-2 w-[80%]"
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
