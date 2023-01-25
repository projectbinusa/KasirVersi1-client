import axios from 'axios'
import Turnstone from 'turnstone'
import { API_CART } from '../utils/baseURL'

const styles = {
  input: 'p-2 w-96 rounded-xl border',
  listbox: ' w-full bg-white rounded-lg mt-1',
  highlightedItem: 'bg-yellow-300 rounded-lg',
  query: 'text-oldsilver-800',
  typeahead: 'text-slate-500',
  clearButton:
    'absolute inset-y-0 text-lg right-0 w-5 inline-flex items-center justify-center mx-1 my-2 bg-white rounded-xl ',
  noItems: 'cursor-default text-center my-20',
  match: 'font-semibold',
  groupHeading: 'px-5 py-3 text-pink-500',
}
 
const listbox = {
  displayField: 'name',
  data: async (query) => {
    const res = await fetch(
      `http://localhost:8080/api/product?name=${query}`
    )
    const data = await res.json()
    return data.data;
  },
  searchType: 'startsWith',
}
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

const Item = ({ item }) => {
  const avatar = `${item.image}`
  return (
    <div className='flex items-center cursor-pointer px-5 py-4'>
      <img
        width={35}
        height={35}
        src={avatar}
        alt={item.name}
        className='rounded-full object-cover mr-3'
      />
      <p>{item.name}</p>
    </div>
  )
}

const SearchBox = () => {
  return (
    <Turnstone
      id='search'
      name='search'
      autoFocus={true}
      typeahead={true}
      clearButton={true}
      debounceWait={250}
      listboxIsImmutable={true}
      maxItems={6}
      noItemsMessage="We couldn't find any product that matches your search"
      placeholder='🔍 Search for food, coffe, etc...'
      listbox={listbox}
      styles={styles}
      Item={Item}
      // text='Iron M'
    />
  )
}

export default SearchBox
