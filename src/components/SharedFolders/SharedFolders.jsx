import React, { useState } from 'react';
import { Folder, Users } from 'lucide-react';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import './SharedFolders.css';


export function SharedFolders() {
  const [folders] = useState([
    {
      id: 1,
      name: "Contratos 2025",
      lastModified: "15 de jun. de 2025 14:30",
      participants: [
        { name: "Isaac Marques", role: "Administrador" },
        { name: "Maria Silva", role: "Editor" },
        { name: "João Santos", role: "Visualizador" }
      ],
      documentsCount: 12
    },
    {
      id: 2,
      name: "Relatórios Financeiros",
      lastModified: "14 de jun. de 2025 09:15",
      participants: [
        { name: "Ana Costa", role: "Administrador" },
        { name: "Carlos Lima", role: "Editor" },
        { name: "Paula Oliveira", role: "Editor" },
        { name: "Roberto Ferreira", role: "Visualizador" }
      ],
      documentsCount: 8
    },
    {
      id: 3,
      name: "Documentos RH",
      lastModified: "13 de jun. de 2025 16:45",
      participants: [
        { name: "Fernanda Alves", role: "Administrador" },
        { name: "Lucas Pereira", role: "Editor" }
      ],
      documentsCount: 25
    },
    {
      id: 4,
      name: "Projetos Desenvolvimento",
      lastModified: "12 de jun. de 2025 11:20",
      participants: [
        { name: "Ricardo Souza", role: "Administrador" },
        { name: "Juliana Rocha", role: "Editor" },
        { name: "Marcos Dias", role: "Editor" },
        { name: "Patrícia Gomes", role: "Visualizador" },
        { name: "André Silva", role: "Visualizador" }
      ],
      documentsCount: 18
    },
    {
      id: 5,
      name: "Documentos Legais",
      lastModified: "11 de jun. de 2025 13:10",
      participants: [
        { name: "Beatriz Santos", role: "Administrador" },
        { name: "Gabriel Costa", role: "Editor" }
      ],
      documentsCount: 6
    },
    {
      id: 6,
      name: "Apresentações Comerciais",
      lastModified: "10 de jun. de 2025 15:30",
      participants: [
        { name: "Camila Ribeiro", role: "Administrador" },
        { name: "Diego Martins", role: "Editor" },
        { name: "Elena Fernandes", role: "Visualizador" }
      ],
      documentsCount: 15
    }
  ]);

  const getRoleColor = (role) => {
    switch (role) {
      case 'Administrador':
        return '#6D214F';
      case 'Editor':
        return '#2563eb';
      case 'Visualizador':
        return '#16a34a';
      default:
        return '#6b7280';
    }
  };

  return (
    <>
    <Header />
    <Sidebar />
    <div className="folders-page-container">
      <div className="folders-grid-container">
        {folders.map((folder) => (
          <div className="folder-card" key={folder.id}>
            <div className="folder-header">
              <div className="folder-icon">
                <Folder size={48} color="#6D214F" />
              </div>
              <div className="folder-info">
                <h3 className="folder-name">{folder.name}</h3>
                <p className="folder-meta">
                  {folder.documentsCount} documentos • {folder.lastModified}
                </p>
              </div>
            </div>

            <div className="participants-section">
              <div className="participants-header">
                <Users size={16} />
                <h4 className="section-title">Participantes ({folder.participants.length})</h4>
              </div>
              <ul className="participants-list">
                {folder.participants.map((participant, index) => (
                  <li key={index} className="participant-item">
                    <span className="participant-name">{participant.name}</span>
                    <span 
                      className="participant-role"
                      style={{ color: getRoleColor(participant.role) }}
                    >
                      {participant.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
