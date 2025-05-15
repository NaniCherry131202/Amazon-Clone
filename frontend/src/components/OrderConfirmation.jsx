import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react'; // optional icon library (lucide-react)

export default function OrderConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-[#F0F2F2] p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-[#232F3E] mb-4">Thank You!</h2>
        <p className="text-lg text-gray-700 mb-2">Your order has been placed successfully.</p>
        <p className="text-sm text-gray-500 mb-6">You will be redirected to the homepage in 10 seconds...</p>

        <button
          onClick={() => navigate('/')}
          className="bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Go to Homepage Now
        </button>
      </div>
    </div>
  );
}
