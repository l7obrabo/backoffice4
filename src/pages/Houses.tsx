
import React, { useState } from 'react';
import { Plus, Filter, FileDown, FileUp } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import HousesTable from '@/components/HousesTable';
import TablePagination from '@/components/TablePagination';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const housesData = [
  {
    id: 1,
    status: 'Booked',
    company: 'Tropical Villas',
    name: 'Village 1',
    location: '1077 Tipple Road, Philadelphia - 19153',
    checkIn: '21/11/24',
    checkOut: '23/12/24',
    guests: 15
  },
  {
    id: 2,
    status: 'Rescheduling',
    company: 'Tropical Villas',
    name: 'Village 1',
    location: '1077 Tipple Road, Philadelphia - 19153',
    checkIn: '21/11/24',
    checkOut: '23/12/24',
    guests: 3
  },
  {
    id: 3,
    status: 'Booked',
    company: 'Tropical Villas',
    name: 'Village 1',
    location: '1020 Echo Lane, Kalamazoo - 59007',
    checkIn: '21/11/24',
    checkOut: '23/12/24',
    guests: 4
  },
  {
    id: 4,
    status: 'Rescheduling',
    company: 'Tropical Villas',
    name: 'Village 1',
    location: '1020 Echo Lane, Kalamazoo - 59007',
    checkIn: '21/11/24',
    checkOut: '23/12/24',
    guests: 10
  },
  {
    id: 5,
    status: 'Dealing',
    company: 'Tropical Villas',
    name: 'Star 1',
    location: '1070 Echo Lane, Kalamazoo - 49007',
    checkIn: '21/11/24',
    checkOut: '23/12/24',
    guests: 2
  },
  {
    id: 6,
    status: 'Booked',
    company: 'Tropical Villas',
    name: 'Star 2',
    location: '1077 Tipple Road, Philadelphia - 19153',
    checkIn: '21/11/24',
    checkOut: '23/12/24',
    guests: 15
  },
  {
    id: 7,
    status: 'Concluded',
    company: 'Tropical Villas',
    name: 'Star 3',
    location: '1077 Tipple Road, Philadelphia - 19153',
    checkIn: '21/11/24',
    checkOut: '23/12/24',
    guests: 2
  },
  {
    id: 8,
    status: 'Booked',
    company: 'Tropical Villas',
    name: 'Star 4',
    location: '1070 Echo Lane, Kalamazoo - 49007',
    checkIn: '21/11/24',
    checkOut: '23/12/24',
    guests: 1
  },
  {
    id: 9,
    status: 'Concluded',
    company: 'Tropical Villas',
    name: 'Star 5',
    location: '1020 Echo Lane, Kalamazoo - 59007',
    checkIn: '21/11/24',
    checkOut: '23/12/24',
    guests: 4
  },
  {
    id: 10,
    status: 'Booked',
    company: 'Tropical Villas',
    name: 'Star 6',
    location: '1077 Tipple Road, Philadelphia - 19153',
    checkIn: '21/11/24',
    checkOut: '23/12/24',
    guests: 5
  }
];

const Houses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = housesData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleNewHouse = () => {
    toast.success("New house action triggered");
  };

  const handleFilter = () => {
    toast.success("Filter action triggered");
  };

  const handleImport = () => {
    toast.success("Import action triggered");
  };

  const handleExport = () => {
    toast.success("Export action triggered");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Houses</h1>

        {/* Search and Actions Row */}
        <div className="flex justify-between mb-6">
          <div className="max-w-xs w-full">
            <SearchBar placeholder="Search" onSearch={handleSearch} />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleNewHouse} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} />
              New House
            </Button>
            <Button variant="outline" onClick={handleFilter}>
              <Filter size={16} />
              Filter
            </Button>
          </div>
        </div>

        {/* Table */}
        <HousesTable houses={housesData} searchQuery={searchQuery} />

        {/* Footer Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleImport}>
              <FileDown size={16} />
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <FileUp size={16} />
              Export
            </Button>
          </div>
          
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </main>
    </div>
  );
};

export default Houses;
