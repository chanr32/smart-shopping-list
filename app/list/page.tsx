"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowUturnLeftIcon,
  CheckCircleIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/16/solid";

export default function ListPage(req: any) {
  const userId = "1";
  const [shoppingItems, setShoppingItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [view, setView] = useState("SHOPPINGLIST");

  useEffect(() => {
    fetchShoppingList();
    fetchBoughtList();
  }, []);

  const fetchShoppingList = async () => {
    try {
      const response = await axios.get(
        `/api/user/${userId}/items/shopping-list`
      );
      setShoppingItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBoughtList = async () => {
    try {
      const response = await axios.get(
        `/api/user/${userId}/items/shopping-list`
      );
      setBoughtItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewChange = () => {
    const newView = view == "SHOPPINGLIST" ? "BOUGHTLIST" : "SHOPPINGLIST";
    setView(newView);
  };

  const items = view == "SHOPPINGLIST" ? shoppingItems : boughtItems;
  const title = view == "SHOPPINGLIST" ? "Shopping List" : "Bought List";
  const actionButton =
    view == "SHOPPINGLIST" ? (
      <CheckCircleIcon className="size-5 mr-2 text-green-500 cursor-pointer" />
    ) : (
      <ArrowUturnLeftIcon className="size-5 mr-2 text-black-500 cursor-pointer" />
    );

  return (
    <div className="md:w-1/2 mx-auto">
      <div className="flex gap-2 items-center">
        <h1 className="text-4xl font-extrabold dark:text-white">{title}</h1>
        <span>
          <ArrowsRightLeftIcon
            className="size-5 text-gray-500 cursor-pointer"
            onClick={handleViewChange}
          />
        </span>
      </div>

      <ul id="todo-list">
        {items.map((item: any) => {
          const isChecked = !item.onList;
          return (
            <li
              className="border-b border-gray-200 flex items-center justify-between py-4"
              key={item.id}
            >
              <label className="flex items-center">
                {actionButton}
                <span className="text-lg text-gray-900 dark:text-white">
                  {item.name}
                </span>
              </label>
              <div className="row-start-2 flex gap-2 flex-wrap items-center justify-center">
                <PencilSquareIcon className="size-6 text-blue-500 cursor-pointer" />
                <TrashIcon className="size-6 text-red-500 cursor-pointer" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
