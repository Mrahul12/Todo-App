import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const dBouncing=()=>{
   const [data, setData] = useState();
    // console.log(e.target.value);
    useEffect(() => {
      if (data === "") return;
      let dBouncing = setTimeout(() => {
        console.log('Sending request');
      }, 1000);
      return () => {
        clearTimeout(dBouncing);
      };
    }, [data]);
  // console.log(data);
 return(
  <>
  <form action="">
       <input
            type="text"
            placeholder="add or text data"
            className="border-2 px-2 py-2  text-xl rounded-[5px] border-slate-800 text-slate-700 outline-none flex-grow"
            onChange={(e) => setData(e.target.value)}
          />
  </form>
  </>
 )
}
export default dBouncing;