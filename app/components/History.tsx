import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  avatar_url: string;
  name: string;
  url: string;
}

const History = () => {
  const [list, setList] = useState<User[]>([]);

  useEffect(() => {
    const details: User[] = JSON.parse(localStorage.getItem('github-users')) || [];
    setList(details);
  }, [list]);

  const handleDelete = (userId) => {
    const users: User[] = JSON.parse(localStorage.getItem('github-users')) || "[]";
    const userToDelete = users.find((user) => user.id === userId)
    if (userToDelete) {
      users.splice(users.indexOf(userToDelete), 1)
    }

    localStorage.setItem("github-users", JSON.stringify(users))
  }

  return (
    <div className='pt-5'>
      <label className="btn btn-primary" htmlFor="modal-2">Search Historys</label>
      <input className="modal-state" id="modal-2" type="checkbox" />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 max-w-3x w-[80%]">
          <label htmlFor="modal-2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
          <h2 className="text-xl">Search History</h2>
          <p className="">Users you search for: </p>
          {list.length === 0 && (
            <h1 className="">No users searched yet</h1>
          )}
          {list.map((item) => (
            <div className="flex gap-2 justify-between" key={item.id}>
              <div className="avatar avatar-ring-success">
                <img src={item.avatar_url} alt={item.name} className='w-full' />
              </div>
              <p className="">{item.name}</p>
              <div className="flex gap-3">
            <button className="btn btn-block p-2">
            <Link href={item.url}>
              Visit
            </Link>
              </button>
            <button onClick={() => handleDelete(item.id)} className="btn btn-error btn-block p-2">Delete</button>
          </div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;