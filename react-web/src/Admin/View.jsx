import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/firebase";
import  "../page/Home/HomeList.css"
const View = () => {
  const [data,setData] = useState([]);
  const [isLoading,setIsLoading] = useState(true)
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
                  <img className="conten_img" src={Data.image} alt="image" />
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


export default View;
