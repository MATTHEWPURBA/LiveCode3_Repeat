import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Cards({ dataHeroes, postData, button }) {
  /** button taro diatas sini untuk menerima props yang dilempar dari homepage dan favourites */

  let posisi = button.position
  // ini buat memecah props position 
  return (
    <>
      {/* card */}

      <div className="col-span-4 mb-8 bg-white rounded-lg overflow-hidden shadow-xl ">
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
            {posisi === "homepage" && (
              <Link
                type="button"
                onClick={() => {
                  postData(dataHeroes.id);
                  /* disini tuh maksudnya nambah id */
                }}
                /** disini cuisine nya */
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add To Favourite
              </Link>
            )}

            {posisi === "favourite" ? (
              <Link
                to={"/updateFav"}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Update Hero
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      {/* // card end */}
    </>
  );
}
