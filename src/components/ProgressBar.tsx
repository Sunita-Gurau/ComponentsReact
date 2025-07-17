import React from "react";

interface ProgressBarProps {
  value?: number | null;
  total?: number | null;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, total }) => {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const safeTotal = typeof total === 'number' && total > 0 ? total : 0;

  const percent =
    safeTotal === 0 ? 0 : Math.min(Math.max((safeValue / safeTotal) * 100, 0), 100);

  return (
    <div
      className="w-full bg-[#E2E8F0] border border-[#E2E8F0] rounded-[5px] h-[25px] overflow-hidden"
    >
      <div
        data-testid="progress-bar-inner"
        className="bg-[#0398DC] h-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
