import { useSelector } from "react-redux";

export default function Profile() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold my-2' >Profile</h1>
      <form className="flex flex-col gap-4">
        <img className="rounded-full object-cover h-24 w-24 cursor-pointer self-center mt-7" src={currentUser.avatar} alt="Profile image" />
        <input className="p-3 rounded-lg border" type="text" placeholder="username" id="username" />
        <input className="p-3 rounded-lg border" type="email" placeholder="email" id="email" />
        <input className="p-3 rounded-lg border" type="password" placeholder="password" id="password" />
        <button className="bg-slate-700 p-3 rounded-lg border text-white">Update</button>
        <div className="mt-2 flex justify-between">
          <span className="text-red-700  text-sm">Delete account</span>
          <span className="text-red-700 text-sm">Sign out</span>
        </div>
        </form>  
    </div>
  )
}
