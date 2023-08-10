// import { ModeToggle } from "./components/ModeToggle"
'use client'

import { useState } from "react";

import ModeToggle from "./components/ModeToggle"
import Search from "./components/Search"
import Shows from "./components/Shows";


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
      <Search setUserData={(res: any) => setUserData(res)} setLoading={setLoading}   />
      {userData && <Shows userData={userData}/> }
    </div>
  )
}

export default Home