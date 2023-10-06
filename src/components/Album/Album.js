import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import ReactAudioPlayer from "react-audio-player";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as brokenHeart } from "@fortawesome/free-regular-svg-icons";
import ListCard from "../ReusableComponent/ListCard";
import { BASE_URL, PROJECT_ID, limit } from "../../utils/constant";
import './Album.css';

function Album() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [liked, setLiked] = useState([]);
  const [page, setPage] = useState(1);
  const [songsPerPage, setSongsPerPage] = useState([]);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    if (window.sessionStorage.getItem("jwt")) {
      if (params.get("id")) {
        fetch(
          `${BASE_URL}/album/${params.get("id")}?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              projectId: PROJECT_ID,
            },
          }
        )
          .then((data) => data.json())
          .then((json) => {
            console.log(json);
            setData(json.data);

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            setSongsPerPage(json?.data?.songs?.slice(startIndex, endIndex));
          });
      }
    } else {
      alert("You need to login first!");
      navigate("/signin");
    }
  }, [navigate, location.search, page]);

  const totalPages = Math.ceil(data?.songs?.length / limit);
  console.log(totalPages);
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const playNextTrack = () => {
    if (currentTrackIndex < songsPerPage.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  };

  const toggleLike = (songId) => {
    console.log(songId);
    const action = favorites.includes(songId) ? "remove" : "add";
    fetch(`${BASE_URL}/favorites/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
        projectID: PROJECT_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        songId: songId,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          // Update favorites state
          if (action === "add") {
            setFavorites([...favorites, songId]);
            console.log("In If", favorites, songId);
          } else {
            setFavorites(favorites.filter((id) => id !== songId));
            console.log("In else", favorites, songId);
          }
        }
      });
  };

  useEffect(() => {
    if (data?.songs && data?.songs?.length > 0) {
      // Check if the current song is in favorites
      const currentSongId = data.songs[currentTrackIndex]._id;
      if (currentSongId) {
        setLiked([currentSongId]);
      }
    }
  }, [currentTrackIndex, data?.songs, favorites]);
  // console.log(favorites);

  return (
    <>
      <div className="audio-player p-4 bg-gray-200 rounded-lg shadow-lg">
        {data?.songs && data?.songs?.length > 0 && (
          <ReactAudioPlayer
            src={data?.songs[currentTrackIndex]?.audio_url}
            autoPlay
            controls
            onEnded={playNextTrack}
          />
        )}

        <div className="track-details d-flex align-items-center justify-content-between">
          {data?.songs && data?.songs?.length > 0 && songsPerPage > 0 && (
            <>
              <div className="d-flex align-items-center">
                <img
                  src={songsPerPage[currentTrackIndex].thumbnail}
                  alt={songsPerPage[currentTrackIndex].title}
                  style={{ marginRight: "10px", width: "50px", height: "50px" }}
                />
                <div className="song-title">
                  {songsPerPage[currentTrackIndex].title}
                </div>
                <div className="artist-name">{data.artists[0].name} </div>
              </div>
              <Button
                variant="outline-primary"
                className="like-button"
                onClick={() => toggleLike(data.songs[currentTrackIndex]._id)}
              >
                <FontAwesomeIcon
                  icon={
                    favorites?.includes(data.songs[currentTrackIndex]._id)
                      ? solidHeart
                      : brokenHeart
                  }
                  className="heart-icon"
                />
                {favorites?.includes(data.songs[currentTrackIndex]._id)
                  ? "Liked"
                  : "Like"}
              </Button>
            </>
          )}
        </div>
      </div>

      <ListGroup>
        {data?.songs &&
          songsPerPage.map((song, index) => (
            <ListCard
              key={song._id}
              song={song}
              favorites={favorites}
              index={index}
              toggleLike={toggleLike}
            />
          ))}
      </ListGroup>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <Button
            variant="outline-primary"
            className="previous-button"
            disabled={page === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
          <span className="page-number">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline-primary"
            className="next-button"
            disabled={page === totalPages}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}

export default Album;
