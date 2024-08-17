import React from 'react';
import { ParentComponent } from '@/types/general';
import { useModeStore } from '@/stores/modeStore';
import { useRouter } from 'next/router';

export const ModeSwitch: ParentComponent = () => {
  const isOptimisticMode = useModeStore(state => state.isOptimisticMode);
  const setMode = useModeStore(state => state.setMode);
  const router = useRouter();

  const handleChange = () => {
    setMode(!isOptimisticMode);
  }

  return (
    <label className="w-[120px] inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={handleChange}
        checked={isOptimisticMode}
      />
      <div
        className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Optimistic <br/>navigation</span>

    </label>
  );
};

