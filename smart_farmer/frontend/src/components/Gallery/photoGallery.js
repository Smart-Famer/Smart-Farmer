import "bootstrap/dist/css/bootstrap.css";
import PhotoData from "./PhotoData";
import React, { useEffect, useState } from "react";
import DateCard from "./dateCard";
import { usePhotoContext } from "../../hooks/usePhotoContext";
import "./Carousel.css";
import { useFarmContext } from "../../hooks/useFarmContext";
import DateFilter from "../dateFilter/dateFilter";

export default function PhotoGallery() {
  const { farm } = useFarmContext();
  const { photos, dispatchPhotos } = usePhotoContext();
  const [display_cards, setCards] = useState(null);

  useEffect(() => {
    const keys = Object.keys(photos);
    const cards = keys.map((date) => (
      <div className="col">
        <DateCard date={date} />
      </div>
    ));

    setCards(cards);
  }, [photos]);

  return (
    <div>
      <div className="row ms-1 p-3">
        <div className="col-6">
          <DateFilter setCards={setCards} />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-4 m-3">
        {display_cards}
        {display_cards && display_cards.length === 0 && (
          <h4 className="fw-bold text-danger font-monospace">
            No Photos are Taken yet! Try taking some photos and upload them to
            monitor your progress..{" "}
          </h4>
        )}
      </div>
    </div>
  );
}
