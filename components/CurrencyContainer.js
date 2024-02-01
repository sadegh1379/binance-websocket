import CurrencyCard from "./CurrencyCard";

function CurrencyContainer({ currencies, loading }) {
    console.log('container:', currencies)
    return (
        <div className="max-w-md p-1 md:p-0 mt-0 md:mt-10 flex flex-col mx-auto">
        {loading && <h1>Loading...</h1>}
        {currencies.length > 0 && currencies.map((currency, index) => (
            <CurrencyCard
                key={index}
                name={currency.s}
                lastPrice={currency.c}
                PriceChangePercent={currency.p}
            />
        ))}
      </div>
    );
  }
  
  export default CurrencyContainer;
  