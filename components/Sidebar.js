import Link from "next/link"

const Sidebar = () => {
  return (
    <div className="fixed top-[80px] left-0 w-[150px] bottom-0 bg-black grid gap-8 text-white place-content-center *:p-2 *:border-b *:min-w-full ">
        <Link href="/dashboard/additem">Add Item</Link>
        <Link href="/dashboard/updateitem" >Update Item</Link>     
    </div>
  )
}

export default Sidebar