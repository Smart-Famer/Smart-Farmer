import { createContext, useEffect, useReducer } from "react";
import { useFarmContext } from "../hooks/useFarmContext";

export const PhotoContext = createContext();
export const photoReducer = (state, action) => {
  switch (action.type) {
    case "INITIATE":
      return action.payload;
    case "DELETE-PHOTO":
      return {
        ...state,
        [action.payload.date]: state[action.payload.date].filter(function (
          photo
        ) {
          return photo._id !== action.payload._id;
        }),
      };
    case "DELETE-DATE":
      let newState = {};
      Object.keys(state).forEach((key) => {
        if (key !== action.payload.date) {
          newState[key] = [...state[key]];
        }
      });
      return newState;
    default:
      return state;
  }
};
export const PhotoContextProvider = ({ children }) => {
  const { farm } = useFarmContext();
  const [photos, dispatchPhotos] = useReducer(photoReducer, {});
  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/photos/get-photos/${farm._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        let new_photos = {};

        json.forEach((photo) => {
          let d = new Date(photo.timestamp)
            .toLocaleDateString()
            .replaceAll("/", "-");
          let t = new Date(photo.timestamp).toLocaleTimeString();
          if (d in new_photos) {
            new_photos[d].push({
              src: photo.url,
              camera_angle: photo.metadata.camera_angle,
              time: t,
              _id: photo._id,
            });
          } else {
            new_photos[d] = [
              {
                src: photo.url,
                camera_angle: photo.metadata.camera_angle,
                time: t,
                _id: photo._id,
              },
            ];
          }
        });

        dispatchPhotos({ type: "INITIATE", payload: new_photos });
      }
    };
    fetchPhotos();
  }, []);

  return (
    <PhotoContext.Provider value={{ photos, dispatchPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};
