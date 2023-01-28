import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import { Chart as ChartJS } from "chart.js/auto"; 
import 'aos/dist/aos.css'; // You can also use <link> for styles

const iconList = Object.keys(Icons)
  .filter((key) => key !== "far" && key !== "prefix").map((icon) => Icons[icon]);

library.add(...iconList);

AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App iconList={iconList}/>
    </BrowserRouter>
  </React.StrictMode>,
)
