import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../dnd/itemtypes';

export function CanvasBlock({
  block,
  index,
  moveBlock,
  onClick,
  onChangeProps,
  onRemove,
  selected,
}) {
  const [, drag] = useDrag({
    type: ItemTypes.CANVAS_BLOCK,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CANVAS_BLOCK,
    hover: (item) => {
      if (item.index !== index) {
        moveBlock(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`mb-2 rounded-lg transition-all group ${
        selected ? 'ring-2 ring-blue-500 shadow-lg' : 'ring-2 ring-transparent hover:ring-blue-300'
      }`}
      onClick={onClick}
    >
      <div className="bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500 flex justify-between items-center rounded-t-md cursor-grab active:cursor-grabbing">
        <span className="capitalize ">{block.type}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(block.id);
          }}
          className="text-slate-400 hover:text-red-600 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
      <div className="p-4 bg-white rounded-b-lg">
        {renderPreview(block, (patch) => onChangeProps(block.id, patch))}
      </div>
    </div>
  );
}

function renderPreview(block, update) {
  const inputClass =
    'w-full p-2 border-slate-200 rounded-md focus:ring-blue-500 focus:border-blue-500 my-1 text-sm';
  const labelClass = 'text-xs font-bold text-slate-500 uppercase tracking-wider';

  switch (block.type) {
    case 'hero':
      return (
        <div
          style={{
            padding: 16,
            background: block.props.background || '#1f2937',
            color: '#fff',
          }}
        >
          <label className={labelClass} style={{ color: '#a7b3c9' }}>Title</label>
          <input
            value={block.props.title || ''}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="Hero title"
            className={`${inputClass} bg-slate-800/50 text-white placeholder-slate-400 border-slate-600`}
          />
          <label className={labelClass} style={{ color: '#a7b3c9' }}>Subtitle</label>
          <input
            value={block.props.subtitle || ''}
            onChange={(e) => update({ subtitle: e.target.value })}
            placeholder="Subtitle"
            className={`${inputClass} bg-slate-800/50 text-white placeholder-slate-400 border-slate-600`}
          />
        </div>
      );

    case 'text':
      return (
        <textarea
          className={inputClass}
          rows="3"
          value={block.props.text || ''}
          onChange={(e) => update({ text: e.target.value })}
        />
      );

    case 'image':
      return (
        <div>
          <label className={labelClass}>Image URL</label>
          <input
            value={block.props.url || ''}
            onChange={(e) => update({ url: e.target.value })}
            placeholder="Image URL"
            className={inputClass}
          />
        </div>
      );

    case 'button':
      return (
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Label</label>
            <input
              value={block.props.label || ''}
              onChange={(e) => update({ label: e.target.value })}
              placeholder="Button label"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Link (href)</label>
          <input
            value={block.props.href || ''}
            onChange={(e) => update({ href: e.target.value })}
            placeholder="Button link"
            className={inputClass}
          />
          </div>
        </div>
      );

    case 'twoColumn':
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}
        >
          {(block.children || []).map((child, i) => (
            <textarea
              key={child.id}
              className={inputClass}
              value={child.props.text || ''}
              onChange={(e) => {
                const children = [...(block.children || [])];
                children[i] = {
                  ...child,
                  props: {
                    ...child.props,
                    text: e.target.value,
                  },
                };
                update({ children });
              }}
            />
          ))}
        </div>
      );

    default:
      return <div>Unknown block type</div>;
  }
}
