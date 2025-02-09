"use client";

import { useState, useEffect } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/16/solid";

export default function ListPage(req: any) {
  const userId = "1";
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/user/${userId}/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  return (
    <div className="md:w-1/2 mx-auto">
      <h1 className="text-4xl font-extrabold dark:text-white">Shopping List</h1>
      <ul id="todo-list">
        {items.map((item: any) => {
          const isChecked = !item.on_list;
          return (
            <li
              className="border-b border-gray-200 flex items-center justify-between py-4"
              key={item.id}
            >
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" checked={isChecked} />
                <span>{item.name}</span>
              </label>
              <div className="row-start-2 flex gap-6 flex-wrap items-center justify-center">
                <PencilSquareIcon className="size-6 text-blue-500" />
                <TrashIcon className="size-6 text-red-500" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
