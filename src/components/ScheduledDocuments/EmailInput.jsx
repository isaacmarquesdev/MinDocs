import React, { useState } from 'react';
import { Mail, X, Plus } from 'lucide-react';

export function EmailInput({ emails, onEmailsChange }) {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = () => {
    const trimmedEmail = inputValue.trim();
    
    if (!trimmedEmail) return;
    
    if (!validateEmail(trimmedEmail)) {
      setIsValid(false);
      return;
    }
    
    if (emails.includes(trimmedEmail)) {
      setInputValue('');
      return;
    }
    
    onEmailsChange([...emails, trimmedEmail]);
    setInputValue('');
    setIsValid(true);
  };

  const handleRemoveEmail = (emailToRemove) => {
    onEmailsChange(emails.filter(email => email !== emailToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsValid(true);
  };

  return (
    <div className="email-input-container">
      <label className="form-label">
        <Mail size={16} />
        Destinatários
      </label>
      
      <div className="email-input-wrapper">
        <div className="email-tags">
          {emails.map((email, index) => (
            <div key={index} className="email-tag">
              <span>{email}</span>
              <button
                type="button"
                onClick={() => handleRemoveEmail(email)}
                className="email-tag-remove"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="email-input-field">
          <input
            type="email"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Digite o e-mail do destinatário"
            className={`email-input ${!isValid ? 'invalid' : ''}`}
          />
          <button
            type="button"
            onClick={handleAddEmail}
            className="add-email-btn"
            disabled={!inputValue.trim()}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      {!isValid && (
        <span className="error-message">Por favor, insira um e-mail válido</span>
      )}
      
      {emails.length === 0 && (
        <span className="help-text">Adicione pelo menos um destinatário</span>
      )}
    </div>
  );
}