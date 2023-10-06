import React, { useEffect, useState, useRef } from "react";
import "../../styles/header.css";
import Logo from "../../assets/logo.png";
import Icon from "../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../../utils/searchSlice";
import { setUser, logout } from "../../utils/userSlice";
import { BASE_URL, PROJECT_ID } from "../../utils/constant";

function Head() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const searchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const userAuthentication = useSelector((store) => store.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    //make an api call after every key press
    //but if the difference between 2 API calls is < 200ms
    //decline the API call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (window.sessionStorage.getItem("jwt")) {
      dispatch(setUser("email"));
    }
  }, []);

  //press key -> render the component -> useEffect() -> start a timer-
  //make an api call after 200ms
  //this search is using live api, debouncing, caching
  const getSearchSuggestions = async () => {
    if (!searchQuery.trim()) return;
    const data = await fetch(
      `${BASE_URL}/song?search={"title":"${searchQuery}"}&limit=10`,
      {
        headers: {
          projectId: PROJECT_ID,
        },
      }
    );
    const json = await data.json();
    console.log(json?.data);
    setSuggestions(json?.data);
    dispatch(
      cacheResults({
        [searchQuery]: json?.data,
      })
    );
  };

  useEffect(() => {
    function hideModal(event) {
      console.log(event);
      const clickedElement = event.target;
      const searchSuggestionElement = ref.current;
      console.log(searchSuggestionElement);

      if (
        searchSuggestionElement?.contains(clickedElement) ||
        clickedElement === searchRef.current
      ) {
        return;
      } else {
        setShowSuggestions(false);
      }
    }

    console.log(ref.current, "ref Current");

    document.addEventListener("click", hideModal);

    //Cleanup
    return () => {
      document.removeEventListener("click", hideModal);
    };
  }, []);

  useEffect(() => {
    // console.log(userAuthentication);
    if (userAuthentication.isAuthenticated) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userAuthentication.isAuthenticated]);

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleCreateAccountClick = () => {
    navigate("/signup");
  };

  const handleLogOut = async () => {
    try {
      window.sessionStorage.removeItem("jwt");
      dispatch(logout());
      navigate("/signin");
    } catch (err) {
      console.log(err.message);
    }
    setIsAuthenticated(false);
  };

  const handleUpdatePass = async () => {
    try {
      navigate("/updatepassword");
    } catch (err) {
      console.log(err.message);
    }
    setIsAuthenticated(false);
  };

  const handleSearchResultClick = (title) => {
    console.log("handlesearch clicked", title);
    navigate(`/search?q=${title}`);
    window.location.reload();
  };

  return (
    <header className="header-container">
      <div className="header">
        <div className="header-1">
          <img className="header-icon" alt="header-icon" src={Icon} />
          <img src={Logo} alt="header-logo" />
        </div>
        <div className="header-2">
          <Link to={"/home"}>Home</Link>
        </div>
        <div className="header-2">
          <Link to={"/feed"}>Feed</Link>
        </div>
        <div className="header-2">
          <Link to={"/library"}>Library</Link>
        </div>
        <div className="header-3">
          <div className="header-search-container">
            <input
              className="header-search"
              type="search"
              alt="search-songs"
              placeholder="Search for artists, bands, tracks, podcasts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              ref={searchRef}
            />
            {showSuggestions && (
              <div className="header-search-suggestions" ref={ref}>
                <ul>
                  {suggestions?.map(({ title, _id }) => (
                    <li
                      key={_id}
                      onClick={() => {
                        console.log("clicked");
                        handleSearchResultClick(title);
                        setShowSuggestions(false);
                      }}
                    >
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {isAuthenticated ? (
          <>
            <div className="header-signin">
              <button onClick={handleLogOut}>Log out</button>
            </div>
            <div className="header-signin">
              <button onClick={handleUpdatePass}>Update Password</button>
            </div>
            <div className="header-profile">
              <Link to={"/profile"}>
                <img
                  className="profile-picture"
                  src={
                    "https://i0.wp.com/toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
                  }
                  alt="Profile"
                />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="header-signin">
              <button onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="header-createAcc">
              <button onClick={handleCreateAccountClick}>Create Account</button>
            </div>
          </>
        )}

        <div className="header-upload">
          <Link to={"/upload"}>Upload</Link>
        </div>
      </div>
    </header>
  );
}

export default Head;
