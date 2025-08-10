import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import { getProduct } from '../features/product/productSlice';
import DeliveryTruckLoader from '../components/DeliveryTruckLoader';

const Item = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch all products when the component mounts
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const params = useParams();
    const productId = params.id;

    const { products, loading, error } = useSelector((state) => state.product);
    const [currentItem, setCurrentItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [stockMessage, setStockMessage] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    // Effect to find the specific product from the Redux store's products array
    useEffect(() => {
        // Reset states when productId or products change
        setCurrentItem(null);
        setSelectedSize('');
        setSelectedColor('');
        setQuantity(1);
        setStockMessage('');
        setFeedbackMessage('');

        // Only attempt to find the product if products array is loaded
        if (products && products.length > 0 && productId) {
            const foundProduct = products.find(p => p._id === productId);

            if (foundProduct) {
                // --- FIX: Correctly parse the sizes data from the backend's format ---
                let parsedSizes = [];
                // Check if the sizes array exists and contains a string to parse
                if (foundProduct.sizes && foundProduct.sizes.length > 0) {
                    try {
                        // The backend is returning ['["x","m","l","xl"]'], so we parse the first item
                        // which is the stringified array.
                        parsedSizes = JSON.parse(foundProduct.sizes[0]);
                    } catch (e) {
                        console.error('Failed to parse sizes:', e);
                        // Fallback to an empty array if parsing fails
                        parsedSizes = []; 
                    }
                }
                // --- END FIX ---
                
                // Set default colors (this can be replaced with dynamic colors if available)
                const defaultColors = ['White', 'Black', 'Blue', 'Red', 'Green'];

                setCurrentItem({
                    ...foundProduct,
                    image: foundProduct.image?.url,
                    price: foundProduct.sellingPrice,
                    availableSizes: parsedSizes, // Use the correctly parsed sizes array
                    availableColors: defaultColors
                });

                setSelectedSize(parsedSizes[0] || '');
                setSelectedColor(defaultColors[0] || '');
                setQuantity(1);

                if (foundProduct.stock === 0) {
                    setStockMessage('Out Of Stock');
                } else if (foundProduct.stock < 5) {
                    setStockMessage(`Only ${foundProduct.stock} left in stock!`);
                }
            } else {
                console.warn(`Product with ID ${productId} not found in Redux store.`);
            }
        }
    }, [productId, products]);

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            setStockMessage('');
        }
    };

    const handleIncreaseQuantity = () => {
        if (currentItem && quantity < currentItem.stock) {
            setQuantity(prevQuantity => prevQuantity + 1);
            setStockMessage('');
        } else if (currentItem && quantity >= currentItem.stock) {
            setStockMessage(`Maximum quantity reached (${currentItem.stock} in stock).`);
        }
    };

    const handleAddToCart = () => {
        if (!currentItem || !selectedSize || !selectedColor || quantity < 1) {
            setFeedbackMessage('Please select a size, color, and a quantity greater than 0.');
            return;
        }

        const itemToAdd = {
            id: currentItem._id,
            name: currentItem.name,
            price: currentItem.price,
            image: currentItem.image,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity
        };

        dispatch(addItemToCart(itemToAdd));
        setFeedbackMessage(`${itemToAdd.name} added to cart!`);
        setTimeout(() => {
            navigate('/shop');
        }, 1500); // Redirect after a short delay
    };

    const handleBuyNow = () => {
        if (!currentItem || !selectedSize || !selectedColor || quantity < 1) {
            setFeedbackMessage('Please select a size, color, and a quantity greater than 0.');
            return;
        }

        const itemToBuy = {
            id: currentItem._id,
            name: currentItem.name,
            price: currentItem.price,
            image: currentItem.image,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity
        };

        dispatch(addItemToCart(itemToBuy));
        setFeedbackMessage(`Proceeding to checkout with ${itemToBuy.name}.`);
        setTimeout(() => {
            navigate('/order');
        }, 1000);
    };

 
    if (loading) {
        return (
            <>
                
               <p>Loading dashboard...</p>
               
            </>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center'>
                <div className='bg-white p-8 rounded-xl shadow-lg border border-gray-200'>
                    <p className='text-lg text-red-600 mb-4'>Error: {error.message || 'Failed to load products.'}</p>
                </div>
            </div>
        );
    }

    if (!currentItem) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-100'>
                <p className='text-lg text-gray-700'>Product not found.</p>
            </div>
        );
    }

   
    return (
        <div className='min-h-screen flex flex-col font-inter bg-gray-100'>
      
            <main className='flex-grow container mx-auto px-4 py-8 md:py-12'>
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white rounded-2xl shadow-xl p-6 md:p-10'>
                    {/* Product Image Section */}
                    <div className='lg:w-1/2 flex justify-center items-center p-4'>
                        <img
                            src={currentItem.image}
                            alt={currentItem.name}
                            className='w-full max-w-sm h-auto rounded-xl shadow-md object-cover transition-transform duration-300 hover:scale-105'
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/e2e8f0/64748b?text=Product+Image'; }}
                        />
                    </div>

                    {/* Product Details and Actions Section */}
                    <div className='lg:w-1/2 flex flex-col justify-center'>
                        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>{currentItem.name}</h1>
                        <p className='text-xl md:text-2xl font-semibold text-gray-800 mb-4'>${currentItem.price.toFixed(2)}</p>

                        <p className='text-gray-600 mb-6 leading-relaxed'>{currentItem.description}</p>

                        {/* Stock status message */}
                        {stockMessage && (
                            <div className={`mb-4 p-3 rounded-lg text-sm font-medium
                                ${currentItem.stock === 0 ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-orange-100 text-orange-700 border border-orange-300'}`}>
                                {stockMessage}
                            </div>
                        )}

                        {/* Custom feedback message box */}
                        {feedbackMessage && (
                            <div className={`mb-4 p-3 rounded-lg text-sm font-medium text-center transition-all duration-300
                                ${feedbackMessage.includes('added to cart') || feedbackMessage.includes('checkout') ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                                {feedbackMessage}
                            </div>
                        )}

                        {/* Size Selection */}
                        <div className='mb-4'>
                            <label htmlFor="size" className='block text-gray-700 text-sm font-medium mb-2'>
                                Size: <span className='text-xl font-semibold'>{selectedSize}</span>
                            </label>
                            <div className='flex flex-wrap gap-2'>
                                {currentItem.availableSizes && currentItem.availableSizes.length > 0 ? (
                                    currentItem.availableSizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                                                ${selectedSize === size
                                                    ? 'bg-indigo-600 text-white shadow-md'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))
                                ) : (
                                    <span className='text-sm text-gray-500'>No sizes available</span>
                                )}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className='mb-6'>
                            <label htmlFor="color" className='block text-gray-700 text-sm font-medium mb-2'>
                                Color: <span className='font-semibold'>{selectedColor}</span>
                            </label>
                            <div className='flex flex-wrap gap-2'>
                                {currentItem.availableColors && currentItem.availableColors.length > 0 ? (
                                    currentItem.availableColors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200
                                                ${selectedColor === color ? 'border-indigo-600 ring-2 ring-indigo-300' : 'border-gray-300 hover:border-gray-500'}`}
                                            style={{ backgroundColor: color.toLowerCase() }}
                                            title={color}
                                        ></button>
                                    ))
                                ) : (
                                    <span className='text-sm text-gray-500'>No colors available</span>
                                )}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className='flex items-center space-x-4 mb-6'>
                            <label htmlFor="quantity" className='text-gray-700 text-sm font-medium'>Quantity:</label>
                            <div className='flex items-center space-x-2 bg-gray-200 rounded-full px-3 py-1'>
                                <button
                                    onClick={handleDecreaseQuantity}
                                    className='text-gray-600 hover:text-gray-900 text-lg font-semibold w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200'
                                >
                                    -
                                </button>
                                <span className='text-xl font-medium text-gray-800'>{quantity}</span>
                                <button
                                    onClick={handleIncreaseQuantity}
                                    className='text-gray-600 hover:text-gray-900 text-lg font-semibold w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200'
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <button
                                onClick={handleAddToCart}
                                disabled={currentItem.stock === 0}
                                className={`flex-1 text-white py-3 px-6 rounded-full text-lg font-semibold transition-colors duration-200 shadow-md transform hover:-translate-y-1
                                    ${currentItem.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                {currentItem.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={currentItem.stock === 0}
                                className={`flex-1 text-white py-3 px-6 rounded-full text-lg font-semibold transition-colors duration-200 shadow-md transform hover:-translate-y-1
                                    ${currentItem.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900'}`}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </main>
     
        </div>
    );
};

export default Item;
