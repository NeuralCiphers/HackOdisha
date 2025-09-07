import React from 'react'

const Footer = () => {
  return (
      <footer className="text-center py-4 border-t mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} StudyStore. All rights reserved.
      </footer>
  );
}

export default Footer;