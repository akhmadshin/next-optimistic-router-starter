import * as React from "react";
import { forwardRef } from 'react';
import { Image } from '@/components/Image';
import { ApiResponseMedia } from '@/types/api';

export interface RichTextSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  section: any;
}

export const ImageSection = forwardRef<HTMLImageElement, RichTextSectionProps>(
  ({ section }, ref) => {
    if (!section.image) {
      return null;
    }
    const coverAttributes = (section.image as ApiResponseMedia).data.attributes;

    return (
      <div className="">
        <Image
          thumbhash={coverAttributes.thumbhash}
          ref={ref}
          src={`/${coverAttributes.name}`}
          alt={coverAttributes.alternativeText}
          width={coverAttributes.width}
          height={coverAttributes.height}
        />
        {/*<BlocksRenderer content={section.content} {...ref} />*/}
      </div>
    );
  },
);

ImageSection.displayName = "ImageSection";
