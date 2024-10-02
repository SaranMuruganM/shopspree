"use client";
import FormRow from "@/components/FormRow";
import { useRouter } from "next/navigation";
import axios from "axios";
import LINK from "next/link"
const page = () => {
  const router = useRouter();
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const data = Object.fromEntries(formdata.entries());
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        data
      );
      console.log(response);
      if (response.status == 200) {
          router.push("/login");
          window.alert("Registered Successfully");
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <div className="grid min-h-screen place-content-center ">
      <form
        onSubmit={handleForm}
        method="post"
        className="border space-y-4 px-16 py-14 w-[50vw] mt-[-120px] topBorder shadow-xl rounded"
      >
        <h1 className="text-4xl tracking-wide text-center">Register</h1>
        <FormRow type="text" labelText="Name" name="name" required={true} />
        <FormRow type="text" labelText="Email" name="email" required={true} />
        <FormRow type="password" labelText="Password" name="password"  required={true}/>
        <div>
        <button
          type="submit"
          className="border rounded bg-black text-white px-4 py-2 mx-auto mt-2 w-[50%]"
          >
          Submit
        </button>
        <p className="mt-4">Already a User? <LINK href={"/login"} className="tracking-wide font-semibold ">Login</LINK></p>
            </div>
      </form>
    </div>
  );
};

export default page;
