import { useId, type KeyboardEvent } from "react";
import type { SettingRowProps } from "./types";

export function SettingRow({
  icon: Icon,
  label,
  desc,
  action,
  danger,
  divider = true,
  stacked,
  onClick,
  children,
}: SettingRowProps) {
  const labelId = useId();
  const interactive = Boolean(action && onClick);

  const className = [
    "setting-item",
    action ? "action" : "",
    danger ? "danger" : "",
    stacked ? "stacked" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Action rows behave like buttons: reachable with Tab, activated with Enter / Space.
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <>
      <div
        className={className}
        onClick={onClick}
        role={interactive ? "button" : "group"}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        aria-labelledby={labelId}
      >
        <div className="setting-icon-bg" aria-hidden="true">
          <Icon size={14} strokeWidth={1.5} />
        </div>
        <div className="setting-info">
          <span id={labelId} className="setting-label">{label}</span>
          {desc && <span className="setting-desc">{desc}</span>}
        </div>
        {children}
      </div>
      {divider && <div className="setting-divider" />}
    </>
  );
}
