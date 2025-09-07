import ResourceCard from "./ResourceCard";

const SectionList = ({ section, onDelete, children }) => {
  const sectionResources = Array.isArray(section.resources) ? section.resources : [];

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📁</span>
            <div>
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p className="text-indigo-100 text-sm">{section.description}</p>
            </div>
          </div>
          {onDelete && (
            <button onClick={onDelete} className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded-md">
              Delete
            </button>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
            {sectionResources.length} resource{sectionResources.length !== 1 ? "s" : ""}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              section.visibility === "public"
                ? "bg-green-500 bg-opacity-20 text-green-100"
                : "bg-gray-500 bg-opacity-20 text-gray-100"
            }`}
          >
            {section.visibility === "public" ? "🌐 Public" : "🔒 Private"}
          </span>
        </div>
      </div>

      <div className="mt-4 ml-4">
        {children ? (
          <div className="space-y-4">{children}</div>
        ) : sectionResources.length > 0 ? (
          <div className="space-y-4">
            {sectionResources.map((res) => (
              <ResourceCard key={res._id} resource={res} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-gray-400 text-4xl mb-3">📂</div>
            <p className="text-gray-500 font-medium">No resources in this section yet</p>
            <p className="text-sm text-gray-400 mt-1">Add some resources to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionList;
