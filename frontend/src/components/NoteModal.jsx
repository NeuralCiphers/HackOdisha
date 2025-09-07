import { useEffect, useState } from "react";

export default function NoteModal({ isOpen, onClose, onSubmit, sections = [], initial = {} }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [content, setContent] = useState(initial.content || "");
  const [sectionId, setSectionId] = useState(initial.section || "");

  useEffect(() => {
    if (isOpen) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setContent(initial.content || "");
      setSectionId(initial.section || "");
    }
  }, [isOpen, initial]);

  if (!isOpen) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, content, sectionId: sectionId || undefined });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{initial._id ? "Update Note" : "Create Note"}</h3>
        </div>
        <form onSubmit={submit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full border rounded-lg px-3 py-2 h-40" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select value={sectionId} onChange={(e) => setSectionId(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              <option value="">No Section</option>
              {sections.map((s) => (
                <option key={s._id} value={s._id}>{s.title}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white">{initial._id ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
} 