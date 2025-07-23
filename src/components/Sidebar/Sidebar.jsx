import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FolderOpen, FileText, Calendar, Plus, Menu, X } from 'lucide-react';
import './Sidebar.css';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'meus-documentos', label: ' Meus Documentos', icon: FileText, path: '/home' },
    { id: 'compartilhados', label: 'Documentos Compartilhados', icon: FolderOpen, path: '/compartilhados' },
    { id: 'agendados', label: 'Documentos Agendados', icon: Calendar, path: '/agendados' },
  ];

  const handleCreateDocument = () => {
    navigate('/criar-documento');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          {isOpen && <h2 className="sidebar-title">MinDocs</h2>}
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <>
            <button 
              className="create-document-btn"
              onClick={handleCreateDocument}
            >
              <Plus size={20} />
              Criar Documento
            </button>

            <nav className="sidebar-nav">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <IconComponent size={20} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </>
        )}
      </div>
    </>
  );
}