"use client"

import FormRow from "@/components/FormRow"
import axios from "axios";
import { useRouter } from "next/navigation";


const page = () => {
  const router= useRouter();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData= new FormData(e.target);
    const data= Object.fromEntries(formData.entries());
    try{
      const response = await axios.post("http://localhost:3000/api/products/",data);
      console.log("Product Created",response);
      router.push("/dashboard");
    }
    catch(error){
      console.error("there is an error",error)
    }

  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[60%] mx-auto space-y-3 shadow-lg border-t-2 p-4 rounded mt-10"
      method="post"
    >
      <h1 className="text-2xl tracking-wide font-bold text-center">
        Create Product
      </h1>

      <FormRow name="name" labelText="Name" type="text" />
      <FormRow name="description" labelText="Description" type="text" />
      <FormRow name="category" labelText="Category" type="text" />
      <FormRow name="price" labelText="Price" type="text" />
      <button type="submit" className="border rounded bg-black text-white px-4 py-2 mx-auto mt-2 w-[80%]">
        Submit
      </button>
    </form>
  );
}

export default page