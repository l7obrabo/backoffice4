
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Clock, FileDown, Filter, Plus, Search, X, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import TablePagination from "@/components/TablePagination";
import Sidebar from "@/components/Sidebar";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

const Customer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sample data
  const customersData: Customer[] = [
    { id: 12, name: 'James Smith', email: 'james.smith@email.com', phone: '137 431-6314', birthDate: '06/17/2000' },
    { id: 4, name: 'Mary Johnson', email: 'mary.johnson@email.com', phone: '137 431-6314', birthDate: '11/20/1985' },
    { id: 5, name: 'John Williams', email: 'john.williams@email.com', phone: '407 431-6314', birthDate: '10/26/2001' },
    { id: 6, name: 'Patricia Brown', email: 'patricia.brown@email.com', phone: '407 431-6314', birthDate: '01/01/1994' },
    { id: 7, name: 'Robert Jones', email: 'robert.jones@email.com', phone: '137 431-6314', birthDate: '04/12/1986' },
    { id: 3, name: 'Jennifer Garcia', email: 'jennifer.garcia@email.com', phone: '407 431-6314', birthDate: '03/01/1992' },
    { id: 6, name: 'Michael Miller', email: 'michael.miller@email.com', phone: '407 431-6314', birthDate: '06/21/1994' },
    { id: 16, name: 'Linda Davis', email: 'linda.davis@email.com', phone: '407 431-6314', birthDate: '10/04/1983' },
    { id: 3, name: 'William Wilson', email: 'william.wilson@email.com', phone: '407 431-6314', birthDate: '10/05/1995' },
    { id: 6, name: 'Elizabeth Thomas', email: 'elizabeth.thomas@email.com', phone: '407 431-6314', birthDate: '07/09/1985' },
  ];

  // Sort function
  const sortedCustomers = [...customersData].sort((a, b) => {
    const columnKey = sortColumn as keyof Customer;
    
    if (a[columnKey] < b[columnKey]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[columnKey] > b[columnKey]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter function
  const filteredCustomers = sortedCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Sorting handler
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Export function
  const handleExport = () => {
    alert('Export functionality would be implemented here');
  };

  // Import function
  const handleImport = () => {
    alert('Import functionality would be implemented here');
  };

  // New customer function
  const handleNewCustomer = () => {
    alert('New customer form would open here');
  };

  // Rental history function
  const handleRentalHistory = () => {
    alert('Rental history would be shown here');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-blue-600">Customer</h1>
        </header>

        {/* Search and Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-72">
            <Input
              type="text"
              placeholder="Search"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleNewCustomer}
            >
              <Plus className="h-4 w-4" />
              New customer
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleRentalHistory}
            >
              <Clock className="h-4 w-4" />
              Rental history
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-md shadow-sm">
          <ScrollArea className="h-[500px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('email')}
                  >
                    Email {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('phone')}
                  >
                    Phone {sortColumn === 'phone' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('birthDate')}
                  >
                    Birth date {sortColumn === 'birthDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    ID {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCustomers.map((customer, index) => (
                  <TableRow key={`${customer.id}-${index}`}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.birthDate}</TableCell>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                          <X className="h-4 w-4 text-gray-500" />
                        </button>
                        <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                          <Pencil className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          
          {/* Import/Export and Pagination Controls */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center border-t">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Button variant="outline" size="sm" onClick={handleImport}>
                Import
                <FileDown className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                Export
                <FileDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredCustomers.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
