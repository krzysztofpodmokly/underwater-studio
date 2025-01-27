import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

import { Bounded } from "@/components/Bounded";
import Heading from "@/components/heading/Heading";

type ArticleProps = { page: Content.ProjectDocument };

const Article = ({ page }: ArticleProps) => {
  return (
    <Bounded as="article" className="my-8 md:my-32">
      <div className="rounded-2xl border-2 border-[#093a3e] bg-[#093a3e]/20 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1" size="lg">
          {page.data.title}
        </Heading>
        <div className="text-md flex gap-4 font-bold text-[#fe9000] md:text-xl">
          {page.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
};

export default Article;
