"use client";
import FormRow from "@/components/FormRow";
import { useRouter } from "next/navigation";
import axios from "axios";
const page = () => {
  const router = useRouter();
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const data = Object.fromEntries(formdata.entries());
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        data,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status == 200) {
        router.push("/dashboard");
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
        className="border space-y-8 px-16 py-14 w-[50vw] mt-[-140px] topBorder shadow-xl rounded"
      >
        <h1 className="text-4xl tracking-wide text-center">Login</h1>
        <FormRow type="text" labelText="Email" name="email" />
        <FormRow type="password" labelText="Password" name="password" />
        <button
          type="submit"
          className="border rounded bg-black text-white px-4 py-2 mx-auto mt-2 w-[50%]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
