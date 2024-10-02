import Image from "next/image";
import loginPage from "@/assets/loginImage.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-content-center  md:grid-flow-col  md:p-20 p-8 md:gap-8 gap-8">
      <div className="self-center grid md:order-1 order-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
        laudantium ab voluptatum totam aliquid sint deserunt eaque sit dolorem
        perferendis?Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi praesentium excepturi doloremque voluptatibus, provident hic
        assumenda numquam beatae facere vero!
        <div className="flex gap-4 *:border *:p-2 *:bg-black *:text-white mt-4 *:rounded">
          <Link href="/login" className="block">
            Login
          </Link>
          <Link href="/register" className="block">
            Register
          </Link>
        </div>
      </div>
      
        <Image
          src={loginPage}
          alt="Login page image"
          className="md:order-2 order-1 h-full w-full"
        />
    </div>
  );
}
