"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [itemName, setItemName] = useState("");

  const { userId, isLoaded, isSignedIn } = useAuth();

  const handleItemChange = (e) => {
    setItemName(e.target.value);
  };

  const handleAddNewItem = async () => {
    if (itemName.length == 0) return;
    try {
      const response = await axios.post(`/api/item`, {
        userId,
        name: itemName,
      });

      setItemName("");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  return (
    <>
      <section className="flex flex-col-reverse justify-center sm:flex-row p-6 items-center gap-8 mb-12">
        <div className="p-6 my-12">
          <form onSubmit={preventDefault}>
            <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
              What do you need?
            </h2>
            <input
              name="item"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="eggs, toilet paper"
              value={itemName}
              onChange={handleItemChange}
              required
            />
            <button
              className="mt-5 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleAddNewItem}
              type="submit"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new item
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
