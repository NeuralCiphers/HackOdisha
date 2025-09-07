// src/components/Materials.jsx
import {
  FaPlus,
  FaFilePdf,
  FaImage,
  FaLink,
  FaStickyNote,
} from "react-icons/fa";

const Materials = ({ materials, onMaterialClick }) => {
  const getMaterialIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FaFilePdf size={16} />;
      case "IMAGE":
        return <FaImage size={16} />;
      case "LINKSHEET":
        return <FaLink size={16} />;
      case "NOTE":
        return <FaStickyNote size={16} />;
      default:
        return <FaPlus size={16} />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {materials.map((material) => (
        <button
          key={material.id}
          onClick={() => onMaterialClick(material.id)}
          className={`group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed transition-all duration-200 hover:scale-105 hover:shadow-lg ${material.bgColor} hover:border-solid`}
        >
          <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
            {getMaterialIcon(material.type)}
          </div>
          <div className="text-center">
            <div className="font-semibold text-white mb-1">
              {material.label}
            </div>
            <div className="text-xs text-white text-opacity-80">
              {material.description}
            </div>
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <FaPlus size={12} />
            <span>Add {material.type}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Materials;
