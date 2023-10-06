import React, { useEffect, useState, useRef } from "react";
import "../../styles/home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PlayIcon from "../../assets/play.svg";
import PauseIcon from "../../assets/pause.svg";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/home.css";
import {
  BASE_URL,
  responsive,
  sortOptions,
  page,
  limit,
  PROJECT_ID,
} from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong } from "../../utils/playerSlice";

const Home = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    "Trending songs": [],
    happy: [],
    sad: [],
    excited: [],
    romantic: [],
    isPlaying: false,
    hoverId: null,
  });

  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const fetcher = (filter, value, sort, page, limit) => {
    const queryParams = {
      [filter]: value,
      sort: JSON.stringify(sort),
      page,
      limit,
    };

    const queryString = Object.keys(queryParams)
      .map((key) => key + "=" + queryParams[key])
      .join("&");

    fetch(`${BASE_URL}/song?${queryString}`, {
      headers: {
        projectId: PROJECT_ID,
      },
    })
      .then((data) => data.json())
      .then((json) => {
        setState((prevState) => ({ ...prevState, [value]: json.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetcher("featured", "Trending songs", sortOptions, page, limit);
    fetcher("mood", "happy", sortOptions, page, limit);
    fetcher("mood", "romantic", sortOptions, page, limit);
    fetcher("mood", "sad", sortOptions, page, limit);
    fetcher("mood", "excited", sortOptions, page, limit);
  }, []);

  useEffect(() => {
    if (state.sound && state.soundId)
      dispatch(
        setActiveSong({
          soundId: state.sound._id,
          isPlaying: state.isPlaying,
          sound: state.sound,
        })
      );
  }, [state.sound, state.soundId, state.isPlaying]);

  const handleMouseHover = (category, id, flag) => {
    setState((prevState) => ({
      ...prevState,
      hoverId: flag ? id : null,
      hoveredCategory: category,
    }));
  };

  const handleTogglePlayPause = (event, sound) => {
    //if isLoggedin state is true then play else navigate to signin
    event.stopPropagation();
    if (window.sessionStorage.getItem("jwt")) {
      setState((prevState) => ({
        ...prevState,
        soundId: sound._id,
        isPlaying: state.soundId !== sound._id ? true : !state.isPlaying,
        sound: sound,
      }));
    } else {
      alert("You need to login first!");
      navigate("/signin");
    }
  };

  const showAlbum = (sound) => {
    if (window.sessionStorage.getItem("jwt")) {
      navigate("/album?id=" + sound.album);
    } else {
      alert("You need to login first!");
      navigate("/signin");
    }
  };

  useEffect(() => {
    // Handle the selected suggestion when the location changes
    const searchParams = new URLSearchParams(location.search);
    const selectedQuery = searchParams.get("suggestion");

    if (selectedQuery) {
      setSelectedSuggestion(selectedQuery);
    }
  }, [location]);

  const filteredContent = state[selectedSuggestion] || [];

  return (
    <div className="home">
      {/* Conditionally render filtered content or normal cards */}
      {filteredContent.length > 0 ? (
        filteredContent.map((sound, idx) => (
          <div
            className="soundCard"
            key={sound._id}
            onClick={(e) => showAlbum(sound)}
            onMouseEnter={() => handleMouseHover(selectedSuggestion, idx, true)}
            onMouseLeave={() =>
              handleMouseHover(selectedSuggestion, idx, false)
            }
          >
            <img src={sound.thumbnail} alt={sound.title} />
            <div>{sound.title}</div>
            <div className="soundCard-mood">{sound.mood}</div>
            {state.hoverId === idx &&
              state.hoveredCategory === selectedSuggestion && (
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
        ))
      ) : (
        <>
          <div className="h1">Discover Tracks and Playlists</div>
          <div className="h3">Top Charts</div>
          <div className="h5">
            The most played tracks on SoundCloud this week
          </div>
          <Carousel responsive={responsive}>
            {state["Trending songs"]?.map((sound, idx) => {
              return (
                <div
                  className="soundCard"
                  onClick={(e) => showAlbum(sound)}
                  onMouseEnter={() =>
                    handleMouseHover("Trending songs", idx, true)
                  }
                  onMouseLeave={() =>
                    handleMouseHover("Trending songs", idx, false)
                  }
                >
                  <img src={sound.thumbnail} alt={sound.title} />
                  <div>{sound.title}</div>
                  <div className="soundCard-mood">{sound.mood}</div>
                  {state.hoverId === idx &&
                    state.hoveredCategory === "Trending songs" && (
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
              );
            })}
          </Carousel>
          <div className="h3">Mood: Happy songs</div>
          <Carousel responsive={responsive}>
            {state["happy"]?.map((sound, idx) => {
              return (
                <div
                  className="soundCard"
                  onClick={(e) => showAlbum(sound)}
                  onMouseEnter={() => handleMouseHover("happy", idx, true)}
                  onMouseLeave={() => handleMouseHover("happy", idx, false)}
                >
                  <img src={sound.thumbnail} alt={sound.title} />
                  <div>{sound.title}</div>
                  <div className="soundCard-mood">{sound.mood}</div>
                  {state.hoverId === idx &&
                    state.hoveredCategory === "happy" && (
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
              );
            })}
          </Carousel>
          <div className="h3">Mood: Romantic songs</div>
          <Carousel responsive={responsive}>
            {state["romantic"]?.map((sound, idx) => {
              return (
                <div
                  className="soundCard"
                  onClick={(e) => showAlbum(sound)}
                  onMouseEnter={() => handleMouseHover("romantic", idx, true)}
                  onMouseLeave={() => handleMouseHover("romantic", idx, false)}
                >
                  <img src={sound.thumbnail} alt={sound.title} />
                  <div>{sound.title}</div>
                  <div className="soundCard-mood">{sound.mood}</div>
                  {state.hoverId === idx &&
                    state.hoveredCategory === "romantic" && (
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
              );
            })}
          </Carousel>
          <div className="h3">Mood: Excited songs</div>
          <Carousel responsive={responsive}>
            {state["excited"]?.map((sound, idx) => {
              return (
                <div
                  className="soundCard"
                  onClick={(e) => showAlbum(sound)}
                  onMouseEnter={() => handleMouseHover("excited", idx, true)}
                  onMouseLeave={() => handleMouseHover("excited", idx, false)}
                >
                  <img src={sound.thumbnail} alt={sound.title} />
                  <div>{sound.title}</div>
                  <div className="soundCard-mood">{sound.mood}</div>
                  {state.hoverId === idx &&
                    state.hoveredCategory === "excited" && (
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
              );
            })}
          </Carousel>
          <div className="h3">Mood: Sad songs</div>
          <Carousel responsive={responsive}>
            {state["sad"]?.map((sound, idx) => {
              return (
                <div
                  className="soundCard"
                  onClick={(e) => showAlbum(sound)}
                  onMouseEnter={() => handleMouseHover("sad", idx, true)}
                  onMouseLeave={() => handleMouseHover("sad", idx, false)}
                >
                  <img src={sound.thumbnail} alt={sound.title} />
                  <div>{sound.title}</div>
                  <div className="soundCard-mood">{sound.mood}</div>
                  {state.hoverId === idx && state.hoveredCategory === "sad" && (
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
              );
            })}
          </Carousel>
        </>
      )}
    </div>
  );
};

export default Home;
