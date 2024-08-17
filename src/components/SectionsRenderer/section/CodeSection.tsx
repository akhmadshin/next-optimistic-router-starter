import * as React from "react";
import { CodeHighlight } from '@/components/CodeHighlight/CodeHighlight';
import type { Component } from '@/types/general';
import { RichText } from '@/components/RichText';
import { TextInlineNode } from '@/components/ArticleAnchorsListRenderer/ArticleAnchor';

export interface RichTextSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  section: any;
}

export const CodeSection: Component<RichTextSectionProps> = ({ section }) => {
  if (!section.content) {
    return null;
  }

  const description = section.description!;
  const hasDescription = description && description.length > 1 && description[0].children?.length > 1 || (description[0].children[0] as TextInlineNode).text !== '';

  return (
    <div className="flex flex-col space-y-4">
      {hasDescription && <RichText content={description} />}
      <CodeHighlight code={section.content} />
    </div>
  );
};
