import React, { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Palette } from '../componets/palette';
import { Canvas } from '../componets/canvas';

export default function BuilderPage() {
  const [blocks, setBlocks] = useState([]);
  const [selected, setSelected] = useState(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const stored = localStorage.getItem('page-1-builder'); // Load saved layout on startup
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.blocks) {
          setBlocks(parsed.blocks);
        }
      } catch (e) {
        console.warn('Invalid stored layout', e);
      }
    }
  }, []);

  // This effect will run whenever `blocks` changes, saving the layout automatically.
  useEffect(() => {
    // We skip the very first run to avoid overwriting the loaded layout with an empty array.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const schema = {
      id: 'page-1',
      name: 'Sample Page',
      blocks,
    };
    localStorage.setItem('page-1-builder', JSON.stringify(schema));
  }, [blocks]);

  const handleSave = () => {
    const schema = {
      id: 'page-1',
      name: 'Sample Page',
      blocks,
    };
    localStorage.setItem('page-1-builder', JSON.stringify(schema));
    downloadJson(schema);
  };

  const downloadJson = (schema) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(schema, null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'layout.json';
    link.click();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen font-sans bg-slate-200">
        {/* Toolbar */}
        <div className="w-64 bg-white p-4 border-r border-slate-300 flex flex-col shadow-lg z-10">
          <div className="flex-grow overflow-y-auto pr-2 -mr-2 ">
            <h3 className="text-xl font-bold mb-4 text-slate-800">Components</h3>
            <Palette />
          </div>
          <div className="border-t border-slate-200 pt-4 mt-4 flex-shrink-0">
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save and Download Layout
            </button>
          </div>
        </div>

        {/* Main Content: Canvas */}
        <div className="flex-1 p-4 md:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-slate-700">Builder Canvas</h3>
            <Canvas
              blocks={blocks}
              setBlocks={setBlocks}
              onSelectBlock={setSelected}
              selectedId={selected?.id}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}