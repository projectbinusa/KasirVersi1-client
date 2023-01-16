import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_AUTH } from '../utils/baseURL';

function IsiBils() {

    
    return (
        <div className='m-5'>
            <h1 className="font-bold text-4xl">History Checkout</h1>
            <div className=' p-5 bg-gray-50 col-span-9 h-screen overflow-y-auto scroll-none"'>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200 ">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b ">
                               
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    Apple MacBook Pro 17"
                                </th>
                                <td class="px-6 py-4">
                                    Sliver
                                </td>
                                <td class="px-6 py-4">
                                    Laptop
                                </td>
                                <td class="px-6 py-4">
                                    $2999
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}

export default IsiBils