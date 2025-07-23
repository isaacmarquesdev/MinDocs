import React, { useState, useEffect } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';

export function TimePicker({ selectedTime, onTimeChange }) {
  const [hours, setHours] = useState(9);
  const [minutes, setMinutes] = useState(0);
  const [inputMode, setInputMode] = useState(false);
  const [timeInput, setTimeInput] = useState('09:00');

  useEffect(() => {
    if (selectedTime) {
      const [h, m] = selectedTime.split(':').map(Number);
      setHours(h);
      setMinutes(m);
      setTimeInput(selectedTime);
    }
  }, [selectedTime]);

  useEffect(() => {
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    onTimeChange(formattedTime);
    setTimeInput(formattedTime);
  }, [hours, minutes, onTimeChange]);

  const adjustHours = (increment) => {
    setHours(prev => {
      let newHours = prev + increment;
      if (newHours < 0) newHours = 23;
      if (newHours > 23) newHours = 0;
      return newHours;
    });
  };

  const adjustMinutes = (increment) => {
    setMinutes(prev => {
      let newMinutes = prev + increment;
      if (newMinutes < 0) {
        newMinutes = 45;
        adjustHours(-1);
      }
      if (newMinutes > 59) {
        newMinutes = 0;
        adjustHours(1);
      }
      return Math.floor(newMinutes / 15) * 15; // Incrementos de 15 minutos
    });
  };

  const handleTimeInputChange = (e) => {
    const value = e.target.value;
    setTimeInput(value);
    
    if (value.match(/^\d{2}:\d{2}$/)) {
      const [h, m] = value.split(':').map(Number);
      if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        setHours(h);
        setMinutes(m);
      }
    }
  };

  const getQuickTimeOptions = () => {
    return [
      { label: 'Manhã (09:00)', value: '09:00' },
      { label: 'Meio-dia (12:00)', value: '12:00' },
      { label: 'Tarde (14:00)', value: '14:00' },
      { label: 'Final da tarde (17:00)', value: '17:00' },
      { label: 'Noite (19:00)', value: '19:00' }
    ];
  };

  const handleQuickTime = (time) => {
    const [h, m] = time.split(':').map(Number);
    setHours(h);
    setMinutes(m);
  };

  const formatTime = (h, m) => {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <div className="time-picker-container">
      <label className="form-label">
        <Clock size={16} />
        Horário de Envio
      </label>
      
      <div className="time-picker-modes">
        <button
          type="button"
          className={`mode-btn ${!inputMode ? 'active' : ''}`}
          onClick={() => setInputMode(false)}
        >
          <Clock size={16} />
          Seletor
        </button>
        <button
          type="button"
          className={`mode-btn ${inputMode ? 'active' : ''}`}
          onClick={() => setInputMode(true)}
        >
          Digite
        </button>
      </div>

      {!inputMode ? (
        <div className="time-selector">
          <div className="time-controls">
            <div className="time-unit">
              <button
                type="button"
                onClick={() => adjustHours(1)}
                className="time-btn"
              >
                <ChevronUp size={16} />
              </button>
              <div className="time-display">
                {hours.toString().padStart(2, '0')}
              </div>
              <button
                type="button"
                onClick={() => adjustHours(-1)}
                className="time-btn"
              >
                <ChevronDown size={16} />
              </button>
              <span className="time-label">Horas</span>
            </div>
            
            <div className="time-separator">:</div>
            
            <div className="time-unit">
              <button
                type="button"
                onClick={() => adjustMinutes(15)}
                className="time-btn"
              >
                <ChevronUp size={16} />
              </button>
              <div className="time-display">
                {minutes.toString().padStart(2, '0')}
              </div>
              <button
                type="button"
                onClick={() => adjustMinutes(-15)}
                className="time-btn"
              >
                <ChevronDown size={16} />
              </button>
              <span className="time-label">Minutos</span>
            </div>
          </div>
          
          <div className="quick-times">
            <span className="quick-times-label">Horários sugeridos:</span>
            <div className="quick-time-buttons">
              {getQuickTimeOptions().map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleQuickTime(option.value)}
                  className={`quick-time-btn ${
                    formatTime(hours, minutes) === option.value ? 'active' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="time-input-wrapper">
          <input
            type="time"
            value={timeInput}
            onChange={handleTimeInputChange}
            className="time-input"
          />
        </div>
      )}
      
      <div className="selected-time-display">
        Horário selecionado: <strong>{formatTime(hours, minutes)}</strong>
      </div>
    </div>
  );
}