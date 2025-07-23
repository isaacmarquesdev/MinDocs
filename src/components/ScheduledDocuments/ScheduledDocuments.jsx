import React, { useState, useCallback } from 'react';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { DatePicker } from './DatePicker';
import { EmailInput } from './EmailInput';
import { FileUpload } from './FileUpload';
import { TimePicker } from './TimePicker';
import { Send, Save, RotateCcw } from 'lucide-react';
import './ScheduledForms.css';


export function ScheduledDocuments() {
  const [formData, setFormData] = useState({
    emails: [],
    selectedDate: null,
    selectedTime: '09:00',
    files: [],
    subject: '',
    message: ''
  });

  const [scheduledItems, setScheduledItems] = useState([
    {
      id: 1,
      emails: ['joao@empresa.com', 'maria@empresa.com'],
      date: new Date('2025-07-15'),
      time: '14:00',
      files: [
        { name: 'Contrato_2025.pdf', size: 2048000 },
        { name: 'Anexo_A.docx', size: 1024000 }
      ],
      subject: 'Documentos contratuais - Revisão',
      status: 'agendado',
      createdAt: new Date('2025-07-09')
    },
    {
      id: 2,
      emails: ['ana@cliente.com'],
      date: new Date('2025-07-12'),
      time: '09:30',
      files: [
        { name: 'Relatório_Mensal.pdf', size: 3072000 }
      ],
      subject: 'Relatório mensal - Junho 2025',
      status: 'agendado',
      createdAt: new Date('2025-07-08')
    }
  ]);

  const handleEmailsChange = (emails) => {
    setFormData(prev => ({ ...prev, emails }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, selectedDate: date }));
  };

  const handleTimeChange = useCallback((time) => {
    setFormData(prev => {
      // Só atualiza se o valor realmente mudou
      if (prev.selectedTime !== time) {
        return { ...prev, selectedTime: time };
      }
      return prev;
    });
  }, []);

  const handleFilesChange = (files) => {
    setFormData(prev => ({ ...prev, files }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.emails.length > 0 && 
           formData.selectedDate && 
           formData.files.length > 0 &&
           formData.subject.trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const newScheduledItem = {
      id: Date.now(),
      emails: formData.emails,
      date: formData.selectedDate,
      time: formData.selectedTime,
      files: formData.files.map(f => ({ name: f.name, size: f.size })),
      subject: formData.subject,
      message: formData.message,
      status: 'agendado',
      createdAt: new Date()
    };

    setScheduledItems(prev => [newScheduledItem, ...prev]);
    handleReset();
    alert('Envio agendado com sucesso!');
  };

  const handleReset = () => {
    setFormData({
      emails: [],
      selectedDate: null,
      selectedTime: '09:00',
      files: [],
      subject: '',
      message: ''
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="schedule-form-container">
        <div className="schedule-form">
          <div className="form-header">
            <h2>Agendar Envio de Documentos</h2>
            <p>Configure quando e para quem seus documentos serão enviados automaticamente</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="form-section">
                <EmailInput 
                  emails={formData.emails}
                  onEmailsChange={handleEmailsChange}
                />
              </div>

              <div className="form-section">
                <label className="form-label">
                  Assunto do E-mail
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Digite o assunto do e-mail"
                  className="date-input"
                  required
                />
              </div>

              <div className="form-section">
                <label className="form-label">
                  Mensagem (Opcional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Digite uma mensagem personalizada para acompanhar os documentos"
                  className="date-input"
                  rows="4"
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
              </div>

              <div className="form-section">
                <DatePicker 
                  selectedDate={formData.selectedDate}
                  onDateChange={handleDateChange}
                />
              </div>

              <div className="form-section">
                <TimePicker 
                  selectedTime={formData.selectedTime}
                  onTimeChange={handleTimeChange}
                />
              </div>

              <div className="form-section">
                <FileUpload 
                  files={formData.files}
                  onFilesChange={handleFilesChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary"
              >
                <RotateCcw size={16} />
                Limpar
              </button>
              <button
                type="submit"
                disabled={!isFormValid()}
                className="btn btn-primary"
              >
                <Send size={16} />
                Agendar Envio
              </button>
            </div>
          </form>
        </div>

        {scheduledItems.length > 0 && (
          <div className="schedule-form" style={{ marginTop: '32px' }}>
            <div className="form-header">
              <h2>Envios Agendados</h2>
              <p>Lista de documentos programados para envio automático</p>
            </div>
            
            <div className="form-content">
              {scheduledItems.map((item) => (
                <div key={item.id} className="form-section">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, color: '#6D214F' }}>{item.subject}</h4>
                    <span style={{ 
                      background: '#e8f5e8', 
                      color: '#2e7d32', 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '12px' }}>
                    <div>
                      <strong>Data:</strong> {formatDate(item.date)}
                    </div>
                    <div>
                      <strong>Horário:</strong> {item.time}
                    </div>
                    <div>
                      <strong>Destinatários:</strong> {item.emails.length}
                    </div>
                    <div>
                      <strong>Arquivos:</strong> {item.files.length}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Para:</strong> {item.emails.join(', ')}
                  </div>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Arquivos:</strong>
                    <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                      {item.files.map((file, index) => (
                        <li key={index} style={{ fontSize: '0.9rem', color: '#666' }}>
                          {file.name} ({formatFileSize(file.size)})
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    Agendado em: {formatDate(item.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}