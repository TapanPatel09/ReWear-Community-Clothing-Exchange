import { useEffect, useState } from 'react';
import { getProfile } from '../services/userService';
import ItemCard from '../components/ItemCard';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-6">Loading your dashboard...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {profile?.user?.name}</h2>

      <div className="mb-6 bg-white p-4 rounded shadow-sm">
        <p><strong>Email:</strong> {profile?.user?.email}</p>
        <p><strong>Points:</strong> {profile?.user?.points}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Your Listed Items</h3>
        {profile?.uploadedItems?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profile.uploadedItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't listed any items yet.</p>
        )}
      </div>

      {/* Later: swaps, edit profile, etc. */}
    </div>
  );
};

export default Dashboard;
