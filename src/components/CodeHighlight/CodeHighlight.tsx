import { codeToHtml } from 'shiki'
import { useEffect, useState } from 'react';
import { Component } from '@/types/general';

const tsToHtml = (code: string) => {
  return codeToHtml(code, {
    lang: 'tsx',
    themes: {
      light: 'github-light',
      dark: 'night-owl',
    }
  })
}

interface Props {
  code: string;
}

export const CodeHighlight: Component<Props> = ({ code }) => {
  const [tsCode, setTsCode] = useState<string>('');

  const codeHeight = code.split("\n").length * 24;
  useEffect(() => {
    const async = async () => {
      const ts = await tsToHtml(code);
      setTsCode(ts);
    }
    async().catch((e: string) => {
      throw new Error(e);
    })
  }, []);

  return (
    <div style={{ height: codeHeight }} dangerouslySetInnerHTML={{ __html: tsCode }} />
  )
}