import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../components/Cards";
import { localRequest } from "../../utils/axios";

export default function Favourite({position}) {
    /** ini dibuat position untuk menerima props dari app jsx */
  const [dataFavHero, setDataFavHero] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await localRequest({
        method: "get",
        url: "/favourites",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setDataFavHero(data);
    } catch (error) {
      console.log(error);
      let { message } = error.response.data;
      showToast(message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      {/* Content */}
      <div className="py-4 bg-slate-100 mx-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4 py-6 mx-6">
            {dataFavHero.map((dataFavHero) => {
              return <Cards dataFavHero={dataFavHero} key={dataFavHero.id} button = {position} />;
            })}
          </div>
        </div>
      </div>
      {/* Content end*/}
    </>
  );
}
