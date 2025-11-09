import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dnd/itemtypes';
import {
  LuHeading1,
  LuPilcrow,
  LuImage,
  LuMousePointerClick,
  LuColumns2,
} from 'react-icons/lu';

const paletteItems = [
  { type: 'hero', label: 'Hero', icon: <LuHeading1 className="w-6 h-6" /> },
  { type: 'text', label: 'Text', icon: <LuPilcrow className="w-6 h-6" /> },
  { type: 'image', label: 'Image', icon: <LuImage className="w-6 h-6" /> },
  {
    type: 'button',
    label: 'Button',
    icon: <LuMousePointerClick className="w-6 h-6" />,
  },
  {
    type: 'twoColumn',
    label: 'Two Column',
    icon: <LuColumns2 className="w-6 h-6" />,
  },
];

export function Palette() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {paletteItems.map((item) => (
        <PaletteItem key={item.type} type={item.type} label={item.label} />
      ))}
    </div>
  );
}

function PaletteItem({ type }) {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.PALETTE_BLOCK,
    item: { type },
  }));

  const item = paletteItems.find((i) => i.type === type);

  return (
    <div
      ref={drag}
      className="flex flex-col items-center justify-center text-center p-3 bg-slate-50 border border-slate-200 rounded-lg shadow-sm cursor-move hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all hover:shadow-md active:shadow-inner"
    >
      {item.icon}
      
    </div>
  );
}
