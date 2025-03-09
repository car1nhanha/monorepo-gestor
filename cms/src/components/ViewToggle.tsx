import { LayoutGrid, LayoutList } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow p-1">
      <button
        onClick={() => onViewChange("grid")}
        className={`p-2 rounded ${view === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={`p-2 rounded ${view === "list" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
      >
        <LayoutList size={20} />
      </button>
    </div>
  );
}
