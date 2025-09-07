// src/pages/MyResources.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import SectionList from "../components/SectionList";
import ResourceCard from "../components/ResourceCard";
import Materials from "../components/Materials";
import NoteModal from "../components/NoteModal";
import SectionModal from "../components/SectionModal";
import LinkSheetModal from "../components/LinkSheetModal";
import LoadSh from "../loading/LoadSh";
import { materials } from "../dummyData";
import api from "../api.js";

export default function MyResources() {
  const [sections, setSections] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showLinkSheetModal, setShowLinkSheetModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const pdfInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const fetchAll = async () => {
    const [secRes, resRes] = await Promise.all([
      api.getSections(),
      api.getResources(),
    ]);
    setSections(secRes.sections || []);
    setResources(resRes.resources || []);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [secRes, resRes] = await Promise.all([
          api.getSections(),
          api.getResources(),
        ]);
        if (mounted) {
          setSections(secRes.sections || []);
          setResources(resRes.resources || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    const onChanged = () => fetchAll();
    window.addEventListener("resources-changed", onChanged);
    return () => { mounted = false; window.removeEventListener("resources-changed", onChanged); };
  }, []);

  const unsectionedResources = useMemo(
    () => resources.filter((resource) => !resource.section),
    [resources]
  );

  const handleMaterialClick = async (materialId) => {
    try {
      if (materialId === "createSection") {
        setShowSectionModal(true);
      } else if (materialId === "uploadPDF") {
        pdfInputRef.current?.click();
      } else if (materialId === "uploadImage") {
        imageInputRef.current?.click();
      } else if (materialId === "createLinkSheet") {
        setShowLinkSheetModal(true);
      } else if (materialId === "createNote") {
        setEditingNote(null);
        setShowNoteModal(true);
      }
    } catch (e) {
      alert(e.message || "Action failed");
    }
  };

  const onPdfChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const title = window.prompt("Title? (optional)") || file.name;
      const description = window.prompt("Description? (optional)") || "";
      await api.createPdfResource({ file, title, description });
      await fetchAll();
    } catch (e) {
      alert(e.message || "Upload failed");
    } finally {
      e.target.value = "";
    }
  };

  const onImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const title = window.prompt("Title? (optional)") || file.name;
      const description = window.prompt("Description? (optional)") || "";
      await api.createImageResource({ file, title, description });
      await fetchAll();
    } catch (e) {
      alert(e.message || "Upload failed");
    } finally {
      e.target.value = "";
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm("Delete this section? Resources inside will be removed.")) return;
    try {
      await api.deleteSection(sectionId);
      await fetchAll();
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  const handleDeleteResource = async (resourceId) => {
    if (!window.confirm("Delete this resource?")) return;
    try {
      await api.deleteResource(resourceId);
      await fetchAll();
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  const submitNote = async ({ title, description, content, sectionId }) => {
    try {
      if (editingNote && editingNote._id) {
        await api.updateNoteResource({ id: editingNote._id, title, description, content });
      } else {
        await api.createNoteResource({ title, description, content, sectionId });
      }
      setShowNoteModal(false);
      setEditingNote(null);
      await fetchAll();
    } catch (e) {
      alert(e.message || "Save failed");
    }
  };

  const submitSection = async ({ title, description }) => {
    try {
      await api.createSection({ title, description });
      setShowSectionModal(false);
      await fetchAll();
    } catch (e) {
      alert(e.message || "Create section failed");
    }
  };

  const submitLinkSheet = async ({ title, description, links }) => {
    try {
      await api.createLinkSheetResource({ title, description, links });
      setShowLinkSheetModal(false);
      await fetchAll();
    } catch (e) {
      alert(e.message || "Create linksheet failed");
    }
  };

  if (loading) {
    return <LoadSh label="Fetching your resources..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <input ref={pdfInputRef} type="file" accept="application/pdf" className="hidden" onChange={onPdfChange} />
      <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={onImageChange} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Resources</h1>
          <p className="text-gray-600">Manage and organize your study materials</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <Materials
            materials={materials}
            onMaterialClick={handleMaterialClick}
          />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📁</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{sections.length}</div>
                <div className="text-sm text-gray-600">Sections</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📚</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{resources.length}</div>
                <div className="text-sm text-gray-600">Total Resources</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📝</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{unsectionedResources.length}</div>
                <div className="text-sm text-gray-600">Unorganized</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((sec) => (
            <SectionList key={sec._id} section={sec} onDelete={() => handleDeleteSection(sec._id)}>
              {(Array.isArray(sec.resources) ? sec.resources : []).map((resource) => (
                <ResourceCard key={resource._id} resource={resource} onDelete={() => handleDeleteResource(resource._id)} />
              ))}
            </SectionList>
          ))}
        </div>

        {/* Resources not in any section */}
        {unsectionedResources.length > 0 && (
          <div className="mt-8">
            <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📝</span>
                <h2 className="text-xl font-bold">Other Resources</h2>
              </div>
              <p className="text-gray-200 text-sm">Resources not organized into any section</p>
            </div>

            <div className="mt-4 ml-4">
              <div className="space-y-4">
                {unsectionedResources.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} onDelete={() => handleDeleteResource(resource._id)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {sections.length === 0 && resources.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources yet</h3>
            <p className="text-gray-600 mb-6">Start by creating your first section or uploading a resource!</p>
            <button onClick={() => handleMaterialClick("createSection")} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
              Get Started
            </button>
          </div>
        )}
      </div>

      <NoteModal
        isOpen={showNoteModal}
        onClose={() => { setShowNoteModal(false); setEditingNote(null); }}
        onSubmit={submitNote}
        sections={sections}
        initial={editingNote || {}}
      />

      <SectionModal
        isOpen={showSectionModal}
        onClose={() => setShowSectionModal(false)}
        onSubmit={submitSection}
      />

      <LinkSheetModal
        isOpen={showLinkSheetModal}
        onClose={() => setShowLinkSheetModal(false)}
        onSubmit={submitLinkSheet}
      />
    </div>
  );
}
