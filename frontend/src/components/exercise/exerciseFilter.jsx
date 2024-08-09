// import React, { useState } from 'react';
// import { Button, FormControl, Select, MenuItem } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const ExerciseFilter = ({ muscles, categories, onFilterChange }) => {
//   const [showFilters, setShowFilters] = useState(false);

//   const toggleFilters = () => {
//     setShowFilters(!showFilters);
//   };

//   const clearFilters = () => {
//     onFilterChange(null, true, '');
//   };

//   return (
//     <div style={{ marginBottom: 16 }}>
//       <Button variant="contained" color="primary" startIcon={<ExpandMoreIcon />} onClick={toggleFilters} sx={{ marginBottom: 2 }}>
//         {showFilters ? 'Hide Filters' : 'Show Filters'}
//       </Button>
//       {showFilters && (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
//             <Select value={muscles.selected} onChange={(event) => onFilterChange(event, muscles.selected, 'muscle')} displayEmpty>
//               <MenuItem value="">All Muscles</MenuItem>
//               {muscles.all
//                 .sort((a, b) => a.localeCompare(b))
//                 .map((muscle) => (
//                   <MenuItem key={muscle} value={muscle}>
//                     {muscle}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>

//           <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
//             <Select value={categories.selected} onChange={(event) => onFilterChange(event, categories.selected, 'category')} displayEmpty>
//               <MenuItem value="">All Categories</MenuItem>
//               {categories.all
//                 .sort((a, b) => a.localeCompare(b))
//                 .map((category) => (
//                   <MenuItem key={category} value={category}>
//                     {category}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//           <Button variant="outlined" onClick={clearFilters}>
//             Clear Filters
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExerciseFilter;

import React, { useState } from 'react';

const ExerciseFilter = ({ muscles, categories, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    onFilterChange(null, true, '');
  };

  return (
    <div className="mb-4">
      <button className="mb-2 px-4 py-2 bg-primary hover:bg-opacity-80 text-white rounded flex items-center" onClick={toggleFilters}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
        <svg
          className={`w-5 h-5 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {showFilters && (
        <div className="flex items-center">
          <div className="mr-2">
            <select
              className="min-w-[200px] p-2 border border-gray-300 rounded"
              value={muscles.selected}
              onChange={(event) => onFilterChange(event, muscles.selected, 'muscle')}
            >
              <option value="">All Muscles</option>
              {muscles.all
                .sort((a, b) => a.localeCompare(b))
                .map((muscle) => (
                  <option key={muscle} value={muscle}>
                    {muscle}
                  </option>
                ))}
            </select>
          </div>

          <div className="mr-2">
            <select
              className="min-w-[200px] p-2 border border-gray-300 rounded"
              value={categories.selected}
              onChange={(event) => onFilterChange(event, categories.selected, 'category')}
            >
              <option value="">All Categories</option>
              {categories.all
                .sort((a, b) => a.localeCompare(b))
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <button className="px-4 py-2 rounded bg-primary text-white hover:bg-opacity-80" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseFilter;
