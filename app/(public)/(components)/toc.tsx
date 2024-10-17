"use client";

import React from "react";

interface Heading {
  id: string;
  text: string;
  level: string;
}

const TableOfContent: React.FC = () => {
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    const headingList = Array.from(headings).map((heading) => {
      return {
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName.toLowerCase(),
      };
    });

    setHeadings(headingList);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentActiveId: string | null = null;

      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentActiveId = heading.id;
        }
      });

      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };
  
  return (
    <nav>
      <ul>
        {headings.map((heading, index) => (
          <li
            key={index}
            className={`hover:text-primary ${
              heading.level == "h2" ? "ml-6" : "ml-0"
            } ${heading.id == activeId ? "text-primary" : ""} `}
          >
            <a
              className="text-xs"
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(heading.id);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContent;
