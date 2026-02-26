import React, { useState } from 'react';
import { validateProjectForm } from '../utils/validation';

const AdminProjectForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      thumbnail: '',
      tags: [],
    }
  );

  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, thumbnail: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...new Set([...prev.tags, newTag.trim()])],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateProjectForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-black rounded-lg p-8 max-w-2xl mx-auto">
      {/* Title */}
      <div>
        <label className="block text-white font-semibold mb-3">Project Title*</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter project title"
          className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-colors ${
            errors.title ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:ring-purple-500'
          }`}
        />
        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-white font-semibold mb-3">Description*</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your project"
          rows="4"
          className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-colors ${
            errors.description ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:ring-purple-500'
          }`}
        />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-white font-semibold mb-3">Thumbnail Image*</label>
        <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="hidden"
            id="thumbnail-input"
          />
          <label htmlFor="thumbnail-input" className="cursor-pointer block">
            <i className="bx bx-image text-4xl text-zinc-500 mb-2"></i>
            <p className="text-zinc-300 mb-1">Click to upload or drag and drop</p>
            <p className="text-zinc-500 text-sm">PNG, JPG, GIF up to 10MB</p>
          </label>
        </div>
        {formData.thumbnail && (
          <div className="mt-4 flex items-center gap-4">
            <img src={formData.thumbnail} alt="Thumbnail preview" className="h-24 w-24 object-cover rounded" />
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, thumbnail: '' }))}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
            >
              Remove
            </button>
          </div>
        )}
        {errors.thumbnail && <p className="text-red-400 text-sm mt-1">{errors.thumbnail}</p>}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-white font-semibold mb-3">Programming Languages / Tags</label>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm flex items-center gap-2">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="font-bold hover:text-red-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-3">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            placeholder="React, Python, JavaScript, etc."
            className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-semibold"
          >
            Add
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-lg disabled:bg-zinc-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-300"
      >
        {isLoading ? 'Saving...' : 'Save Project'}
      </button>
    </form>
  );
};

export default AdminProjectForm;
