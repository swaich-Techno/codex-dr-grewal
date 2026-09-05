"use client";

import { useEffect, useRef, useState } from "react";

export function LiquidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const point = useRef({ x: -40, y: -40, px: -40, py: -40, raf: 0 });
  const [label, setLabel] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!media.matches) return;
    const cursorPoint = point.current;

    document.documentElement.classList.add("has-liquid-cursor");
    const draw = () => {
      const el = cursorRef.current;
      if (!el) return;
      const dx = cursorPoint.x - cursorPoint.px;
      const dy = cursorPoint.y - cursorPoint.py;
      cursorPoint.px += dx * 0.34;
      cursorPoint.py += dy * 0.34;
      const speed = Math.min(Math.hypot(dx, dy) / 32, 0.38);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      el.style.transform = `translate3d(${cursorPoint.px}px, ${cursorPoint.py}px, 0) rotate(${angle}deg) scale(${1 + speed}, ${1 - speed * 0.46})`;
      cursorPoint.raf = requestAnimationFrame(draw);
    };
    cursorPoint.raf = requestAnimationFrame(draw);

    const move = (event: PointerEvent) => {
      cursorPoint.x = event.clientX;
      cursorPoint.y = event.clientY;
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const isTextField = (event.target as HTMLElement).closest("input, textarea, [contenteditable='true']");
      const selecting = window.getSelection()?.type === "Range";
      cursorRef.current?.classList.toggle("is-hidden", Boolean(isTextField || selecting));
      setLabel(target?.dataset.cursor ?? "");
    };
    const down = () => cursorRef.current?.classList.add("is-pressed");
    const up = () => cursorRef.current?.classList.remove("is-pressed");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });

    return () => {
      cancelAnimationFrame(cursorPoint.raf);
      document.documentElement.classList.remove("has-liquid-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div ref={cursorRef} className={label ? "liquid-cursor has-label" : "liquid-cursor"} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
