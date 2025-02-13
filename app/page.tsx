export default function Home() {
  return (
    <>
      <section className="flex flex-col-reverse justify-center sm:flex-row p-6 items-center gap-8 mb-12">
        <div className="p-6 my-12">
          <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
            Add new item
          </h2>
          <input
            type="text"
            id="item"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="eggs, toilet paper"
            required
          />
        </div>
      </section>
    </>
  );
}
