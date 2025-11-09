import React from 'react';

export function PageRenderer({ page }) {
  if (!page) return null;

  return (
    <div className="space-y-4">
      {page.blocks.map((block) => (
        <div key={block.id}>{renderBlock(block)}</div>
      ))}
    </div>
  );
}

function renderBlock(block) {
  switch (block.type) {
    case 'hero':
      return (
        <section
          className="p-8 text-white text-center"
          style={{
            background: block.props.background || '#111827',
          }}
        >
          <h1 className="text-4xl font-bold mb-2">{block.props.title}</h1>
          <p className="text-lg">{block.props.subtitle}</p>
        </section>
      );

    case 'text':
      // Using a div with whitespace preservation for better multiline rendering
      return <div className="prose max-w-none whitespace-pre-wrap">{block.props.text}</div>;

    case 'image':
      return (
        <img
          src={block.props.url}
          alt={block.props.alt || ''}
          style={{ maxWidth: '100%' }}
        />
      );

    case 'button':
      return (
        <a
          href={block.props.href || '#'}
          className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          {block.props.label || 'Button'}
        </a>
      );

    case 'twoColumn':
      return (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {(block.children || []).map((child) => (
            <div key={child.id}>{renderBlock(child)}</div>
          ))}
        </div>
      );

    default:
      return <div>Unknown block</div>;
  }
}
