import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../components/Cards";
import { localRequest } from "../../utils/axios";

export default function Homepage() {
  const [dataHeroes, setDataHeroes] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await localRequest({
        method: "get",
        url: "/heroes",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setDataHeroes(data);
    } catch (error) {
      console.log(error);
      let { message } = error.response.data;
      showToast(message);
    }
  };

  console.log(dataHeroes, "ini data heroes");

  useEffect(() => {
    fetchData();
  }, []);

  let { id } = useParams;
  const navigate = useNavigate();

  const postData = async (id) => {
    try {
      await localRequest({
        method: "post",
        url: `/favourites/${id}`,
        quantity: 1,
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      navigate("/myclubs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* hero */}
      <div className="my-24 w-full">
        <div className="container mx-auto ">
          <div className=" max-w3xl mx-auto">
            <h1 className="font-extrabold text-4xl text-slate-800 text-center capitalize mb-6">welcome to the club</h1>
            <p className="text-slate-500 capitalize font-normal text-center leading-relaxed">You can join any club to elevate your hobby</p>
          </div>
        </div>
      </div>
      {/* hero end */}
      {/* Content */}
      <div className="py-4 bg-slate-100 mx-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4 py-6 mx-6">
            {dataHeroes.map((dataHeroes) => {
              return <Cards postData={postData} dataHeroes={dataHeroes} key={dataHeroes.id} />;
            })}
          </div>
        </div>
      </div>
      {/* Content end*/}
    </>
  );
}
