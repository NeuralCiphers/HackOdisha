// src/dummyData.js

// Materials shown as quick actions on MyResources page
export const materials = [
  {
    id: "createSection",
    type: "SECTION",
    label: "Create Section",
    description: "Organize your resources",
    bgColor:
      "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
  },
  {
    id: "uploadPDF",
    type: "PDF",
    label: "Upload PDF",
    description: "Share documents",
    bgColor:
      "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
  },
  {
    id: "uploadImage",
    type: "IMAGE",
    label: "Upload Image",
    description: "Share visual content",
    bgColor:
      "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
  },
  {
    id: "createLinkSheet",
    type: "LINKSHEET",
    label: "Create LinkSheet",
    description: "Curate useful links",
    bgColor:
      "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
  },
  {
    id: "createNote",
    type: "NOTE",
    label: "Create Note",
    description: "Write quick notes",
    bgColor:
      "bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
  },
];

// Example data matching backend API shapes
export const exampleSections = [
  {
    _id: "sec_1",
    title: "Math",
    description: "Algebra and Calculus",
    visibility: "private",
    resources: [
      {
        _id: "res_img_1",
        resourceType: "Image",
        title: "Derivative Graph",
        description: "Visualization",
        url: "https://placehold.co/800x500/png",
        size: 155500,
        createdAt: new Date().toISOString(),
        visibility: "public",
      },
      {
        _id: "res_note_1",
        resourceType: "Note",
        title: "Integrals Summary",
        description: "Quick revision",
        content: "∫ f(x) dx = F(x) + C",
        size: 0,
        createdAt: new Date().toISOString(),
        visibility: "private",
      },
    ],
    stats: { totalResources: 2, storageUsed: 155500 },
  },
];

export const exampleUnsectionedResources = [
  {
    _id: "res_pdf_1",
    resourceType: "Pdf",
    title: "Syllabus",
    description: "Semester plan",
    url: "https://example.com/sample.pdf",
    size: 1024 * 1024,
    createdAt: new Date().toISOString(),
    visibility: "private",
  },
  {
    _id: "res_link_1",
    resourceType: "LinkSheet",
    title: "DSA Playlists",
    description: "Useful links",
    links: [
      { url: "https://youtube.com/playlist?list=abc", description: "YT" },
      { url: "https://leetcode.com", description: "Practice" },
    ],
    createdAt: new Date().toISOString(),
    visibility: "public",
  },
]; 