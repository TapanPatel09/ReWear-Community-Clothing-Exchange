import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItem, redeemItem } from '../services/itemService';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItem(id).then((data) => {
      setItem(data.item);
      setLoading(false);
    });
  }, [id]);

  const handleRedeem = async () => {
    const res = await redeemItem(id);
    setMessage(res.message || res.error);
  };

  if (loading) return <p className="p-6">Loading item...</p>;
  if (!item) return <p className="p-6 text-red-600">Item not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={item.images?.[0]}
          alt={item.title}
          className="w-full h-64 object-cover rounded"
        />

        <div>
          <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
          <p className="text-gray-700 mb-3">{item.description}</p>
          <p className="text-sm text-gray-500">
            Category: {item.category} • Size: {item.size} • Condition: {item.condition}
          </p>
          <p className="mt-2 text-xs text-gray-600">Uploaded by: {item.owner?.name || 'N/A'}</p>
          <p className="text-green-700 mt-2 text-sm">Status: {item.status}</p>

          <button
            onClick={handleRedeem}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            disabled={item.status !== 'available'}
          >
            Redeem via Points
          </button>

          {message && (
            <p className="mt-3 text-blue-600 font-medium">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
