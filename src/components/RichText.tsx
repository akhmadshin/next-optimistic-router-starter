import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import React from 'react';
import { TextInlineNode } from '@/types/strapi-blocks';

interface Props {
  content: BlocksContent;
  className?: string;
}

export const RichText: React.FC<Props> = ({ content, className = 'prose lg:prose-xl' }) => {
  const noContent = !content || content.length === 0 && content[0].children.length === 0 && (content[0].children[0] as TextInlineNode).text === '';

  if (noContent) {
    return null;
  }
  return (
    <div className={`${className} dark:prose-invert max-w-none`}>
      <BlocksRenderer
        content={content}
      />
    </div>
  )
}