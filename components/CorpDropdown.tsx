"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export type CorpDropdownOption = {
  value: string;
  label: string;
};

export default function CorpDropdown({
  value,
  options,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
}: {
  value: string;
  options: CorpDropdownOption[];
  onChange: (value: string) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`corpDropdown ${open ? "open" : ""} ${className}`}
    >
      <button
        type="button"
        className="corpDropdownTrigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={selected ? "" : "placeholder"}>
          {selected?.label ?? placeholder}
        </span>
        <span className="corpDropdownChevron" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none">
            <path
              d="m5 7.5 5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && !disabled && (
        <div className="corpDropdownMenu" role="listbox">
          {options.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                className={`corpDropdownOption ${active ? "selected" : ""}`}
                onClick={async () => {
                  setOpen(false);
                  await onChange(option.value);
                }}
              >
                <span>{option.label}</span>
                {active && <span className="corpDropdownCheck">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
