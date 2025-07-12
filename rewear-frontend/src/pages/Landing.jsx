import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-purple-100 p-6">
      <h1 className="text-5xl font-extrabold text-purple-700 mb-4">Welcome to ReWear</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        A community-driven clothing exchange platform. Swap unused garments and support sustainable fashion.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/signup"
          className="bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition"
        >
          Start Swapping
        </Link>
        <Link
          to="/dashboard"
          className="bg-white border border-purple-600 text-purple-600 px-6 py-3 rounded-md font-medium hover:bg-purple-100 transition"
        >
          Browse Items
        </Link>
        <Link
          to="/new-item"
          className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-900 transition"
        >
          List an Item
        </Link>
      </div>
    </div>
  );
};

export default Landing;
