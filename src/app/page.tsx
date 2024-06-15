"use client";
import "./globals.css";
import React, { useState, ChangeEvent, FormEvent } from 'react';


  const App = () => {
    const [showSQLExtras, setShowSQLExtras] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [checkedBoxes, setCheckedBoxes] = useState<string[]>([]);

    const handleSQLChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setShowSQLExtras(checked);
      handleCheckboxChange(event);
    };

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const isAnyChecked = Array.from(checkboxes).some(checkbox => (checkbox as HTMLInputElement).checked);
      if (!isAnyChecked) {
        setErrorMessage('At least one checkbox must be checked');
      } else {
        setErrorMessage('');
      }
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { id, checked } = event.target;
      setCheckedBoxes(prev => {
        if (checked) {
          return [...prev, id];
        } else {
          return prev.filter(item => item !== id);
        }
      });
    };

    const getColorClass = (language: string) => {
      const colorOrder = ['typescript', 'python', 'HTML', 'CSS', 'SQL'];
      const index = colorOrder.indexOf(language);
      return `color-${index + 1}`;
    };
  
  
    const languages = ['typescript', 'python', 'HTML', 'CSS', 'SQL'];
  const checkedLanguages = languages.filter(lang => checkedBoxes.includes(lang));
  const chevronWidthPercent =
    checkedLanguages.length > 0 ? 100 / checkedLanguages.length : 0;
    
      return (
        <form onSubmit={handleSubmit}>
          <div className="checkbox-container">
            <div>
              <input
                type="checkbox"
                id="typescript"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="typescript">TypeScript</label>
            </div>
            <div>
              <input type="checkbox" id="python" onChange={handleCheckboxChange} />
              <label htmlFor="python">Python</label>
            </div>
            <div>
              <input type="checkbox" id="HTML" onChange={handleCheckboxChange} />
              <label htmlFor="HTML">HTML</label>
            </div>
            <div>
              <input type="checkbox" id="CSS" onChange={handleCheckboxChange} />
              <label htmlFor="CSS">CSS</label>
            </div>
            <div>
              <input type="checkbox" id="SQL" onChange={handleSQLChange} />
              <label htmlFor="SQL">SQL</label>
            </div>
            {showSQLExtras && (
              <>
                <div className="extra-sql-checkbox">
                  <input
                    type="checkbox"
                    id="mysql"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="mysql">MySQL</label>
                </div>
                <div className="extra-sql-checkbox">
                  <input
                    type="checkbox"
                    id="postgresql"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="postgresql">PostgreSQL</label>
                </div>
              </>
            )}
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="chevron-container">
        {checkedLanguages.map((lang, index) => (
          <div
            key={lang}
            className={`chevron ${getColorClass(lang)}`}
            style={{ width: `${chevronWidthPercent}%` }}
          />
        ))}
      </div>
    </form>
  );
};

export default App;