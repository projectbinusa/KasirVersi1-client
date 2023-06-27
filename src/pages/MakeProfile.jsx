import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_TOKO } from "../utils/baseURL";

const MakeProfile = () => {
  const navigate = useNavigate();
  const [tokoId, setTokoId] = useState(0);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);

  const getToko = async () => {
    await axios
      .get(`${API_TOKO}/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTokoId(res.data.id);
        setName(res.data.name);
        setImage(res.data.image);
        setPhoneNumber(res.data.phoneNumber);
        setAddress(res.data.address);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToko = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", image);
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);

    await axios
      .post(`${API_TOKO}/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate("/home");
        getToko();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getToko();
  }, []);

  return (
    <div className="m-5">
      <div id="makeprofile">
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
            <div className="md:w-1/2 px-8 md:px-16">
              <h2 className="font-bold text-2xl text-[#002D74]">Buat Toko</h2>
              <p className="text-xs mt-4 text-[#002D74]">
                Silahkan isi form berikut untuk membuat toko
              </p>

              <form
                action=""
                className="flex flex-col gap-4"
                onSubmit={addToko}
              >
                <div className="mt-8">
                <label>Foto Toko</label>
                 <input
                  type="file"
                  id="foto"
                  placeholder="Foto Toko"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
                </div>
                <input
                  className="p-2 rounded-xl border  "
                  type="text"
                  id="name"
                  placeholder="Nama Toko"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="p-2 rounded-xl border  "
                  type="text"
                  id="phoneNumber"
                  placeholder="Nomer Telepon"
                  value={phoneNumber || ""}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <input
                  className="p-2 rounded-xl border w-full "
                  type="text"
                  id="password"
                  placeholder="Alamat "
                  value={address || ""}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                >
                  Buat Toko
                </button>
              </form>
            </div>

            <div className="md:block hidden w-1/2">
              <img
                className="rounded-2xl"
                src="https://static.vecteezy.com/system/resources/previews/008/545/339/original/indonesian-famous-food-bakso-illustration-vector.jpg"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MakeProfile;
