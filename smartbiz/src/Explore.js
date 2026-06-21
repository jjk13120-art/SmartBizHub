import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Explore.css";

const exploreSections = [
  {
    key: "about",
    title: "About Us",
    points: [
      "SmartBiz Hub helps businesses manage operations seamlessly.",
      "We support SMEs, startups, and professionals across industries.",
      "Real-time data, smart scheduling, and customer insights — all in one platform.",
      "Trusted by 10,000+ global businesses."
    ]
  },
  {
    key: "blog",
    title: "Blog",
    points: [
      "Explore business automation trends.",
      "Learn how to grow smarter with tech.",
      "Founder insights, success stories, and tips."
    ]
  },
  {
    key: "support",
    title: "Support",
    points: [
      "24/7 live chat and email help.",
      "Step-by-step setup videos.",
      "New user onboarding."
    ]
  },
  {
    key: "careers",
    title: "Careers",
    points: [
      "Join our team!",
      "We hire remote engineers, marketers, and support.",
      "Work from anywhere with growth opportunities."
    ]
  },
  {
    key: "media",
    title: "Media & Press",
    points: [
      "Featured in TechCrunch and YourStory.",
      "Awarded best tool 2024.",
      "Press kits and media contact available."
    ]
  }
];

export default function ExploreInfo() {
  const sectionRefs = useRef({});
  const location = useLocation();

  const scrollToSection = (hash) => {
    const section = sectionRefs.current[hash];
    if (hash && section) {
      const rect = section.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = rect.top + scrollTop;
      const centerOffset =
        window.innerHeight / 2 - section.offsetHeight / 2;

      window.scrollTo({
        top: sectionTop - centerOffset,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const hash = location.hash.substring(1);
      scrollToSection(hash);
    }, 200);
    return () => clearTimeout(timer);
  }, [location.hash]);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const timer = setTimeout(() => {
        scrollToSection(hash);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  // Intersection Observer to add animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="explore-wrapper">
      <h1 className="main-heading">Explore SmartBiz Hub</h1>
      {exploreSections.map((section) => (
        <section
          key={section.key}
          id={section.key}
          ref={(el) => (sectionRefs.current[section.key] = el)}
          className="explore-section"
        >
          <h2>{section.title}</h2>
          <ul>
            {section.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
