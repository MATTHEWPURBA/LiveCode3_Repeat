import { Link } from "react-router-dom";

export default function Navbar({}) {
  const handleLogOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="py-2 bg-slate-50">
        <div className="container mx-auto  px-4">
          <div className="grid grid-cols-12 justify-between items-center">
            {/* /* ini adalah navbar bagian kiri */}
            <div className="col-span-3 ">
              <h2 className="text-3xl font-bold capitalize text-start">Hacktive Club</h2>
            </div>
            {/* ini adalah navbar bagian kiri end */}
            {/* ini adalah navbar bagian tengah */}
            <div className="col-span-6 ">
              {/* dikasih bg blue untuk tau pembagian area grid */}
              <ul className="flex flex-wrap space-x-12 justify-center">
                {/* kalau mau tambah menu di navbar tambahin disini */}
                <li>
                  <Link to={"/"} className="text-lg font-normal capitalize text-slate-800">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to={"/myclubs"} className="text-lg font-normal capitalize text-slate-800">
                    My Club
                  </Link>
                </li>
                {/* kalau mau tambah menu di navbar tambahin disini */}
              </ul>
            </div>
            {/* ini adalah navbar bagian tengah end */}
            {/* ini adalah navbar bagian kanan */}
            <div className="col-span-3">
              <div className="flex gap-3 items-center justify-end">
              
                <a href="" onClick={handleLogOut} className="font-semibold capitalize text-sm bg-slate-800 rounded-md text-white py-2 px-6 ">
                  LogOut
                </a>
              </div>
            </div>
            {/* ini adalah navbar bagian kanan end */}
          </div>
        </div>
      </div>
    </>
  );
}
