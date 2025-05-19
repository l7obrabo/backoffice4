
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BookingTable from '../components/BookingTable';
import SearchBar from '../components/SearchBar';
import { Button } from "@/components/ui/button";
import { Filter, Calendar } from 'lucide-react';
import TablePagination from '../components/TablePagination';
import { toast } from "sonner";

const Booking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Mock booking data
  const bookings = [
    { id: 1, status: 'Extended', company: 'Tropical Villas', houseName: 'Village 1', houseId: 5, name: 'Antony', email: 'anthony@gmail.com', phone: '407 431 6314', checkIn: '21/11/24', checkOut: '23/12/24' },
    { id: 2, status: 'Extended', company: 'Tropical Villas', houseName: 'Village 1', houseId: 5, name: 'Antony', email: 'anthony@gmail.com', phone: '407 431 6314', checkIn: '21/11/24', checkOut: '23/12/24' },
    { id: 3, status: 'Extended', company: 'Tropical Villas', houseName: 'Village 1', houseId: 5, name: 'Antony', email: 'anthony@gmail.com', phone: '407 431 6314', checkIn: '21/11/24', checkOut: '23/12/24' },
    { id: 4, status: 'Extended', company: 'Tropical Villas', houseName: 'Village 1', houseId: 5, name: 'Antony', email: 'anthony@gmail.com', phone: '407 431 6314', checkIn: '21/11/24', checkOut: '23/12/24' },
    { id: 5, status: 'Extended', company: 'Tropical Villas', houseName: 'Village 1', houseId: 5, name: 'Antony', email: 'anthony@gmail.com', phone: '407 431 6314', checkIn: '21/11/24', checkOut: '23/12/24' },
    { id: 6, status: 'Extended', company: 'Tropical Villas', houseName: 'Village 1', houseId: 5, name: 'Antony', email: 'anthony@gmail.com', phone: '407 431 6314', checkIn: '21/11/24', checkOut: '23/12/24' },
    { id: 7, status: 'Concluded', company: 'Tropical Villas', houseName: 'Village 1', houseId: 5, name: 'Antony', email: 'anthony@gmail.com', phone: '407 431 6314', checkIn: '21/11/24', checkOut: '23/12/24' },
    { id: 8, status: 'Concluded', company: 'Tropical Villas', houseName: 'Village 1', houseId: 5, name: 'Antony', email: 'anthony@gmail.com', phone: '407 431 6314', checkIn: '21/11/24', checkOut: '23/12/24' },
    { id: 9, status: 'Concluded', company: 'Tropical Villas', houseName: 'Village 1', houseId: 5, name: 'Antony', email: 'anthony@gmail.com', phone: '407 431 6314', checkIn: '21/11/24', checkOut: '23/12/24' },
    { id: 10, status: 'Concluded', company: 'Tropical Villas', houseName: 'Village 1', houseId: 5, name: 'Antony', email: 'anthony@gmail.com', phone: '407 431 6314', checkIn: '21/11/24', checkOut: '23/12/24' },
  ];

  const totalItems = bookings.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleAddBooking = () => {
    toast.success("Add booking clicked");
  };

  const handleFilter = () => {
    toast.success("Filter clicked");
  };

  const handleImport = () => {
    toast.success("Import clicked");
  };

  const handleExport = () => {
    toast.success("Export clicked");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">Booking</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="w-64">
            <SearchBar onSearch={handleSearch} placeholder="Search" />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleAddBooking} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Add booking
            </Button>
            <Button 
              variant="outline" 
              onClick={handleFilter}
              className="border-gray-300"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <BookingTable bookings={bookings} searchQuery={searchQuery} />
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleImport} 
              className="text-gray-600 border-gray-300 flex items-center gap-2"
            >
              Import
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExport} 
              className="text-gray-600 border-gray-300 flex items-center gap-2"
            >
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
      </div>
    </div>
  );
};

export default Booking;
