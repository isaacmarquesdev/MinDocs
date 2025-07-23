import React, { useState, useRef } from 'react';
import { Upload, File, X, FileText, Image, Archive } from 'lucide-react';

export function FileUpload({ files, onFilesChange }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = {
    'application/pdf': { icon: FileText, label: 'PDF' },
    'application/msword': { icon: FileText, label: 'DOC' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: FileText, label: 'DOCX' },
    'application/vnd.ms-excel': { icon: FileText, label: 'XLS' },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { icon: FileText, label: 'XLSX' },
    'image/jpeg': { icon: Image, label: 'JPG' },
    'image/png': { icon: Image, label: 'PNG' },
    'application/zip': { icon: Archive, label: 'ZIP' },
    'text/plain': { icon: FileText, label: 'TXT' }
  };

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const getFileIcon = (type) => {
    const fileType = allowedTypes[type];
    if (fileType) {
      return fileType.icon;
    }
    return File;
  };

  const getFileLabel = (type) => {
    const fileType = allowedTypes[type];
    return fileType ? fileType.label : 'Arquivo';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file) => {
    if (!allowedTypes[file.type]) {
      return `Tipo de arquivo não permitido: ${file.type}`;
    }
    if (file.size > maxFileSize) {
      return `Arquivo muito grande. Máximo permitido: ${formatFileSize(maxFileSize)}`;
    }
    return null;
  };

  const handleFiles = (fileList) => {
    const newFiles = [];
    const errors = [];

    Array.from(fileList).forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        // Verificar se o arquivo já foi adicionado
        const isDuplicate = files.some(existingFile => 
          existingFile.name === file.name && existingFile.size === file.size
        );
        
        if (!isDuplicate) {
          newFiles.push({
            file,
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type
          });
        }
      }
    });

    if (errors.length > 0) {
      alert('Erros encontrados:\n' + errors.join('\n'));
    }

    if (newFiles.length > 0) {
      onFilesChange([...files, ...newFiles]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId) => {
    onFilesChange(files.filter(file => file.id !== fileId));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-upload-container">
      <label className="form-label">
        <Upload size={16} />
        Documentos para Envio
      </label>
      
      <div
        className={`file-drop-zone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div className="drop-zone-content">
          <Upload size={48} className="upload-icon" />
          <div className="drop-zone-text">
            <p className="primary-text">
              Clique para selecionar arquivos ou arraste e solte aqui
            </p>
            <p className="secondary-text">
              PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, ZIP, TXT (máx. 10MB cada)
            </p>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.txt"
          onChange={handleFileInput}
          className="file-input-hidden"
        />
      </div>
      
      {files.length > 0 && (
        <div className="files-list">
          <h4 className="files-list-title">
            Arquivos selecionados ({files.length})
          </h4>
          
          {files.map((fileItem) => {
            const IconComponent = getFileIcon(fileItem.type);
            return (
              <div key={fileItem.id} className="file-item">
                <div className="file-info">
                  <IconComponent size={20} className="file-icon" />
                  <div className="file-details">
                    <span className="file-name">{fileItem.name}</span>
                    <span className="file-meta">
                      {getFileLabel(fileItem.type)} • {formatFileSize(fileItem.size)}
                    </span>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => removeFile(fileItem.id)}
                  className="remove-file-btn"
                  title="Remover arquivo"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
          
          <div className="files-summary">
            Total: {formatFileSize(files.reduce((total, file) => total + file.size, 0))}
          </div>
        </div>
      )}
      
      {files.length === 0 && (
        <p className="help-text">Nenhum arquivo selecionado</p>
      )}
    </div>
  );
}