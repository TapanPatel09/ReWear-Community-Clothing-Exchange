import { useEffect, useState } from 'react';
import { getAllItems, updateItemStatus, deleteItem } from '../services/itemService';

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchItems = async () => {
    const res = await getAllItems();
    setItems(res.items || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAction = async (itemId, action) => {
    if (action === 'delete') {
      await deleteItem(itemId);
    } else {
      await updateItemStatus(itemId, action);
    }
    setMessage(`Item ${action === 'delete' ? 'deleted' : `marked as ${action}`}`);
    fetchItems();
  };

  if (loading) return <p className="p-6">Loading items...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {items.length === 0 ? (
        <p className="text-gray-500">No items to review.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow-sm bg-white">
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs mt-1 text-gray-500">Uploaded by: {item.owner?.name || 'N/A'}</p>
              <p className="text-sm mt-1">Status: <strong>{item.status}</strong></p>

              <div className="mt-3 flex gap-2 flex-wrap">
                <button
                  onClick={() => handleAction(item._id, 'approved')}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(item._id, 'rejected')}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleAction(item._id, 'delete')}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
