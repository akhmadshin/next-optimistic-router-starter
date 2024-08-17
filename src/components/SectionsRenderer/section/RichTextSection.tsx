import * as React from "react";
import { RichText } from '@/components/RichText';
import { Component } from '@/types/general';
import { TextInlineNode } from '@/components/ArticleAnchorsListRenderer/ArticleAnchor';

export type RichTextSection = any;

export interface RichTextSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  section: RichTextSection[number];
}

export const RichTextSection: Component<RichTextSectionProps> = ({ section }, ref) => {
  const { content } = section;
  if (!content) {
    return null;
  }
  const noContent = content.length === 0 && content[0].children.length === 0 && (content[0].children[0] as TextInlineNode).text === '';

  if (noContent) {
    return null;
  }

  return (
    <RichText
      content={section.content}
      {...ref}


    />
  );
};
