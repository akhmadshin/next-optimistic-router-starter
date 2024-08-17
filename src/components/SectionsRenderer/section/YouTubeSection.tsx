import * as React from "react";
import { YouTubeEmbed } from '@/components/YouTubeEmbed';
import { Component } from '@/types/general';

export interface RichTextSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  section: any;
}

const getYoutubeIdFromUrl = (url: string) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  }
}
interface YoutubeSectionContent {
  title: string;
  url: string;
  thumbnail: string;
}

export const YouTubeSection: Component<RichTextSectionProps> = ({ section }) => {
  const content = JSON.parse(section.content ?? 'undefined') as YoutubeSectionContent;

  const youTubeId = getYoutubeIdFromUrl(content.url);

  if (!youTubeId) {
    return null;
  }
  return (
    <div>
      <YouTubeEmbed
        id={youTubeId}
        thumbnail={content.thumbnail}
        title={content.title}
      />
    </div>
  );
};
