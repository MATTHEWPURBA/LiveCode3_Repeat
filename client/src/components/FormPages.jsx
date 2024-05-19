export default function FormPages({ errorHandler, handleChangeInput, name, description, price, imgUrl, CategoryId }) {
    return (
      <>
        <section className="mb-12 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-12">
          <h2 className="text-3xl mb-12 font-semibold text-gray-700 capitalize dark:text-white">Upload Cuisine</h2>
          <form id="add-form" onSubmit={errorHandler}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div className="text-start">
                <label className=" text-gray-700 dark:text-gray-200" htmlFor="username">
                  Cuisine Name
                </label>
                <input
                  id="name"
                  type="text"
                  onChange={handleChangeInput}
                  name="name"
                  defaultValue={""} 
                  placeholder={name}//untuk fitur update biar ada default value nya
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div className="text-start">
                <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">
                  Description
                </label>
                <input
                  id="emailAddress"
                  type="description"
                  onChange={handleChangeInput}
                  name="description"
                  defaultValue={""}
                  placeholder={description}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div className="text-start">
                <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">
                  Upload Image
                </label>
                <input
                  id="image"
                  onChange={handleChangeInput}
                  name="imgUrl"
                  type="text"
                  defaultValue={""}
                  placeholder={imgUrl}
                  // placeholder={imgUrl}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div className="text-start">
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
                  Price
                </label>
                <input
                  id="price"
                  onChange={handleChangeInput}
                  type="number"
                  name="price"
                  defaultValue={""}
                  placeholder={price}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div className="text-start">
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
                  Category Id
                </label>
                <input
                  id="price"
                  onChange={handleChangeInput}
                  type="number"
                  name="CategoryId"
                  defaultValue={""}
                  placeholder={CategoryId}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Save
              </button>
            </div>
          </form>
        </section>
      </>
    );
  }
  