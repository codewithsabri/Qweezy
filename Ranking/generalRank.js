import React, { useEffect, useState } from "react";
import "./generalRank.css";
import ScrollTop from '../Layout/scrollTop';


import axios from "axios";

function GeneralRank() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      // .get("https://tranquil-citadel-82505.herokuapp.com/api/hadith")
      .get(`${process.env.REACT_APP_API}/classement`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <>
      <div className="rank-wrapper">
        <div className="table-container">
          <h3>Classement général</h3>
    
            <table className="table table-striped ">
              <thead className="thead no-gutters">
                <tr>
                  <th>Joueur</th>

                  <th>Rang</th>
                  <th>Score</th>
                  {/* <th>Catégorie</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      {item.user.name === undefined ? "invité" : item.user.name}
                    </td>
                    <td>{index + 1}</td>

                    <td>{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ScrollTop/>
     
      </div>
    </>
  );
}

export default GeneralRank;
