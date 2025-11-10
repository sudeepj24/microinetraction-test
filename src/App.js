import React, { useState } from 'react';
import MicroInteraction from './MicroInteraction';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  return (
    <div className="App">
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Micro Interaction Mobile Test</h1>
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
          Test the mobile view functionality. Scroll down to see auto-collapse behavior.
        </p>
        
        <div style={{ marginBottom: '40px' }}>
          <MicroInteraction selectedTemplate={selectedTemplate} />
        </div>
        
        {/* Add some content to enable scrolling */}
        <div style={{ height: '200vh', padding: '20px', backgroundColor: '#fff', marginTop: '20px' }}>
          <h2>Scroll Content</h2>
          <p>Scroll down to test the auto-collapse functionality of the micro interaction banner.</p>
          <div style={{ height: '100px', backgroundColor: '#e0e0e0', margin: '20px 0' }}></div>
          <div style={{ height: '100px', backgroundColor: '#d0d0d0', margin: '20px 0' }}></div>
          <div style={{ height: '100px', backgroundColor: '#c0c0c0', margin: '20px 0' }}></div>
          <div style={{ height: '100px', backgroundColor: '#b0b0b0', margin: '20px 0' }}></div>
        </div>
        
        {/* Footer with template selector */}
        <div style={{ 
          position: 'fixed', 
          bottom: '0', 
          left: '0', 
          right: '0', 
          backgroundColor: '#fff', 
          padding: '15px', 
          borderTop: '1px solid #ccc',
          textAlign: 'center',
          zIndex: 1000
        }}>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Template:</label>
          <select 
            value={selectedTemplate} 
            onChange={(e) => setSelectedTemplate(e.target.value)}
            style={{ padding: '5px 10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="template1">Template 1</option>
            <option value="template2">Template 2</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;