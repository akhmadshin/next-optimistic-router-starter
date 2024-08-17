import { Component } from '@/types/general';
import { RichTextSection } from './section/RichTextSection';
import { YouTubeSection } from '@/components/SectionsRenderer/section/YouTubeSection';
import { ImageSection } from '@/components/SectionsRenderer/section/ImageSection';
import { CodeSection } from '@/components/SectionsRenderer/section/CodeSection';

export type Sections = any

export type Section = Sections[number];

interface Props {
  sections?: Sections
}
export const SectionsRenderer: Component<Props> = ({ sections }) => {
  const renderer = (section: Section, index: number) => {
    switch (section.__component) {
      case "sections.you-tube":
        return <YouTubeSection key={index} section={section} />;
      case "sections.rich-text":
        return <RichTextSection key={index} section={section} />;
      case "sections.image":
        return <ImageSection key={index} section={section} />;
      case "sections.code":
        return <CodeSection key={index} section={section} />;
      default:
        return null;
    }
  }

  if (!sections) {
    return null;
  }
  return (
    <div className="max-w-screen-lg space-y-8 md:space-y-16 mt-8 md:mt-16">
      {Array.from(sections).map((section: Section, index) => renderer(section, index))}
    </div>
  )

}