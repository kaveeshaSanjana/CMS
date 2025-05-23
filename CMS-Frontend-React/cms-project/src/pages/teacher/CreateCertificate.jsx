import { useState, useRef, useEffect } from 'react';

export default function CertificateEditor() {
  const [background, setBackground] = useState(null);
  const [elements, setElements] = useState([]);
  const [currentElement, setCurrentElement] = useState({
    type: 'text',
    content: '',
    x: 50,
    y: 50,
    fontSize: 24,
    fontFamily: 'Arial',
    color: '#000000',
    isBold: false,
    isItalic: false
  });
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [previewMode, setPreviewMode] = useState(false);
  
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Handle background image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setBackground({
            src: event.target.result,
            width: img.width,
            height: img.height
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new element
  const addElement = () => {
    if (currentElement.content.trim()) {
      setElements([...elements, { ...currentElement, id: Date.now() }]);
      setCurrentElement({
        ...currentElement,
        content: '',
        x: 50,
        y: 50
      });
    }
  };

  // Handle element input change
  const handleElementChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentElement({
      ...currentElement,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Start dragging an element
  const startDrag = (index, e) => {
    if (previewMode) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDragging(true);
    setDraggedIndex(index);
    setStartPos({ x, y });
  };

  // Dragging an element
  const handleDrag = (e) => {
    if (!isDragging || draggedIndex === null) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const dx = x - startPos.x;
    const dy = y - startPos.y;
    
    const newElements = [...elements];
    newElements[draggedIndex] = {
      ...newElements[draggedIndex],
      x: newElements[draggedIndex].x + dx,
      y: newElements[draggedIndex].y + dy
    };
    
    setElements(newElements);
    setStartPos({ x, y });
  };

  // End dragging
  const endDrag = () => {
    setIsDragging(false);
    setDraggedIndex(null);
  };

  // Remove an element
  const removeElement = (index) => {
    const newElements = [...elements];
    newElements.splice(index, 1);
    setElements(newElements);
  };

  // Generate the certificate
  const generateCertificate = () => {
    const canvas = canvasRef.current;
    
    // Use toDataURL to get the image data
    const imageData = canvas.toDataURL('image/png');
    
    // Create a link to download the image
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'certificate.png';
    link.click();
  };

  // Draw the certificate on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background if available
    if (background) {
      canvas.width = background.width;
      canvas.height = background.height;
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Draw elements
        elements.forEach(element => {
          ctx.font = `${element.isItalic ? 'italic ' : ''}${element.isBold ? 'bold ' : ''}${element.fontSize}px ${element.fontFamily}`;
          ctx.fillStyle = element.color;
          ctx.fillText(element.content, element.x, element.y);
        });
      };
      img.src = background.src;
    } else {
      // Set default canvas size
      canvas.width = 800;
      canvas.height = 600;
      
      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw elements
      elements.forEach(element => {
        ctx.font = `${element.isItalic ? 'italic ' : ''}${element.isBold ? 'bold ' : ''}${element.fontSize}px ${element.fontFamily}`;
        ctx.fillStyle = element.color;
        ctx.fillText(element.content, element.x, element.y);
      });
    }
  }, [background, elements, previewMode]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="bg-gold text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">Certificate Editor</h1>
        </header>

        {/* Custom CSS for gold colors */}
        <style jsx>{`
          .bg-gold {
            background-color: #D4AF37;
          }
          .text-gold {
            color: #D4AF37;
          }
          .border-gold {
            border-color: #D4AF37;
          }
          .hover-bg-gold:hover {
            background-color: #B8860B;
          }
        `}</style>

        <div className="bg-white rounded-b-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Controls */}
            <div className={`w-full lg:w-1/3 ${previewMode ? 'hidden' : 'block'}`}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gold">Background</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden" 
                    id="backgroundUpload" 
                  />
                  <label 
                    htmlFor="backgroundUpload" 
                    className="cursor-pointer bg-gold text-white px-4 py-2 rounded-md hover-bg-gold inline-block"
                  >
                    Upload Certificate Background
                  </label>
                  {background && <p className="mt-2 text-sm text-gray-600">Image uploaded: {background.width}x{background.height}px</p>}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gold">Add Elements</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Content</label>
                    <input
                      type="text"
                      name="content"
                      value={currentElement.content}
                      onChange={handleElementChange}
                      placeholder="Enter text"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-gray-700 mb-2">X Position</label>
                      <input
                        type="number"
                        name="x"
                        value={currentElement.x}
                        onChange={handleElementChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 mb-2">Y Position</label>
                      <input
                        type="number"
                        name="y"
                        value={currentElement.y}
                        onChange={handleElementChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-gray-700 mb-2">Font Size</label>
                      <input
                        type="number"
                        name="fontSize"
                        value={currentElement.fontSize}
                        onChange={handleElementChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 mb-2">Font</label>
                      <select
                        name="fontFamily"
                        value={currentElement.fontFamily}
                        onChange={handleElementChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Color</label>
                    <input
                      type="color"
                      name="color"
                      value={currentElement.color}
                      onChange={handleElementChange}
                      className="w-full p-1 border border-gray-300 rounded h-10"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isBold"
                        name="isBold"
                        checked={currentElement.isBold}
                        onChange={handleElementChange}
                        className="mr-2"
                      />
                      <label htmlFor="isBold">Bold</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isItalic"
                        name="isItalic"
                        checked={currentElement.isItalic}
                        onChange={handleElementChange}
                        className="mr-2"
                      />
                      <label htmlFor="isItalic">Italic</label>
                    </div>
                  </div>
                  
                  <button
                    onClick={addElement}
                    className="w-full bg-gold text-white py-2 rounded hover-bg-gold"
                  >
                    Add Element
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right side - Canvas & Preview */}
            <div className={`w-full ${previewMode ? 'lg:w-full' : 'lg:w-2/3'}`}>
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold text-gold">Certificate Preview</h2>
                <div className="space-x-2">
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {previewMode ? 'Edit Mode' : 'Preview Mode'}
                  </button>
                  <button
                    onClick={generateCertificate}
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Generate Certificate
                  </button>
                </div>
              </div>
              
              <div 
                ref={containerRef}
                className="border-2 border-gray-300 rounded-lg overflow-auto bg-gray-200 flex items-center justify-center"
                style={{ height: '500px' }}
                onMouseMove={handleDrag}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
              >
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-full bg-white shadow-md"
                ></canvas>
              </div>
              
              {!previewMode && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4 text-gold">Added Elements</h2>
                  {elements.length > 0 ? (
                    <div className="space-y-2">
                      {elements.map((element, index) => (
                        <div 
                          key={element.id} 
                          className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200"
                          onMouseDown={(e) => startDrag(index, e)}
                          style={{ cursor: previewMode ? 'default' : 'move' }}
                        >
                          <div>
                            <span className="font-medium">{element.content}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              (x: {Math.round(element.x)}, y: {Math.round(element.y)})
                            </span>
                          </div>
                          {!previewMode && (
                            <button
                              onClick={() => removeElement(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No elements added yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}