import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import React from 'react';

interface Props {
  content: BlocksContent;
  className?: string;
}

export const RichText: React.FC<Props> = ({ content, className = 'prose lg:prose-xl' }) => {
  if (!content) {
    return;
  }
  return (
    <div className={`${className} dark:prose-invert max-w-none`}>
      <BlocksRenderer
        content={content}
      />
    </div>
  )
}