import React, { useEffect, useMemo, useState } from "react";
import ResourceCard from "../components/ResourceCard";
import LoadSh from "../loading/LoadSh";
import { exampleUnsectionedResources } from "../dummyData";
import api from "../api.js";

const Home = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.getResources();
        const list = res.resources || [];
        const merged = list.length ? list : exampleUnsectionedResources;
        if (mounted) setResources(merged);
      } catch (e) {
        console.error(e);
        if (mounted) setResources(exampleUnsectionedResources);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    const onChanged = () => setResources((prev) => [...prev]);
    window.addEventListener("resources-changed", onChanged);
    return () => { mounted = false; window.removeEventListener("resources-changed", onChanged); };
  }, []);

  const publicResources = useMemo(() => {
    const overrides = JSON.parse(localStorage.getItem("visibilityOverrides") || "{}");
    return (resources || []).filter((r) => {
      const vis = overrides[r._id] || r.visibility || "private";
      return vis === "public";
    });
  }, [resources]);

  const totalResources = resources.length;
  const publicCount = publicResources.length;
  const privateCount = totalResources - publicCount;

  const resourcesByType = useMemo(() => {
    return publicResources.reduce((acc, resource) => {
      const type = (resource.resourceType || resource.type || "").toUpperCase();
      const map = { IMAGE: "IMAGE", PDF: "PDF", LINKSHEET: "LINKSHEET", NOTE: "NOTE" };
      const key = map[type] || type || "OTHER";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [publicResources]);

  if (loading) {
    return (
      <LoadSh label="Loading public feed..." />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Study Resource Dumper
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Share, discover, and organize your study resources with fellow
              students.  The platform where you can get study resources, store them, and share them with the community.
            </p>
            
            {/* <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
                📚 {totalResources} Total Resources
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
                🌐 {publicCount} Public
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
                🔒 {privateCount} Private
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Resource Types
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(resourcesByType).map(([type, count]) => {
              const icons = {
                PDF: "📄",
                IMAGE: "🖼️",
                LINKSHEET: "🔗",
                NOTE: "📝",
              };
              const colors = {
                PDF: "bg-red-100 text-red-800",
                IMAGE: "bg-blue-100 text-blue-800",
                LINKSHEET: "bg-green-100 text-green-800",
                NOTE: "bg-yellow-100 text-yellow-800",
              };
              return (
                <div
                  key={type}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <div className="text-3xl mb-2">{icons[type] || "📁"}</div>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors[type] || "bg-gray-100 text-gray-800"}`}
                  >
                    {type}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-2">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resources Feed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Public Resources Feed
              </h2>
              <p className="text-gray-600 mt-2">
                Discover resources shared by the community
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {publicResources.length} resource
              {publicResources.length !== 1 ? "s" : ""} available
            </div>
          </div>

          {publicResources.length > 0 ? (
            <div className="space-y-6">
              {publicResources.map((resource) => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No public resources yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to share a resource with the community!
              </p>
              <a href="/resources" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                Share Your First Resource
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
