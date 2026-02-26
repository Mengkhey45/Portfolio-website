import React, { useState } from 'react';
import { validateProjectForm } from '../utils/validation';

const AdminProjectForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      shortDescription: '',
      description: '',
      thumbnail: '',
      images: [],
      links: [{ type: 'github', url: '' }],
      tags: [],
    }
  );

  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');
  const [newLink, setNewLink] = useState({ type: 'github', url: '' });

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, event.target.result],
        }));
      };
      reader.readAsDataURL(file);
    });
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

  const handleAddLink = () => {
    if (newLink.type && newLink.url) {
      setFormData((prev) => ({
        ...prev,
        links: [...prev.links, { ...newLink }],
      }));
      setNewLink({ type: 'github', url: '' });
    }
  };

  const handleRemoveLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateLink = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Basic Information</h3>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-white font-medium mb-2">Project Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter project title"
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                errors.title ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'
              }`}
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-white font-medium mb-2">Short Description*</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              placeholder="Brief description for card preview"
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                errors.shortDescription ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'
              }`}
            />
            {errors.shortDescription && <p className="text-red-400 text-sm mt-1">{errors.shortDescription}</p>}
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-white font-medium mb-2">Full Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed project description"
              rows="6"
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'
              }`}
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Media</h3>

        <div className="space-y-6">
          {/* Thumbnail */}
          <div>
            <label className="block text-white font-medium mb-2">Thumbnail Image*</label>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
                id="thumbnail-input"
              />
              <label
                htmlFor="thumbnail-input"
                className="cursor-pointer block"
              >
                <p className="text-slate-300 mb-2">Click to upload or drag and drop</p>
                <p className="text-slate-500 text-sm">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
            {formData.thumbnail && (
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail preview"
                  className="h-24 w-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, thumbnail: '' }))}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-white font-medium mb-2">Additional Images</label>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                multiple
                className="hidden"
                id="images-input"
              />
              <label
                htmlFor="images-input"
                className="cursor-pointer block"
              >
                <p className="text-slate-300 mb-2">Click to upload multiple images</p>
                <p className="text-slate-500 text-sm">PNG, JPG, GIF up to 10MB each</p>
              </label>
            </div>
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Project ${index + 1}`}
                      className="h-24 w-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index),
                        }))
                      }
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Project Links</h3>

        <div className="space-y-4">
          {formData.links.map((link, index) => (
            <div key={index} className="flex gap-3">
              <select
                value={link.type}
                onChange={(e) => handleUpdateLink(index, 'type', e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="github">GitHub</option>
                <option value="live">Live Demo</option>
                <option value="figma">Figma</option>
                <option value="dribbble">Dribbble</option>
                <option value="other">Other</option>
              </select>
              <input
                type="url"
                value={link.url}
                onChange={(e) => handleUpdateLink(index, 'url', e.target.value)}
                placeholder="https://..."
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {formData.links.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {/* Add New Link */}
          <div className="border-t border-slate-700 pt-4 flex gap-3">
            <select
              value={newLink.type}
              onChange={(e) => setNewLink((prev) => ({ ...prev, type: e.target.value }))}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="github">GitHub</option>
              <option value="live">Live Demo</option>
              <option value="figma">Figma</option>
              <option value="dribbble">Dribbble</option>
              <option value="other">Other</option>
            </select>
            <input
              type="url"
              value={newLink.url}
              onChange={(e) => setNewLink((prev) => ({ ...prev, url: e.target.value }))}
              placeholder="https://..."
              className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddLink}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Tags / Technologies</h3>

        <div className="space-y-4">
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm flex items-center gap-2"
                >
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

          {/* Add Tag */}
          <div className="flex gap-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add a tag (React, Node.js, etc.)"
              className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add Tag
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
        >
          {isLoading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
};

export default AdminProjectForm;
