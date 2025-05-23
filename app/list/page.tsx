"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowUturnLeftIcon,
  CheckCircleIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/16/solid";
import AddHistoryModal from "../components/AddHistoryModal";

type Item = {
  id: String;
  userId: String;
  name: String;
  onList: Boolean;
  isDeleted: Boolean;
  lastPurchaseDate: Date;
};

export default function ListPage(req: any) {
  const [shoppingItems, setShoppingItems] = useState<Item[]>([]);
  const [boughtItems, setBoughtItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("SHOPPINGLIST");
  const [selectedItem, setSelectedItem] = useState("");

  const { userId, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      fetchShoppingList();
      fetchBoughtList();
    }
  }, [isLoaded, userId]);

  const fetchShoppingList = async () => {
    try {
      const response = await axios.get(`/api/item/user/${userId}/shop-list`);
      setShoppingItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBoughtList = async () => {
    try {
      const response = await axios.get(`/api/item/user/${userId}/bought-list`);
      setBoughtItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const returnToShopList = async (itemId: string) => {
    try {
      const response = await axios.put(`/api/item/${itemId}/`, {
        onList: true,
      });

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const moveToBoughtList = async (itemId: string) => {
    try {
      const response = await axios.put(`/api/item/${itemId}/`, {
        onList: false,
      });

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createHistory = async (
    itemId: string,
    brand: string,
    price: number
  ) => {
    try {
      const response = await axios.post(`/api/history`, {
        userId,
        itemId,
        brand,
        price,
      });

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (itemId: string) => {
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

  const handleOpenModal = (id: string) => {
    setShowModal(true);
    setSelectedItem(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleReturnShoppingList = async (id: string) => {
    const item = await returnToShopList(id);

    setShoppingItems([...shoppingItems, item]);
    setBoughtItems(
      boughtItems.filter((boughtItem) => boughtItem.id !== item.id)
    );
  };

  const handlePurchaseItem = async (
    itemId: string,
    brand: string,
    price: number
  ) => {
    const history = await createHistory(itemId, brand, price);
    const item = await moveToBoughtList(itemId);

    setBoughtItems([...boughtItems, item]);
    setShoppingItems(
      shoppingItems.filter((shoppingItem) => shoppingItem.id !== item.id)
    );

    handleCloseModal();
  };

  const handleDeleteItem = async (id: string) => {
    const item = await deleteItem(id);

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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  return (
    <>
      <AddHistoryModal
        isOpen={showModal}
        selectedItem={selectedItem}
        openCloseModal={handleCloseModal}
        purchaseItem={handlePurchaseItem}
      />
      <section className="flex flex-col-reverse justify-center sm:flex-row p-6 items-center gap-8 mb-12">
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
                    <span onClick={() => handleOpenModal(item.id)}>
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
                    <span onClick={() => handleReturnShoppingList(item.id)}>
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
      </section>
    </>
  );
}
