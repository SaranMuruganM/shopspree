"use client"
import { useState,useEffect } from "react";
import axios from 'axios';
const page = () => {
  const [data,setData] =useState([]);
 useEffect(()=>{
   async function fetchData(){
    try{
      const products = await axios.get("http://localhost:3000/api/products/");
     
      setData(products.data.products);
    }
    catch(error){
      console.error("fetching error",error)
    }
    
  }
  fetchData();
 },[])

 const handleDelete=async(id)=>{
  try{
    await axios.delete(`http://localhost:3000/api/products/${id}`)
    window.alert("Deleted")
    setData((prevData) => prevData.filter((product) => product._id !== id));
  }
  catch(error){
    console.errror("error while deleting",error)

  }

 }
  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-4">

      {data.map(({name,description,category,price,_id})=>{
        return(
      <div className="border p-4 space-y-2" key={_id}>
        <h1 className="text-2xl font-bold tracking-wide">{name}</h1>
        <p>{description}</p>
        <p className="opacity-50 ">{category}</p>
        <p >{price}</p>
        <button onClick={()=>handleDelete(_id)} className="border rounded bg-black text-white px-4 py-2 mx-auto mt-2 w-[80%]">Delete</button>
      </div>

        )

      })}

      
    </div>
  );
};

export default page;
