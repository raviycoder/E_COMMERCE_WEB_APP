/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch } from 'react-redux';

const PriceFilter = ({range, setRange, maxPrice}) => {  

  const maxPriceCondition = maxPrice >=2000 ? maxPrice : 2060;

  const handleRangeChange = (newRange) => {
    setRange(newRange);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 space-y-6">
        <label htmlFor="" className=' text-center font-semibold'>Product Price</label>
        <div className='flex flex-row text-center '><div className="mr-4">
        <label>Min:</label>
        <input
          type="number"
          name="price"
          className='w-20 text-center appearance-none rounded-xl'
          value={range[0]}
          onChange={(e) =>{handleRangeChange([+e.target.value, range[1]])}}
        />
      </div>
      <div className="ml-4">
        <label>Max:</label>
        <input
          type="number"
          name='price'
          className='w-20 text-center appearance-none rounded-xl'
          value={range[1]}
          onChange={(e) => {handleRangeChange([range[0], +e.target.value])}}
        />
      </div>
      </div>
      <Slider
        min={0}
        step={2}
        max={maxPriceCondition}
        value={range}
        onChange={handleRangeChange}
        range
      />
    </div>
  );
};

export default PriceFilter