'use client'
import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useContext, useEffect, useState } from "react";

const Search = ({ setUserData, setLoading }: any) => {
	const {toast} = useToast()
  const [textValue, setValue] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!textValue) return;
		setLoading(true);
		setUserData(null);
		try {
			const res = await fetch(`https://api.github.com/users/${textValue}`);
			const data = await res.json();

			if (data.message) {
				return toast({
					variant: "destructive",
					title: "Error",
					description: data.message === "Not Found" ? "User not found" : data.message,
					// status: "error",
					duration: 3000,
					// isClosable: true,
				});
			}
			setUserData(data);
			addUserToLocalStorage(data, textValue);
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
				// status: "error",
				duration: 3000,
				// isClosable: true,
			});
		} finally {
			setLoading(false);
		}
	};

	const addUserToLocalStorage = (data, username) => {
		const users = JSON.parse(localStorage.getItem("github-users")) || []
		console.log(users)
		const userExists = users.find((user: any) => user.id === username)
		console.log(userExists)
		if (userExists) {
			users.splice(users.indexOf(userExists), 1)
		}
		users.unshift({
			id: username,
			avatar_url: data.avatar_url,
			name: data.name,
			url: data.html_url
		})

		localStorage.setItem("github-users", JSON.stringify(users))
		console.log(users)
	}
  return (
    <div className="pt-8">
        

        <form className="" onSubmit={handleSubmit}>   
    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400 fill-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="text" className="block w-full p-4 pl-10 text-sm text-gray-900  bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white rounded-2xl outline-none shadow-xl" placeholder="Search Github username..." onChange={(e) => setValue(e.target.value)} />
        <button type="submit" className={`text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${!textValue ? 'opacity-75' : ''}`} disabled={!textValue}>Search</button>
    </div>
</form>

    </div>
  )
}

export default Search