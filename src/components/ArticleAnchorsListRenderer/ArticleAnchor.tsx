import * as React from "react";
import { Component } from '@/types/general';
import { RichTextSection, RichTextSectionProps } from '@/components/SectionsRenderer/section/RichTextSection';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { HeaderSectionProps } from '@/components/SectionsRenderer/section/HeaderSection';

import { stringToHash } from '@/lib/string-to-hash';
import { getHeadings } from '@/lib/get-headings';

export interface TextInlineNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}


interface LinkInlineNode {
  type: 'link';
  url: string;
  children: TextInlineNode[];
}
interface ListItemInlineNode {
  type: 'list-item';
  children: DefaultInlineNode[];
}
type DefaultInlineNode = TextInlineNode | LinkInlineNode;

export interface HeadingBlockNode {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: DefaultInlineNode[];
}

export const ArticleAnchor: Component<RichTextSectionProps> = (props, ref) => {
  const { section } = props;

  getHeadings(props);

  if (!section.content) {
    return null;
  }

  return (
    <div className={`dark:prose-invert max-w-none`}>
      <BlocksRenderer
        content={section.content}
        blocks={{
          heading: (props) => {
            const {children, level} = props;
            switch (level) {
              case 2:
                const headerText = (children as any)!.map((m: any) => m.props.text).join();
                if (headerText) {
                  let hash = stringToHash(headerText);
                  return <h2 id={hash}>{children}</h2>
                }
                return <h2>{children}</h2>
            }
          },
        }}
      />
    </div>
  );
};
