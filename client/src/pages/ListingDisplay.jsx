import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';

export default function ListingDisplay() {
    SwiperCore.use(Navigation);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          return;
        }
        setListing(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListDetails();
  }, []);

  return <main>
    {error && <p className="text-center font-semibold text-2xl" >Something went wrong</p> }
    {listing && !error && (<div>
        <Swiper navigation >
            {listing.imageUrls.map((url) => (
                    <SwiperSlide key={url}> 
                        <div className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }} >

                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
    </div>)}
    </main>;
}
