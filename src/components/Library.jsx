import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from './Card';

function Library({ dataCategory, dataMenu }) {
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const changeCategory = (category) => setSelectedCategory(category);

  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  console.log(dataMenu);

  return (
    <div>
      <div className="p-5 bg-gray-50 col-span-9 h-screen overflow-y-auto scroll-none">
        <h1 className="font-bold text-4xl">
          Library
        </h1>
        <div className='my-5'>
          <p>add to category</p>
          <div className='bg-slate-100 flex justify-between'>
            <div className='flex'>
              {dataCategory.map((data, index) => {
                return (
                  <div
                    className="rounded-2xl py-3 px-3 w-24 bg-white border hover:fill-blue-500 hover:bg-[#ffe54f] hover:shadow-lg hover:shadow-red-300 active:bg-yellow-500"
                    key={`tab-${index}`}
                    onClick={() => changeCategory(data.name)}
                  >
                    <div className="bg-white text-center p-2  rounded-2xl border">
                      <FontAwesomeIcon icon={data.icon} className="w-8 h-8 " />
                    </div>
                    <div className="mt-5 text-xs">{data.name}</div>
                  </div>
                )
              })}
            </div>
            <div className='flex justify-center'>
              <button onClick={() => setShowModal(true)} type="button" class=" text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ">+</button>
            </div>
          </div>
        </div>
        <div>
          <div className='my-5'>
            <p>add to produk</p>
            <div className="grid grid-cols-4 gap-4 mx-auto justify-center text-center">

              {dataMenu.map((data, index) => (
                <section
                  key={`tabpanel-${index}`}
                  hidden={selectedCategory !== data.category.name}
                >
                  <Card key={index} data={data} />
                </section>
              ))}
              <button onClick={() => setModal(true)}>
                tambah
              </button>
            </div>

          </div>
        </div>
      </div>
      {modal ? (<>
        <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
          <div class="relative w-full h-full max-w-2xl md:h-auto">
            <div class="relative bg-gray-100 rounded-lg shadow ">
              <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900 ">
                  Terms of Service
                </h3>
                <button onClick={() => setModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-6 space-y-6">
                <form>
                  <div class="relative z-0 w-full mb-6 group">
                    <input type="file" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label  class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gambar</label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name Product</label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input type="number" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                  </div>
                  <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="number" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Stock</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
                        <option >Select Category</option>
                        <option>Food</option>
                        <option>Drink</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                      <textarea class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label  class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                    </div>
                  </div>
                </form>
              </div>
              <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
              </div>
            </div>
          </div>
        </div>
      </>) : (<></>)}
      {showModal ? (<>
        <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
          <div class="relative w-full h-full max-w-2xl md:h-auto">
            <div class="relative bg-gray-100 rounded-lg shadow ">
              <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900 ">
                  Terms of Service
                </h3>
                <button onClick={() => setShowModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-6 space-y-6">
                <form>
                  <div class="relative z-0 w-full mb-6 group">
                    <input type="file" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label  class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gambar</label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                      <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
                        <option >Select Icon</option>
                        <option>Food</option>
                        <option>Drink</option>
                        <option>Other</option>
                      </select>
                    </div>
                  
                </form>
              </div>
              <div class="flex items-center p-6 space-x-2 border-t border-gray-400 rounded-b">
                <button data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
              </div>
            </div>
          </div>
        </div>
      </>) : (<></>)}
    </div>
  )
}

export default Library