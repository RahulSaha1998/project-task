
// import React, { useState, useEffect } from 'react';
// import LineChart from './LineChart';
// import './App.css';

// function chart1() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     regenerateData();
//   }, []);

//   function regenerateData() {
//     const chartData = [];
//     for (let i = 0; i < 20; i++) {
//       const value = Math.floor(Math.random() * i + 3);
//       chartData.push({
//         label: i,
//         value,
//         tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`
//       });
//     }
//     setData(chartData)
//   }

//   return (
//     <div className="App">
//       <button onClick={regenerateData}>Change Data</button>
//       <LineChart data={data} width={400} height={300} />
//     </div>
//   );
// }

// export default chart1;

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const chart1 = () => {

    const [data] = useState([25, 50, 35, 15, 94, 10]);
    const svgRef = useRef()

    useEffect(()=>{

        const w = 400;
        const h = 100;
        const svg = d3.select(svgRef.current)
        .attr('width', w)
        .attr('height', h)

    },[data])


    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default chart1;