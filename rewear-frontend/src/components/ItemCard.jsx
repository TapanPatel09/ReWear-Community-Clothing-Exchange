import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      <Link to={`/items/${item._id}`}>
        <img
          src={item.images?.[0] || '/placeholder.png'}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600 truncate">{item.description}</p>
          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>Size: {item.size}</span>
            <span>Status: {item.status}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
