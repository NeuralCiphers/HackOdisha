// src/components/ResourceCard.jsx
import api from "../api.js";
import { FaFilePdf, FaImage, FaLink, FaStickyNote } from "react-icons/fa";

const ResourceCard = ({ resource, onDelete }) => {
  const type = resource.resourceType || resource.type;
  const visibility = (resource.visibility || 'private');

  const getTypeLabel = (t) => {
    switch (t) {
      case "Pdf":
      case "PDF":
        return "PDF";
      case "Image":
      case "IMAGE":
        return "IMAGE";
      case "LinkSheet":
      case "LINKSHEET":
        return "LINKSHEET";
      case "Note":
      case "NOTE":
        return "NOTE";
      default:
        return "FILE";
    }
  };

  const getTypeColor = (t) => {
    const label = getTypeLabel(t);
    switch (label) {
      case "PDF":
        return "bg-red-100 text-red-800 border-red-200";
      case "IMAGE":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "LINKSHEET":
        return "bg-green-100 text-green-800 border-green-200";
      case "NOTE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderResourceContent = () => {
    const label = getTypeLabel(type);
    switch (label) {
      case "PDF":
        return (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              <FaFilePdf />
              <span>View PDF</span>
              <span className="text-sm text-gray-500">({formatFileSize(resource.size)})</span>
            </a>
          </div>
        );
      case "IMAGE":
        return (
          <div className="mt-3">
            <div className="relative group">
              <img
                src={resource.url}
                alt={resource.title}
                className="w-full max-w-md rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {formatFileSize(resource.size)}
              </div>
            </div>
          </div>
        );
      case "LINKSHEET":
        return (
          <div className="mt-3">
            <div className="space-y-2">
              {(resource.links || []).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <FaLink className="mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {link.url}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      case "NOTE":
        return (
          <div className="mt-3">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">{resource.content}</pre>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const onUpdateNote = async () => {
    const newTitle = window.prompt("Update title", resource.title) ?? resource.title;
    const newDescription = window.prompt("Update description", resource.description || "") ?? resource.description;
    const newContent = window.prompt("Update content", resource.content || "") ?? resource.content;
    try {
      await api.updateNoteResource({ id: resource._id, title: newTitle, description: newDescription, content: newContent });
      window.dispatchEvent(new Event("resources-changed"));
      alert("Note updated");
    } catch (e) {
      alert(e.message || "Update failed");
    }
  };

  const renderTypeIcon = () => {
    const label = getTypeLabel(type);
    switch (label) {
      case "PDF":
        return <FaFilePdf className="text-red-600" />;
      case "IMAGE":
        return <FaImage className="text-blue-600" />;
      case "LINKSHEET":
        return <FaLink className="text-green-600" />;
      case "NOTE":
        return <FaStickyNote className="text-yellow-600" />;
      default:
        return <FaStickyNote />;
    }
  };

  const toggleVisibility = () => {
    // Frontend-only override (no backend changes): store visibility override by id
    const key = "visibilityOverrides";
    const overrides = JSON.parse(localStorage.getItem(key) || "{}");
    const current = (overrides[resource._id] ?? visibility);
    const next = current === "public" ? "private" : "public";
    overrides[resource._id] = next;
    localStorage.setItem(key, JSON.stringify(overrides));
    window.dispatchEvent(new Event("resources-changed"));
  };

  const visibleLabel = (() => {
    const ov = JSON.parse(localStorage.getItem("visibilityOverrides") || "{}")[resource._id];
    return ov || visibility;
  })();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{renderTypeIcon()}</span>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{resource.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(type)}`}>
              {getTypeLabel(type)}
            </span>
            <button onClick={toggleVisibility}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${visibleLabel === "public" ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"}`}>
              {visibleLabel === "public" ? "🌐 Public" : "🔒 Private"}
            </button>
            {getTypeLabel(type) === "NOTE" && (
              <button onClick={onUpdateNote} className="ml-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 px-2 py-1 rounded-md">
                Update
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} className="ml-2 text-sm text-red-600 hover:text-red-700 border border-red-200 px-2 py-1 rounded-md">
                Delete
              </button>
            )}
          </div>
        </div>
        {renderResourceContent()}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">Created: {new Date(resource.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
