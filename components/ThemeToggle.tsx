"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("salix-theme");
  if (saved === "dark" || saved === "light") return saved;
  return "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => { const next=getTheme(); setTheme(next); document.documentElement.dataset.theme=next; }, []);
  function toggle(){const next:Theme=theme==="dark"?"light":"dark";setTheme(next);document.documentElement.dataset.theme=next;window.localStorage.setItem("salix-theme",next);}
  return <button type="button" className="corpThemeToggle" onClick={toggle} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}><span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span><span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span></button>;
}
