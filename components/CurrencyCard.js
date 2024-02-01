import { useEffect, useRef, useState } from "react";

function CurrencyCard({ name, lastPrice, priceChangePercent }) {
    const [prevPrice, setPrevPrice] = useState(lastPrice);
    const [priceColor, setPriceColor] = useState('white');
    const [prevPercents, setPrevPercents] = useState(priceChangePercent);
    const [percentsColor, setPercentsColor] = useState('white');

    useEffect(() => {
        
        // price color handler
        if (lastPrice > prevPrice) {
            setPriceColor('green');
        } else if (lastPrice < prevPrice) {
            setPriceColor('red')
        } else {
            setPriceColor('white');
        }

        // percent color handler
        if (priceChangePercent > prevPercents) {
            setPercentsColor('green');
        } else if (priceChangePercent < prevPercents) {
            setPercentsColor('red')
        } else {
            setPercentsColor('white');
        }
      

        setPrevPercents(priceChangePercent);
        setPrevPrice(lastPrice);
    }, [lastPrice, priceChangePercent])

   
    
  return (
      <div className="bg-[#212630] hover:opacity-90 text-white px-4 p-3  cursor-pointer ">
          <div className="flex justify-between items-center">
              <span>{name}</span>
              <span className="font-bold" style={{ color: priceColor }}>{lastPrice}</span>
          </div>
          <div className="flex justify-between items-center">
              <span className="opacity-50 text-xs">perpetual</span>
              <span className="text-xs" style={{ color: percentsColor }}>{priceChangePercent}%</span>
          </div>
      </div>
  )
}
export default CurrencyCard