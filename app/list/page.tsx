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
      const response = await axios.get(`/api/user/${userId}/items/bought-list`);
      setBoughtItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUpdateItem = async (itemId: string, onList: boolean) => {
    try {
      const response = await axios.post(`/api/item/${itemId}/switch-list`, {
        onList: onList,
      });

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDeleteItem = async (itemId: string) => {
    try {
      const response = await axios.delete(`/api/item/${itemId}`);

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewChange = () => {
    const newView = view == "SHOPPINGLIST" ? "BOUGHTLIST" : "SHOPPINGLIST";
    setView(newView);
  };

  const handleItemListChange = async (id: string, onList: boolean) => {
    const item = await fetchUpdateItem(id, !onList);

    if (item.onList) {
      setShoppingItems([...shoppingItems, item]);
      setBoughtItems(
        boughtItems.filter((boughtItem) => boughtItem.id !== item.id)
      );
    } else {
      setBoughtItems([...boughtItems, item]);
      setShoppingItems(
        shoppingItems.filter((shopItem) => shopItem.id !== item.id)
      );
    }
  };

  const handleDeleteItem = async (id: string) => {
    const item = await fetchDeleteItem(id);

    if (item.onList) {
      setShoppingItems(
        shoppingItems.filter((shoppingItem) => shoppingItem.id !== item.id)
      );
    } else {
      setBoughtItems(
        boughtItems.filter((boughtItem) => boughtItem.id !== item.id)
      );
    }
  };

  const shopVisible = view === "SHOPPINGLIST" ? "visible" : "hidden";
  const boughtVisible = view === "BOUGHTLIST" ? "visible" : "hidden";

  return (
    <>
      <div className={`md:w-1/2 mx-auto ${shopVisible}`}>
        <div className="flex gap-2 items-center">
          <h1 className="text-4xl font-extrabold dark:text-white">
            Shopping List
          </h1>
          <span>
            <ArrowsRightLeftIcon
              className="size-5 text-gray-500 cursor-pointer"
              onClick={handleViewChange}
            />
          </span>
        </div>

        <ul id="shopping-list">
          {shoppingItems.map((item: any) => {
            return (
              <li
                className="border-b border-gray-200 flex items-center justify-between py-4"
                key={item.id}
              >
                <label className="flex items-center">
                  <span
                    onClick={() => handleItemListChange(item.id, item.onList)}
                  >
                    <CheckCircleIcon className="size-5 mr-2 text-green-500 cursor-pointer" />
                  </span>
                  <span className="text-lg text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                </label>
                <div className="row-start-2 flex gap-2 flex-wrap items-center justify-center">
                  <PencilSquareIcon className="size-6 text-blue-500 cursor-pointer" />
                  <TrashIcon
                    className="size-6 text-red-500 cursor-pointer"
                    onClick={() => handleDeleteItem(item.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`md:w-1/2 mx-auto ${boughtVisible}`}>
        <div className="flex gap-2 items-center">
          <h1 className="text-4xl font-extrabold dark:text-white">
            Bought List
          </h1>
          <span>
            <ArrowsRightLeftIcon
              className="size-5 text-gray-500 cursor-pointer"
              onClick={handleViewChange}
            />
          </span>
        </div>
        <ul id="bought-list">
          {boughtItems.map((item: any) => {
            return (
              <li
                className="border-b border-gray-200 flex items-center justify-between py-4"
                key={item.id}
              >
                <label className="flex items-center">
                  <span
                    onClick={() => handleItemListChange(item.id, item.onList)}
                  >
                    <ArrowUturnLeftIcon className="size-5 mr-2 text-black-500 cursor-pointer" />
                  </span>
                  <span className="text-lg text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                </label>
                <div className="row-start-2 flex gap-2 flex-wrap items-center justify-center">
                  <PencilSquareIcon className="size-6 text-blue-500 cursor-pointer" />
                  <TrashIcon
                    className="size-6 text-red-500 cursor-pointer"
                    onClick={() => handleDeleteItem(item.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
