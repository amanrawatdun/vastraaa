import React from 'react'

const Reviews = () => {
    return (
        <div className="bg-white mx-4 lg:mx-8 py-10 rounded-3xl my-10 shadow-xl">
            <h1 className='text-3xl font-bold text-center text-gray-900 mb-8'>OUR HAPPY CUSTOMERS</h1>
            <div className='p-5 flex space-x-6 overflow-x-auto custom-scrollbar'>
                <div className="relative flex-shrink-0 w-80 p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                    <div className="text-yellow-400 text-2xl mb-2">
                        ★★★★★
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Nishu Khanduri</h3>
                    <p className="text-gray-600 text-sm italic">
                        "This product is amazing! The quality is top-notch and it exceeded my expectations. I would highly recommend it to anyone."
                    </p>
                </div>

                <div className="relative flex-shrink-0 w-80 p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                    <div className="text-yellow-400 text-2xl mb-2">
                        ★★★★☆
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Satyam Rothan</h3>
                    <p className="text-gray-600 text-sm italic">
                        "A great experience overall. The customer service was fantastic and the delivery was prompt. Very satisfied with my purchase."
                    </p>
                </div>

                <div className="relative flex-shrink-0 w-80 p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                    <div className="text-yellow-400 text-2xl mb-2">
                        ★★★★★
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Dev</h3>
                    <p className="text-gray-600 text-sm italic">
                        "Exactly what I was looking for. The features are exactly as described. I'm very happy with my new item."
                    </p>
                </div>

                <div className="relative flex-shrink-0 w-80 p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                    <div className="text-yellow-400 text-2xl mb-2">
                        ★★★☆☆
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Deepak</h3>
                    <p className="text-gray-600 text-sm italic">
                        "It's a good product, but there's room for improvement. I found a few minor issues, but nothing that would stop me from using it."
                    </p>
                </div>
            </div>
           
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .custom-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
};

export default Reviews;
