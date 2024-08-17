import * as React from "react";
import { Component } from '@/types/general';

export interface HeaderSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  section: any;
}

export const HeaderSection: Component<HeaderSectionProps> = ({ section }, ref) => {
  if (!section.content) {
    return null;
  }
  return (
    <div className="prose lg:prose-xl dark:prose-invert max-w-none">
      <h2 id={section.hash}>{section.content}</h2>
    </div>
  );
};
