// import { ModeToggle } from "./components/ModeToggle"
'use client'

import { Suspense, useState } from "react";

import ModeToggle from "./components/ModeToggle"
import Search from "./components/Search"
import Shows from "./components/Shows";
import History from "./components/History";
import Loader from "./components/Loader";


const Home = () => {
  const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);
  console.log(userData)
  return (
    <div className="">
      <div className=' flex justify-between'>
        <h1 className="font-semibold text-xl text-[1.625rem]">devfinder</h1>
        <ModeToggle />   
      </div>
      {/* <button className="bg-blue-500 p-2 rounded flex justify-between mx-auto mt-3">
        Search Historys
      </button> */}
      <History />
      <Search setUserData={(res: any) => setUserData(res)} setLoading={setLoading}   />
      <Suspense fallback={<Loader/>}>
      {userData && 
      <Shows userData={userData}  setLoading={setLoading} />}
    </Suspense>
    </div>
  )
}

export default Home