import React from "react";
import { Button, PlusIcon } from "./Button";

export const ButtonDemo: React.FC = () => (
  <div className="space-y-10">
    {/* MD / WITH ICON */}
    <div>
      <div className="mb-2 font-semibold text-xs tracking-widest">MD / BLUE (default) WITH ICON</div>
      <div className="flex flex-wrap gap-4 mb-4">
        <Button variant="filled" icon={PlusIcon}>Create Project</Button>
        <Button variant="filled" icon={PlusIcon} loading>Create Project</Button>
        <Button variant="filled" icon={PlusIcon} disabled>Create Project</Button>
        <Button variant="outlined" icon={PlusIcon}>Create Project</Button>
        <Button variant="ghost" icon={PlusIcon}>Create Project</Button>
      </div>
    </div>
    <div>
      <div className="mb-2 font-semibold text-xs tracking-widest">MD / RED WITH ICON</div>
      <div className="flex flex-wrap gap-4 mb-4">
        <Button variant="filled" icon={PlusIcon} color="red">Create Project</Button>
        <Button variant="filled" icon={PlusIcon} loading color="red">Create Project</Button>
        <Button variant="filled" icon={PlusIcon} disabled color="red">Create Project</Button>
        <Button variant="outlined" icon={PlusIcon} color="red">Create Project</Button>
        <Button variant="ghost" icon={PlusIcon} color="red">Create Project</Button>
      </div>
    </div>
    <div>
      <div className="mb-2 font-semibold text-xs tracking-widest">MD / GREEN WITH ICON</div>
      <div className="flex flex-wrap gap-4 mb-4">
        <Button variant="filled" icon={PlusIcon} color="green">Create Project</Button>
        <Button variant="filled" icon={PlusIcon} loading color="green">Create Project</Button>
        <Button variant="filled" icon={PlusIcon} disabled color="green">Create Project</Button>
        <Button variant="outlined" icon={PlusIcon} color="green">Create Project</Button>
        <Button variant="ghost" icon={PlusIcon} color="green">Create Project</Button>
      </div>
    </div>
    {/* MD / WITHOUT ICON */}
    <div>
      <div className="mb-2 font-semibold text-xs tracking-widest">MD / BLUE (default) WITHOUT ICON</div>
      <div className="flex flex-wrap gap-4 mb-4">
        <Button variant="filled">Create Project</Button>
        <Button variant="filled" loading>Create Project</Button>
        <Button variant="filled" disabled>Create Project</Button>
        <Button variant="outlined">Create Project</Button>
        <Button variant="ghost">Create Project</Button>
      </div>
    </div>
    <div>
      <div className="mb-2 font-semibold text-xs tracking-widest">MD / RED WITHOUT ICON</div>
      <div className="flex flex-wrap gap-4 mb-4">
        <Button variant="filled" color="red">Create Project</Button>
        <Button variant="filled" loading color="red">Create Project</Button>
        <Button variant="filled" disabled color="red">Create Project</Button>
        <Button variant="outlined" color="red">Create Project</Button>
        <Button variant="ghost" color="red">Create Project</Button>
      </div>
    </div>
    <div>
      <div className="mb-2 font-semibold text-xs tracking-widest">MD / GREEN WITHOUT ICON</div>
      <div className="flex flex-wrap gap-4 mb-4">
        <Button variant="filled" color="green">Create Project</Button>
        <Button variant="filled" loading color="green">Create Project</Button>
        <Button variant="filled" disabled color="green">Create Project</Button>
        <Button variant="outlined" color="green">Create Project</Button>
        <Button variant="ghost" color="green">Create Project</Button>
      </div>
    </div>
  </div>
);

export default ButtonDemo; 