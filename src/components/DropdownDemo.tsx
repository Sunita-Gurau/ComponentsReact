import React, { useState } from 'react';
import Dropdown from './Dropdown';

// Example option types
interface CategoryOption {
  id: string;
  name: string;
}
interface StatusOption {
  key: string;
  label: string;
  count?: number;
}

const DropdownDemo: React.FC = () => {
  // State for the first dropdown (Categories - simple)
  const [categoryValue, setCategoryValue] = useState<CategoryOption | undefined>(undefined);
  
  // State for the second dropdown (Status - with counts)
  const [statusValue, setStatusValue] = useState<StatusOption | undefined>(undefined);

  // State for the multi-select dropdown (Categories)
  const [multiCategoryValue, setMultiCategoryValue] = useState<CategoryOption[]>([]);

  // Options for Categories dropdown (simple)
  const categoryOptions: CategoryOption[] = [
    { id: 'all', name: 'All' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'support', name: 'Support' },
    { id: 'product', name: 'Product' }
  ];

  // Options for Status dropdown (with counts)
  const statusOptions: StatusOption[] = [
    { key: 'all', label: 'All', count: 160 },
    { key: 'draft', label: 'Draft Campaigns', count: 20 },
    { key: 'scheduled', label: 'Scheduled Campaigns', count: 15 },
    { key: 'running', label: 'Running Campaigns', count: 90 },
    { key: 'completed', label: 'Completed Campaigns', count: 25 },
    { key: 'revoked', label: 'Revoked Campaigns', count: 5 },
    { key: 'archived', label: 'Archived Campaigns', count: 5 }
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Filter Dropdown Component Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Simple dropdown (no icon before label) */}
        <div className="space-y-4">
          <p className="text-gray-600">Simple dropdown with label (no icon before label)</p>
          <Dropdown<CategoryOption>
            label="Categories"
            options={categoryOptions}
            value={categoryValue}
            onChange={option => setCategoryValue(option as CategoryOption)}
            getLabel={option => option.name}
            getValue={option => option.id}
            placeholder="All"
            showIcon={true}
            showCounts={false}
            variant="simple"
          />
        </div>

        {/* Simple dropdown with multiSelect */}
        <div className="space-y-4">
          <p className="text-gray-600">Simple dropdown with multiSelect (with label)</p>
          <Dropdown<CategoryOption>
            label="Categories (multi-select)"
            options={categoryOptions}
            value={multiCategoryValue}
            onChange={value => setMultiCategoryValue(Array.isArray(value) ? value as CategoryOption[] : [])}
            getLabel={option => option.name}
            getValue={option => option.id}
            placeholder="Select categories"
            showIcon={true}
            showCounts={false}
            variant="simple"
            multiSelect={true}
          />
          <div className="text-xs text-gray-500">Selected: {multiCategoryValue.length > 0 ? JSON.stringify(multiCategoryValue.map(o => o.name)) : 'None'}</div>
        </div>

        {/* Header-style dropdown with icon before label and counts */}
        <div className="space-y-4">
          <p className="text-gray-600">Header-style dropdown with icon before label and counts</p>
          <Dropdown<StatusOption>
            label="Status"
            options={statusOptions}
            value={statusValue}
            onChange={option => setStatusValue(option as StatusOption)}
            getLabel={option => option.label}
            getValue={option => option.key}
            getCount={option => option.count}
            placeholder="Running Campaigns"
            showIcon={true}
            showCounts={true}
            variant="filter-with-icon"
          />
        </div>

        {/* Header-style dropdown without icon before label and with counts */}
        <div className="space-y-4">
          <p className="text-gray-600">Header-style dropdown without icon before label and with counts</p>
          <Dropdown<StatusOption>
            label="Status"
            options={statusOptions}
            value={statusValue}
            onChange={option => setStatusValue(option as StatusOption)}
            getLabel={option => option.label}
            getValue={option => option.key}
            getCount={option => option.count}
            showIcon={true}
            showCounts={true}
            placeholder="All"
            variant="filter"
          />
        </div>

        {/* Simple dropdown with search */}
        <div className="space-y-4">
          <p className="text-gray-600">Simple dropdown with search (searchable)</p>
          <Dropdown<CategoryOption>
            label="Categories (searchable)"
            options={categoryOptions}
            value={categoryValue}
            onChange={option => setCategoryValue(option as CategoryOption)}
            getLabel={option => option.name}
            getValue={option => option.id}
            placeholder="All"
            showIcon={true}
            showCounts={false}
            variant="simple"
            searchable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DropdownDemo; 