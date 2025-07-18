import React from "react";
import Card from "./components/Card";
import ProgressBar from "./components/ProgressBar";
import DropdownDemo from "./components/DropdownDemo";
import SearchDemo from "./components/SearchDemo";
import ButtonDemo from "./components/ButtonDemo";

const cardData = [
  {
    title: "Total Campaign",
    value: "10,000",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path
          d="M10 16l4 4 8-8"
          stroke="#22C55E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Archived Campaign",
    value: "2,500",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="6" stroke="#3B82F6" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Revoked Campaign",
    value: "$12,000",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path
          d="M16 10v12M10 16h12"
          stroke="#F59E42"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "SMS Delivered",
    value: "320",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path
          d="M16 12v4l2 2"
          stroke="#EF4444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="10" stroke="#EF4444" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function App() {
  return (
    <div className="min-h-screen flex justify-center px-2">
      <div className="w-1/6 bg-blue-500  h-screen"></div>
      <div className="w-5/6 p-6">
        <div className="flex flex-row gap-4 justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-1/2">
            {cardData.map((item, idx) => (
              <Card key={idx}>
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4 h-16 w-16 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-black font-medium leading-[1.4] text-[16px] font-karla [font-variant-numeric:lining-nums_tabular-nums]">
                      {item.title}
                    </div>
                    <div className="text-black font-medium leading-[1.6] text-[24px] font-karla [font-variant-numeric:lining-nums_tabular-nums]">
                      {item.value}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="w-1/2 h-full">
            <Card>
              <div className="flex items-center">
                <div>
                  <div className="text-black font-medium leading-[1.4] text-[16px] font-karla [font-variant-numeric:lining-nums_tabular-nums]">
                    remaining SMS quota
                  </div>
                  <div className="text-black font-medium leading-[1.6] text-[24px] font-karla [font-variant-numeric:lining-nums_tabular-nums]">
                    19,924
                  </div>
                </div>
              </div>
              <div className="border border-[#CBD5E1] mt-4">
                
              </div>
              <div className="mt-6 text-black font-medium leading-[1.4] text-[16px] font-karla [font-variant-numeric:lining-nums_tabular-nums]">
              10000/20000
                </div>
                <div className="mt-4 mb-2">
                  <ProgressBar value={10000} total={20000} />
                </div>
            </Card>
        
          </div>
        </div>
        
        {/* Dropdown Demo Section */}
        <div className="mt-12">
          <DropdownDemo />
        </div>
        
        {/* Search Demo Section */}
        <div className="mt-12">
          <SearchDemo />
        </div>
        <div className="mt-12">
          <ButtonDemo />
        </div>
      </div>
    </div>
  );
}
