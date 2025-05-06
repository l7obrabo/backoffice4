
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Filter, Import, FileDown } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import CompaniesTable, { Company } from "@/components/CompaniesTable";

const MOCK_COMPANIES: Company[] = [
  { 
    id: '1', 
    name: 'Solutia', 
    admin: 'Mickele Spazio', 
    users: 12, 
    email: 'mickelespazio@solutia.com', 
    phone: '137 431-6314', 
    location: '1077 Tipple Road, Philadelphia - 19153'
  },
  { 
    id: '2', 
    name: 'Tropical Villas', 
    admin: 'Mickele Spazio', 
    users: 4, 
    email: 'mickelespazio@solutia.com', 
    phone: '137 431-6314', 
    location: '1070 Echo Lane, Kalamazoo - 49007'
  },
  { 
    id: '3', 
    name: 'Epic Trip', 
    admin: 'Conca', 
    users: 5, 
    email: 'conca@epictrip.com', 
    phone: '407 431-6314', 
    location: '1071 Tipple Road, Philadelphia - 19231'
  },
  { 
    id: '4', 
    name: 'JS Hosting', 
    admin: 'Jorge Peixoto', 
    users: 6, 
    email: 'jshosting@gmail.com', 
    phone: '407 431-6314', 
    location: '1020 Echo Lane, Kalamazoo - 59007'
  },
  { 
    id: '5', 
    name: 'Solutia', 
    admin: 'Mickele Spazio', 
    users: 7, 
    email: 'mickelespazio@solutia.com', 
    phone: '137 431-6314', 
    location: '1070 Echo Lane, Kalamazoo - 49007'
  },
  { 
    id: '6', 
    name: 'Epic Trip', 
    admin: 'José Silva', 
    users: 3, 
    email: 'jose@epictrip.com', 
    phone: '407 431-6314', 
    location: '1071 Tipple Road, Philadelphia - 19231'
  },
  { 
    id: '7', 
    name: 'JS Hosting', 
    admin: 'Jorge Peixoto', 
    users: 6, 
    email: 'jshosting@gmail.com', 
    phone: '407 431-6314', 
    location: '1020 Echo Lane, Kalamazoo - 59007'
  },
  { 
    id: '8', 
    name: 'Solutia', 
    admin: 'Danilo Reis', 
    users: 16, 
    email: 'daniloreis@solutia.com', 
    phone: '407 431-6314', 
    location: '2171 Tipple Road, Philadelphia - 21231'
  },
  { 
    id: '9', 
    name: 'Epic Trip', 
    admin: 'José Silva', 
    users: 3, 
    email: 'jose@epictrip.com', 
    phone: '407 431-6314', 
    location: '1071 Tipple Road, Philadelphia - 19231'
  },
  { 
    id: '10', 
    name: 'JS Hosting', 
    admin: 'Jorge Peixoto', 
    users: 6, 
    email: 'jshosting@gmail.com', 
    phone: '407 431-6314', 
    location: '1020 Echo Lane, Kalamazoo - 59007'
  },
];

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Filter companies based on search query
    if (value) {
      const filteredCompanies = MOCK_COMPANIES.filter(company => 
        company.name.toLowerCase().includes(value.toLowerCase()) ||
        company.admin.toLowerCase().includes(value.toLowerCase()) ||
        company.email.toLowerCase().includes(value.toLowerCase()) ||
        company.location.toLowerCase().includes(value.toLowerCase())
      );
      setCompanies(filteredCompanies);
    } else {
      setCompanies(MOCK_COMPANIES);
    }
  };

  const handleSort = (column: string) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(column);
    
    const sortedCompanies = [...companies].sort((a, b) => {
      const aValue = a[column as keyof Company];
      const bValue = b[column as keyof Company];
      
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setCompanies(sortedCompanies);
  };

  const handleNewCompany = () => {
    console.log('Create new company');
    // Would typically open a modal or navigate to a new company form
  };

  const handleImport = () => {
    console.log('Import companies');
    // Would typically open a file input dialog
  };

  const handleExport = () => {
    console.log('Export companies');
    // Would typically generate and download a CSV file
  };

  const handleFilter = () => {
    console.log('Filter companies');
    // Would typically open a filter dialog
  };

  const totalPages = Math.ceil(companies.length / pageSize);
  const paginatedCompanies = companies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-semibold mb-8 text-blue-600">Companies</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/3">
            <SearchBar onSearch={handleSearch} placeholder="Search" />
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleFilter} variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <Button onClick={handleNewCompany} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus size={16} />
              New company
            </Button>
          </div>
        </div>
        
        <CompaniesTable 
          companies={paginatedCompanies} 
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
        
        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleImport}
            >
              <Import size={16} />
              Import
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleExport}
            >
              <FileDown size={16} />
              Export
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Lines per page: </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-input bg-background h-8 w-16 rounded-md px-2 text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            
            <span className="ml-4">
              {currentPage}-{Math.min(currentPage * pageSize, companies.length)} of {companies.length} items
            </span>
            
            <div className="flex gap-1 ml-2">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
              >
                &lt;
              </button>
              <button
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`p-1 rounded ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
