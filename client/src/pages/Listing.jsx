import React from "react";

export default function Listing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="font-semibold text-center text-3xl mt-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row p-3 gap-4 mt-5 text-sm">
        <div className="flex flex-col flex-1 gap-2">
          <input
            className="p-3 border rounded-lg "
            type="text"
            placeholder="Name"
            id="name"
            required
          />
          <textarea
            className="p-3 border rounded-lg "
            type="text"
            placeholder="Description"
            id="description"
            required
          />
          <input
            className="p-3 border rounded-lg "
            type="text"
            placeholder="Address"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="sale" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="parking" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg "
                id="beds"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="p-3 border border-gray-300 rounded-lg"
                id="price"
                required
              />
              <div className='flex flex-col items-center'>
                <p>Price</p>
                <span className='text-xs'>(rs / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="p-3 border border-gray-300 rounded-lg"
                id="discountPrice"
                required
              />
              <div className='flex flex-col items-center'>
                <p>Discount Price</p>
                <span className='text-xs'>(rs / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images:
          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  );
}
