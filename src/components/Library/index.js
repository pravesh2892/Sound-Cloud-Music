import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ListCard from "../ReusableComponent/ListCard";
import { BASE_URL, PROJECT_ID } from "../../utils/constant";

function Library() {
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch liked albums here using an API call and setLikedAlbums with the response data.
    fetchLikedAlbums()
      .then((data) => {
        // console.log(data);
        setLikedAlbums(data.data.songs);
      })
      .catch((error) => console.error("Error fetching liked albums:", error));
  }, []);

  // Function to fetch liked albums from the API
  const fetchLikedAlbums = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/favorites/like`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
            projectId: PROJECT_ID,
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to fetch liked albums: ${response.statusText}`);
      }

      const data = await response.json();
      let array = [];
      data.data.songs.forEach((song) => {
        array.push(song._id);
      });
      setFavorites(array);
      // console.log(array);
      // console.log("API Response Data:", data);
      return data;
    } catch (error) {
      // console.error("Error fetching liked albums:", error);
      throw error;
    }
  };

  const toggleLike = (songId) => {
    const action = favorites.includes(songId) ? "remove" : "add";
    fetch(`https://academics.newtonschool.co/api/v1/music/favorites/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
        projectID: "f104bi07c490",
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
          } else {
            setFavorites(favorites.filter((id) => id !== songId));
          }
        }
      });
  };

  return (
    <div>
      <h2>Liked Albums</h2>
      <ListGroup>
        {likedAlbums.map((song, index) => (
          <ListCard
            key={song._id}
            song={song}
            favorites={favorites}
            index={index}
            toggleLike={toggleLike}
          />
        ))}
      </ListGroup>
    </div>
  );
}

export default Library;
