import { Link } from "react-router-dom";

export default function Cards({ dataHeroes, postData }) {
  return (
    <>
      {/* card */}

      <div className="col-span-4 mb-8 bg-white rounded-sm overflow-hidden shadow-xl">
        <div className="w-full h-98 bg-red-300 mb-3">
          <Link to={`/clubs/${dataHeroes.id}`}>
            <img src={dataHeroes.imageUrl} className="w-full h-full bg-cover mb-6" alt="" />
          </Link>
        </div>
        <div className="px-4 pb-6">
          <div className="mb-7">
            <h1 className="font-bold text-xl text-slate-800 mb-2">{dataHeroes.name}</h1>
            <h1 className="font-regular text-lg text-slate-800 mb-2">{dataHeroes.type}</h1>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="card-actions"></div>
            <Link
              type="button"
              onClick={() => {
                postData(dataHeroes.id);
                /* disini tuh maksudnya nambah id */
              }}
              /** disini cuisine nya */
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Join
            </Link>
          </div>
        </div>
      </div>
      {/* // card end */}
    </>
  );
}
