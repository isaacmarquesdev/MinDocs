import React, { useState, useEffect } from 'react';
import { Calendar, Edit3, ChevronLeft, ChevronRight } from 'lucide-react';

export function DatePicker({ selectedDate, onDateChange }) {
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' ou 'input'
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setInputValue(formatDateForInput(selectedDate));
    }
  }, [selectedDate]);

  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Adicionar dias vazios do início
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Adicionar dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateClick = (date) => {
    onDateChange(date);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      onDateChange(date);
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date && 
           date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    return selectedDate && 
           date &&
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date && date < today;
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString('pt-BR', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="date-picker-container">
      <label className="form-label">
        <Calendar size={16} />
        Data de Envio
      </label>
      
      <div className="date-picker-modes">
        <button
          type="button"
          className={`mode-btn ${viewMode === 'calendar' ? 'active' : ''}`}
          onClick={() => setViewMode('calendar')}
        >
          <Calendar size={16} />
          Calendário
        </button>
        <button
          type="button"
          className={`mode-btn ${viewMode === 'input' ? 'active' : ''}`}
          onClick={() => setViewMode('input')}
        >
          <Edit3 size={16} />
          Digite a Data
        </button>
      </div>

      {viewMode === 'calendar' ? (
        <div className="calendar-widget">
          <div className="calendar-header">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="nav-btn"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="month-year">{monthYear}</span>
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="nav-btn"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="calendar-grid">
            <div className="weekdays">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            
            <div className="days-grid">
              {days.map((date, index) => (
                <button
                  key={index}
                  type="button"
                  className={`day-btn ${
                    !date ? 'empty' : ''
                  } ${
                    isToday(date) ? 'today' : ''
                  } ${
                    isSelected(date) ? 'selected' : ''
                  } ${
                    isPastDate(date) ? 'past' : ''
                  }`}
                  onClick={() => date && !isPastDate(date) && handleDateClick(date)}
                  disabled={!date || isPastDate(date)}
                >
                  {date ? date.getDate() : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="date-input-wrapper">
          <input
            type="date"
            value={inputValue}
            onChange={handleInputChange}
            min={formatDateForInput(new Date())}
            className="date-input"
          />
        </div>
      )}
      
      {selectedDate && (
        <div className="selected-date-display">
          Data selecionada: <strong>{formatDateForDisplay(selectedDate)}</strong>
        </div>
      )}
    </div>
  );
}