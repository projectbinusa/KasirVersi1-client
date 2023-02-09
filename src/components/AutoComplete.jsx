import axios from "axios";
import { useState } from "react";
import { API_CART } from "../utils/baseURL";
import { getAllDataCart } from "../utils/controller";

const AutoComplete = ({ setDataCart }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const addToCart = async (id) => {
    await axios
      .get(
        `${API_CART}/search?product=${id}&user=${localStorage.getItem("id")}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.length === 0) {
          const req = {
            productId: id,
            quantity: 1,
          };
          axios
            .post(`${API_CART}/add`, req, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then(() => {
              getAllDataCart("list", setDataCart);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const req = {
            quantity: res.data[0].quantity + 1,
          };
          axios
            .put(`${API_CART}/update/${res.data[0].id}`, req, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then(() => {
              getAllDataCart("list", setDataCart);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);

    try {
      const response = await fetch(
        `http://localhost:8080/api/product?name=${query}&user=${localStorage.getItem("id")}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (query.length > 1 && response.ok) {
        const data = await response.json();
        setSuggestions(data.data);
        setSuggestionsActive(true);
      } else {
        setSuggestionsActive(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (<>
    <div classNam="absolute w-full">
    <ul className="suggestions w-full bg-white rounded-lg mt-1">
        {suggestions.map((suggestion, index) => {
          return (
            <div
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              <div
                className="flex items-center cursor-pointer hover:bg-yellow-300 rounded-lg"
                onClick={() => addToCart(suggestion.id)}
              >
                <img
                  width={35}
                  height={35}
                  src={suggestion.image}
                  alt={suggestion.name}
                  className="rounded-full h-auto object-cover mr-3"
                />
                <p>{suggestion.name}</p>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
    
      </>
    );
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="p-2 w-full rounded-xl border"
        placeholder="🔍 Cari untuk makanan, dll"
      />
      {suggestionsActive && <Suggestions />}
    </div>
  );
};

export default AutoComplete;
