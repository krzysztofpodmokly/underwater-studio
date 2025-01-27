import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ProjectsList from "./ProjectsList";
import { createClient } from "@/prismicio";

import { Bounded } from "@/components/Bounded";
import Heading from "@/components/heading/Heading";

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

/**
 * Component for "Projects" Slices.
 */
const Projects = async ({ slice }: ProjectsProps): Promise<JSX.Element> => {
  const client = createClient();
  const projects = await client.getAllByType("project");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="projects my-40"
    >
      <Heading size="lg" as="h2" className="mb-8" center>
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="mb-10 text-center">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      <ProjectsList
        projects={projects}
        fallbackImage={slice.primary.fallback_item_image}
        buttonText={slice.primary.button_text}
      />
    </Bounded>
  );
};

export default Projects;
