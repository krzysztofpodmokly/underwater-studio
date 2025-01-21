"use client";

import { asImageSrc, Content, isFilled } from "@prismicio/client";
import gsap from "gsap";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

type Props = {
  projects: Content.ProjectDocument[];
  fallbackImage: Content.ProjectsSlice["primary"]["fallback_item_image"];
  buttonText: Content.ProjectsSlice["primary"]["button_text"];
};

const ProjectsList = ({ projects, fallbackImage, buttonText }: Props) => {
  const ref = useRef(null);
  const revealRef = useRef(null);
  const [currentProject, setCurrentProject] = useState<null | number>(null);
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

  const onMouseEnter = (index: number) => {
    setCurrentProject(index);
  };

  const onMouseLeave = () => {
    setCurrentProject(null);
  };

  return (
    <div className="z-[100]" ref={ref}>
      <ul
        className="grid border-b border-b-slate-100"
        onMouseLeave={onMouseLeave}
      >
        {projects.map(({ uid, data, tags }, index) => (
          <>
            {isFilled.keyText(data.title) && (
              <li
                key={uid}
                className="opacity-0f list-item"
                onMouseEnter={() => onMouseEnter(index)}
              >
                <Link
                  href={`/project/${uid}`}
                  className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
                  aria-label={data.title}
                >
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold">{data.title}</span>
                    <div className="flex gap-3 text-lg font-bold text-yellow-400">
                      {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
                    {buttonText} <MdArrowOutward />
                  </span>
                </Link>
              </li>
            )}
          </>
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
