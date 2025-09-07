import { useEffect, useState } from "react";

export default function LinkSheetModal({ isOpen, onClose, onSubmit, initial = {} }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [links, setLinks] = useState(initial.links || [{ url: "", description: "" }]);

  useEffect(() => {
    if (isOpen) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setLinks(initial.links || [{ url: "", description: "" }]);
    }
  }, [isOpen, initial]);

  if (!isOpen) return null;

  const addRow = () => setLinks([...links, { url: "", description: "" }]);
  const removeRow = (i) => setLinks(links.filter((_, idx) => idx !== i));
  const updateRow = (i, key, value) => setLinks(links.map((l, idx) => idx === i ? { ...l, [key]: value } : l));

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, links: links.filter(l => l.url.trim()) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Create LinkSheet</h3>
        </div>
        <form onSubmit={submit} className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="space-y-3">
            {links.map((l, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="md:col-span-5">
                  <input value={l.url} onChange={(e) => updateRow(i, 'url', e.target.value)} placeholder="https://" className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div className="md:col-span-5">
                  <input value={l.description} onChange={(e) => updateRow(i, 'description', e.target.value)} placeholder="Description" className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <button type="button" onClick={() => removeRow(i)} className="px-3 py-2 rounded-lg border">Remove</button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addRow} className="px-3 py-2 rounded-lg border">Add Link</button>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
} 