import { useState, useEffect } from "react";
import { 
  Trash2, 
  Heart, 
  CreditCard, 
  ChevronRight, 
  PlusCircle, 
  MinusCircle,
  Info,
  X,
  ArrowLeft
} from "lucide-react";

// Mock cart data based on your cause structure
const mockCartItems = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description: "Help bring clean water to communities in need around the world.",
    price: 39.99,
    thumbnailUrl: "/api/placeholder/200/120",
    ownerId: 123,
    review: 4,
    quantity: 1
  },
  {
    id: 2,
    title: "Education for All",
    description: "Support education programs for underprivileged children.",
    price: 25.50,
    thumbnailUrl: "/api/placeholder/200/120",
    ownerId: 456,
    review: 5,
    quantity: 2
  },
  {
    id: 3,
    title: "Wildlife Conservation",
    description: "Help protect endangered species and their habitats.",
    price: 15.75,
    thumbnailUrl: "/api/placeholder/200/120",
    ownerId: 789,
    review: 4,
    quantity: 1
  }
];

export default function CauseCartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.07; // Example 7% tax
  const total = subtotal + tax - discount;

  const handleQuantityChange = (id, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    showNotification("Item removed from cart", "success");
  };

  const handleSaveForLater = (id) => {
    // In a real app, you'd move this to a saved items list
    showNotification("Item saved for later", "success");
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "GOLD25") {
      const discountAmount = subtotal * 0.25; // 25% discount
      setDiscount(discountAmount);
      setPromoApplied(true);
      showNotification("Promo code applied successfully!", "success");
    } else {
      showNotification("Invalid promo code", "error");
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      showNotification("Checkout successful! Redirecting to payment...", "success");
      
      // In a real app, you would redirect to payment page
      // window.location.href = "/checkout/payment";
    }, 1500);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Custom CSS for gold colors */}
      <style dangerouslySetInnerHTML={{__html: `
        .text-gold { color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .bg-light-gold { background-color: #F5EFD5; }
        .hover-gold:hover { background-color: #B8860B; }
      `}} />
      
      {/* Header */}
      <header className="bg-gold p-4 text-white shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center">
            <button className="mr-4 hover:text-gray-200">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>
        </div>
      </header>
      
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md flex items-center justify-between max-w-sm ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-4">
            <X size={16} />
          </button>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto p-4">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-light-gold rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any causes to your cart yet.</p>
              <button className="bg-gold hover-gold text-white py-3 px-6 rounded-md font-medium transition-colors">
                Browse Causes
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-4 bg-light-gold border-b border-gold">
                    <h2 className="font-bold text-gold">Cart Items ({cartItems.length})</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {cartItems.map(item => (
                      <div key={item.id} className="p-4">
                        <div className="flex flex-col sm:flex-row">
                          {/* Thumbnail */}
                          <div className="sm:w-32 mb-4 sm:mb-0">
                            <img 
                              src={item.thumbnailUrl} 
                              alt={item.title} 
                              className="w-full h-auto rounded-md"
                            />
                          </div>
                          
                          {/* Details */}
                          <div className="flex-grow sm:ml-4">
                            <div className="flex justify-between">
                              <h3 className="font-bold text-lg">{item.title}</h3>
                              <p className="font-bold text-gold">${item.price.toFixed(2)}</p>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                            
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              {/* Quantity Controls */}
                              <div className="flex items-center mb-4 sm:mb-0">
                                <span className="text-sm text-gray-600 mr-2">Qty:</span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  className="text-gray-500 hover:text-gold"
                                >
                                  <MinusCircle size={20} />
                                </button>
                                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                  className="text-gray-500 hover:text-gold"
                                >
                                  <PlusCircle size={20} />
                                </button>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex space-x-4">
                                <button 
                                  onClick={() => handleSaveForLater(item.id)}
                                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <Heart size={16} className="mr-1" />
                                  <span>Save for Later</span>
                                </button>
                                <button 
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="flex items-center text-sm text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={16} className="mr-1" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Related Causes - You might also like */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 bg-light-gold border-b border-gold">
                    <h2 className="font-bold text-gold">You Might Also Like</h2>
                  </div>
                  
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center border border-gray-200 rounded-md p-3 hover:border-gold cursor-pointer">
                      <img 
                        src="/api/placeholder/80/80" 
                        alt="Suggested cause" 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium">Hunger Relief</h4>
                        <p className="text-sm text-gray-600">$19.99</p>
                        <button className="text-xs text-gold mt-1 hover:underline">Add to Cart</button>
                      </div>
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-md p-3 hover:border-gold cursor-pointer">
                      <img 
                        src="/api/placeholder/80/80" 
                        alt="Suggested cause" 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium">Disaster Relief</h4>
                        <p className="text-sm text-gray-600">$29.99</p>
                        <button className="text-xs text-gold mt-1 hover:underline">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                  <div className="p-4 bg-light-gold border-b border-gold">
                    <h2 className="font-bold text-gold">Order Summary</h2>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-4">
                      {/* Price Details */}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (7%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-gold">${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Promo Code */}
                    <div className="mt-6">
                      <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-1">
                        Promo Code
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          id="promo-code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={promoApplied}
                          placeholder="Enter promo code"
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                        />
                        <button
                          onClick={applyPromoCode}
                          disabled={promoApplied || !promoCode}
                          className={`px-4 py-2 rounded-r-md ${
                            promoApplied 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gold hover-gold text-white'
                          }`}
                        >
                          {promoApplied ? 'Applied' : 'Apply'}
                        </button>
                      </div>
                      {promoApplied && (
                        <p className="text-xs text-green-600 mt-1">Promo code "GOLD25" applied successfully</p>
                      )}
                    </div>
                    
                    {/* Donation Info */}
                    <div className="mt-6 text-xs text-gray-600 bg-blue-50 p-3 rounded-md flex">
                      <Info size={16} className="text-blue-500 mr-2 flex-shrink-0" />
                      <p>
                        Your support helps us continue our mission. 100% of your donation goes directly to the causes you've selected.
                      </p>
                    </div>
                    
                    {/* Checkout Button */}
                    <button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className={`w-full mt-6 bg-gold hover-gold text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center ${
                        isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProcessing ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <CreditCard size={18} className="mr-2" />
                          <span>Proceed to Checkout</span>
                          <ChevronRight size={18} className="ml-1" />
                        </>
                      )}
                    </button>
                    
                    {/* Trust Badges */}
                    <div className="mt-6 flex justify-center">
                      <div className="text-center">
                        <div className="flex justify-center space-x-4 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 8v4l3 3"></path>
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500">Secure payment • 100% to charity • Instant tax receipt</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© 2025 Cause Platform. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-gray-300 hover:text-white mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white mx-2">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white mx-2">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}