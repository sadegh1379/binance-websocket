"use client"
import CurrencyContainer from '@/components/CurrencyContainer';
import { useWebSocket } from '@/context/web-socket';

export default function Home(props) {
  const { socketData, loading } = useWebSocket();

  return (
   <main>
      <div className='text-center mt-0 md:mt-10 '>
        <h1 className='font-extrabold'>Binance WebSocket with Next.js</h1>
        <CurrencyContainer currencies={socketData} loading={loading} />
      </div>
   </main>
  );
}
