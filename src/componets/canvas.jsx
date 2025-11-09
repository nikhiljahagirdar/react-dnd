import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { ItemTypes } from '../dnd/itemtypes';
import { nanoid } from 'nanoid';
import { CanvasBlock } from './canvasBlock';

export function Canvas({
  blocks,
  setBlocks,
  onSelectBlock,
  selectedId,
}) {
  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.PALETTE_BLOCK],
    drop: (item) => {
      const newBlock = createBlockFromType(item.type);
      setBlocks([...blocks, newBlock]);
      onSelectBlock(newBlock);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const moveBlock = (from, to) => {
    const updated = [...blocks];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setBlocks(updated);
  };

  const updateBlock = (id, patch) => {
    setBlocks(
      blocks.map((b) =>
        b.id === id ? { ...b, props: { ...b.props, ...patch } } : b
      )
    );
  };

  const removeBlock = (id) => {
    const filtered = blocks.filter((b) => b.id !== id);
    setBlocks(filtered);
    if (selectedId === id) onSelectBlock(null);
  };

  return (
    <div
      ref={drop}
      className={`bg-white p-4 min-h-[800px] rounded-lg shadow-xl border-2 transition-colors ${
        isOver ? 'border-blue-500 bg-blue-50/50' : 'border-white'
      }`}
    >
      {blocks.length === 0 && (
        <div className="flex items-center justify-center h-full text-slate-400 border-2 border-dashed border-slate-300 rounded-lg">
          Drop components here
        </div>
      )}

      {blocks.map((block, index) => (
        <CanvasBlock
          key={block.id}
          index={index}
          block={block}
          moveBlock={moveBlock}
          onClick={() => onSelectBlock(block)}
          onChangeProps={updateBlock}
          onRemove={removeBlock}
          selected={block.id === selectedId}
        />
      ))}
    </div>
  );
}

function createBlockFromType(type) {
  const id = `${type}-${nanoid(6)}`;
  switch (type) {
    case 'hero':
      return {
        id,
        type,
        props: {
          title: 'Hero Title',
          subtitle: 'Subtitle goes here',
          background: '#111827',
        },
      };
    case 'text':
      return {
        id,
        type,
        props: { text: 'Sample text block' },
      };
    case 'image':
      return {
        id,
        type,
        props: {
          url: 'https://via.placeholder.com/600x300',
          alt: 'Image',
        },
      };
    case 'button':
      return {
        id,
        type,
        props: { label: 'Click me', href: '#' },
      };
    case 'twoColumn':
      return {
        id,
        type,
        props: {},
        children: [
          {
            id: `col1-${nanoid(4)}`,
            type: 'text',
            props: { text: 'Left column' },
          },
          {
            id: `col2-${nanoid(4)}`,
            type: 'text',
            props: { text: 'Right column' },
          },
        ],
      };
    default:
      return {
        id,
        type: 'text',
        props: { text: 'Unknown component' },
      };
  }
}
