import {
  PlusCircleIcon,
  ListBulletIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/16/solid";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <label
            htmlFor="item"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add Item to List
          </label>
          <input
            type="text"
            id="item"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="eggs, toilet paper"
            required
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          <ListBulletIcon className="size-10 text-white-500" />
        </a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          <PlusCircleIcon className="size-10 text-white-500" />
        </a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          <ChartBarSquareIcon className="size-10 text-white-500" />
        </a>
      </footer>
    </>
  );
}
