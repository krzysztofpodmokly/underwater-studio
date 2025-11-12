"use client";

import { asImageSrc, Content, isFilled } from "@prismicio/client";
import gsap from "gsap";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  projects: Content.ProjectDocument[];
  fallbackImage: Content.ProjectsSlice["primary"]["fallback_item_image"];
  buttonText: Content.ProjectsSlice["primary"]["button_text"];
};

const ProjectsList = ({
  projects,
  fallbackImage,
  buttonText = "View",
}: Props) => {
  const ref = useRef(null);
  const revealRef = useRef(null);
  const [currentProject, setCurrentProject] = useState<null | number>(null);
  const projectsRef = useRef<Array<HTMLLIElement | null>>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };

      // Calculate speed and direction
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      if (currentProject !== null) {
        if (!revealRef.current) return;
        // Prevent image from going of the screen
        const maxY = window.scrollY + window.innerHeight - 350;
        const maxX = window.innerWidth - 250;

        gsap.to(revealRef.current, {
          x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
          y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
          rotation: speed * (mousePos.x > lastMousePos.current.x ? 1.3 : -1.3),
          ease: "back.out(2)",
          duration: 2.4,
          opacity: 1,
        });

        lastMousePos.current = mousePos;
      }
    },
    [currentProject],
  );

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        projectsRef.current.forEach((project) => {
          gsap.fromTo(
            project,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1.3,
              ease: "elastic.out(1,0.3)",
              scrollTrigger: {
                trigger: project,
                start: `top bottom${context?.conditions?.isDesktop ? "-" : "+"}=150px`,
                end: "bottom center",
                toggleActions: "play none none none",
              },
            },
          );
        });
      },
    );

    return () => mm.revert();
  });

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [currentProject]);

  const projectImages = projects.map((project) => {
    const image = isFilled.image(project.data.hover_image)
      ? project.data.hover_image
      : fallbackImage;

    return asImageSrc(image, {
      fit: "crop",
      w: 220,
      h: 320,
      exp: -10,
    });
  });

  useEffect(() => {
    projectImages.forEach((image) => {
      if (!image) return;
      const img = new Image();
      img.src = image;
    });
  }, [projectImages]);

  const onMouseEnter = (index: number) => {
    setCurrentProject(index);
  };

  const onMouseLeave = () => {
    setCurrentProject(null);
  };

  const desiredOrder = [
    "flat-configurator",
    "bardzo-milo",
    "suburbia-skate",
    "feather",
  ];

  const sortedProjects = projects.sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.uid);
    const indexB = desiredOrder.indexOf(b.uid);
    return indexA - indexB;
  });

  return (
    <div className="z-[100]" ref={ref}>
      <ul
        className="grid border-b border-slate-100/20"
        onMouseLeave={onMouseLeave}
      >
        {sortedProjects.map(({ uid, data, tags }, index) => (
          <React.Fragment key={uid}>
            {isFilled.keyText(data.title) && (
              <li
                className="list-item opacity-0"
                onMouseEnter={() => onMouseEnter(index)}
                ref={(el) => {
                  projectsRef.current[index] = el;
                }}
              >
                <Link
                  href={`/project/${uid}`}
                  className="flex flex-row justify-between border-t border-slate-100/20 py-10"
                  aria-label={data.title}
                >
                  <div className="flex flex-col">
                    <span className="text-xl font-bold md:text-3xl">
                      {data.title}
                    </span>
                    <div className="flex flex-wrap gap-3 text-sm font-bold text-[#fe9000] md:text-lg">
                      {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text:sm ml-auto flex items-center gap-2 font-medium md:ml-0 md:text-xl">
                    {buttonText} <MdArrowOutward />
                  </span>
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>

      {/* Hover Element */}
      <div
        ref={revealRef}
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage:
            currentProject !== null
              ? `url(${projectImages[currentProject]})`
              : "",
        }}
      />
    </div>
  );
};

export default ProjectsList;
