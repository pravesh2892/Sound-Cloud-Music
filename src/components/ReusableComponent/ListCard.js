import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as brokenHeart } from "@fortawesome/free-regular-svg-icons";

const ListCard = ({song, favorites, toggleLike, index}) => {

  return (
    <ListGroup.Item
      key={index}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="d-flex align-items-center">
        <img
          src={song.thumbnail}
          alt={song.title}
          style={{ marginRight: "10px", width: "50px", height: "50px" }}
        />
        <div className="song-number">{index + 1}</div>
        <div className="song-title" style={{ marginLeft: "10px" }}>
          {song.title}
        </div>
      </div>
      <Button
        variant="outline-primary"
        className="like-button"
        onClick={() => toggleLike(song._id)}
      >
        <FontAwesomeIcon
          icon={favorites?.includes(song._id) ? solidHeart : brokenHeart}
          className="heart-icon"
        />
        {favorites?.includes(song._id) ? "Liked" : "Like"}
      </Button>
    </ListGroup.Item>
  );
};

export default ListCard;
