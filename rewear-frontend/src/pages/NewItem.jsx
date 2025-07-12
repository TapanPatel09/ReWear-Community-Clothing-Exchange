import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadItem } from '../services/itemService';

const NewItem = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (images.length === 0) {
      return setError('Please upload at least one image.');
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'tags') {
        val.split(',').forEach((tag) => formData.append('tags', tag.trim()));
      } else {
        formData.append(key, val);
      }
    });
    images.forEach((img) => formData.append('images', img));

    setUploading(true);
    const res = await uploadItem(formData);
    setUploading(false);

    if (res.error) return setError(res.error);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">List a New Item</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="category"
            placeholder="Category (e.g., Shirt)"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="type"
            placeholder="Type (e.g., Casual)"
            value={form.type}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="size"
            placeholder="Size (e.g., M)"
            value={form.size}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="condition"
            placeholder="Condition (e.g., Gently used)"
            value={form.condition}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />

        {preview.length > 0 && (
          <div className="flex gap-3 mt-2">
            {preview.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} className="w-24 h-24 object-cover rounded border" />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Submit Item'}
        </button>
      </form>
    </div>
  );
};

export default NewItem;
