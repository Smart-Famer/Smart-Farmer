import React, { useEffect, useState } from "react";
import { useFarmContext } from "../../hooks/useFarmContext";
import PhotoContainer from "./PhotoContainer";

export default function RecentPhotos() {
  const [recentPhotos, setRecentPhotos] = useState([]);
  const [error, setError] = useState(null);
  const { farm } = useFarmContext();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/photos/get-photos/${farm._id}?limit=2`
      );

      const json = await response.json();

      if (response.ok) {
        setRecentPhotos(json.map((photo) => <PhotoContainer {...photo} />));
      } else {
        setError(json.error);
      }
    })();
  }, []);

  return (
    <div className="container ">
      <div className="row mb-3">
        {recentPhotos.length === 0 ? (
          <div className="row text-center">
            <h3 className="text-danger">No photos are taken yet!</h3>
          </div>
        ) : (
          <div className="row justify-content-center">{recentPhotos}</div>
        )}
      </div>
    </div>
  );
}
