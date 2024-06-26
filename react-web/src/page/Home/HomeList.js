// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./HomeList.css";
// import axios from "axios";

// const HomeList = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:3001/all_data/all");
//         setData(data);
//         console.log(data)
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const goBack = () => {
//     window.history.back(); // Navigate back using window.history
//   };
//   const { id } = useParams();
//   const Data = data.find((e) => e.id == id);

//   if (isLoading) {
//     return <h1>Loading...</h1>;
//   } else {
//     return (
//       <article className="card-container">
//         <div className="conten">
//           <img className="conten_img" src={Data.image_list} alt="" />
//         </div>
//         <div className="conten">
//           <h1 className="conten_name">{Data.name_list}</h1>
//           <p>{Data.desc_list}</p>
//           <p>{Data.descs_list}</p>
//         </div>
//         <button className="backBtn" onClick={goBack}>
//           Back
//         </button>
//       </article>
//     );
//   }
// };

// export default HomeList;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
// import "../../Home/HomeList.css";
import "../Home/HomeList.css"

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const HomeList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // fetch All data from Data collection
  useEffect(() => {
    const dataCollectionRef = collection(db, "data");
    const unsubscribe = onSnapshot(dataCollectionRef, (snapShot) => {
      setData(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    });  
    return () => unsubscribe();
  }, []);

  const goBack = () => {
    window.history.back(); 
  };
  const { id } = useParams();
  return (
    <div> 
      {data
        .filter((e) => e.id == id)
        .map(({ Data, id }) => {
          if (isLoading) {
            return <h1>Loading...</h1>;
          } else {
            return (
              <article className="card-container" key={id}>
                <div className="conten">
                  <img className="conten_img" src={Data.image} alt="" />
                </div>
                <div className="conten">
                  <h1 className="conten_name">{Data.name}</h1>
                  <p>{Data.describe}</p>
                  <p>{Data.description}</p>
                </div>
                <button className="backBtn" onClick={goBack}>
                  Back
                </button>
              </article>
            );
          }
        })}
    </div>
  );
};

export default HomeList;
