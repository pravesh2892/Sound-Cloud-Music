import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import "react-multi-carousel/lib/styles.css";
import PlayIcon from "../assets/play.svg";
import PauseIcon from "../assets/pause.svg";
import { fetchDataFromApi } from "../api";

const Search = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const queryString = window.location.search;

  //Extract the 'q' query parameter
  const urlParams = new URLSearchParams(queryString);
  const searchQuery = urlParams.get("q");
  console.log(searchQuery);

  const [result, setResult] = useState();
  const [state, setState] = useState({
    isPlaying: false,
    hoverId: null,
  });

  const handleMouseHover = (id, flag) => {
    setState((prevState) => ({
      ...prevState,
      hoverId: flag ? id : null,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      fetchDataFromApi(`song?search={"title":"${searchQuery}"}`).then((res) => {
        console.log(res);
        setResult(res?.data);
      });
    }, 200);
  }, []);

  const handleTogglePlayPause = (event, sound) => {
    //if isLoggedin state is true then play else navigate to signin
    event.stopPropagation();
    if (window.sessionStorage.getItem("jwt")) {
      setState((prevState) => ({
        ...prevState,
        soundId: sound._id,
        isPlaying:
          prevState.soundId !== sound._id ? true : !prevState.isPlaying,
        sound: sound,
      }));
    } else {
      alert("You need to login first!");
      navigate("/signin");
    }
  };

  return (
    <div>
      {result?.map((sound, idx) => (
        <div
          className="soundCard"
          // onClick={(e) => showAlbum(sound)}
          onMouseEnter={() => handleMouseHover(idx, true)}
          onMouseLeave={() => handleMouseHover(idx, false)}
        >
          <img src={sound.thumbnail} alt={sound.title} />
          <div>{sound.title}</div>
          <div className="soundCard-mood">{sound.mood}</div>
          {state.hoverId === idx && (
            <div
              onClick={(event) => handleTogglePlayPause(event, sound)}
              className="playIcon"
            >
              <img
                style={{ width: "30px", height: "30px" }}
                alt="PlayPauseIcon"
                src={
                  state.isPlaying && state.soundId === sound._id
                    ? PauseIcon
                    : PlayIcon
                }
              />
            </div>
          )}
        </div>
      ))}

      {state.isPlaying && state.sound && (
        <div className="audioBar">
          <div className="audio">
            <audio key={state.sound._id} autoPlay controls ref={audioRef}>
              <source src={state.sound.audio_url} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
