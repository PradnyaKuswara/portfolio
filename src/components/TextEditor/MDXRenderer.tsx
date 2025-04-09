// components/MDXRenderer.tsx
import { useEffect, useState } from 'react';
import { compile } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

interface MDXRendererProps {
  code: string;
}

export default function MDXRenderer({ code }: MDXRendererProps) {
  const [Content, setContent] = useState<React.FC | null>(null);
  console.log('MDXRenderer code:', code);
  useEffect(() => {
    const compileMDX = async () => {
      try {
        const compiled = await compile(code, {
          outputFormat: 'function-body',
          development: false,
        });

        const fn = new Function('React', String(compiled));
        const result = fn(runtime); // <== ini penting!
        setContent(() => result.default);
      } catch (error) {
        console.error('MDX Compile Error:', error);
      }
    };

    compileMDX();
  }, [code]);

  return (
    <div className="prose max-w-none">
      {Content ? <Content /> : <p>Loading content...</p>}
    </div>
  );
}
