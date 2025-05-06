
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Filter, Import, Export } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import UsersTable, { User } from "@/components/UsersTable";

const MOCK_USERS: User[] = [
  { id: '12312', name: 'Mickele Spazio', company: 'Soluta', category: 'Houses', time: 'Now', status: 'Active' },
  { id: '141412', name: 'Conca', company: 'Soluta', category: 'Houses', time: '4 min ago', status: 'Active' },
  { id: '923014', name: 'Danilo Reis', company: 'Soluta', category: 'Users', time: '25 min ago', status: 'Active' },
  { id: '423014', name: 'Jorge Peixoto', company: 'Soluta', category: 'Houses', time: '1h ago', status: 'Inactive' },
  { id: '231241', name: 'Antonio Zaneli', company: 'Soluta', category: 'Users', time: '5h ago', status: 'Inactive' },
  { id: '839120', name: 'Felipe Reis', company: 'Soluta', category: 'Houses', time: 'One week ago', status: 'Active' },
  { id: '892321', name: 'José Silva', company: 'Soluta', category: 'Houses', time: 'Yesterday', status: 'Active' },
  { id: '839120', name: 'Felipe Reis', company: 'Soluta', category: 'Houses', time: 'One week ago', status: 'Active' },
  { id: '231241', name: 'Antonio Zaneli', company: 'Soluta', category: 'Users', time: '5h ago', status: 'Inactive' },
  { id: '423014', name: 'Jorge Peixoto', company: 'Soluta', category: 'Houses', time: '1h ago', status: 'Inactive' },
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Filter users based on search query
    if (value) {
      const filteredUsers = MOCK_USERS.filter(user => 
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.id.includes(value) ||
        user.company.toLowerCase().includes(value.toLowerCase()) ||
        user.category.toLowerCase().includes(value.toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setUsers(MOCK_USERS);
    }
  };

  const handleSort = (column: string) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(column);
    
    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a[column as keyof User];
      const bValue = b[column as keyof User];
      
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setUsers(sortedUsers);
  };

  const handleNewUser = () => {
    console.log('Create new user');
    // Would typically open a modal or navigate to a new user form
  };

  const handleImport = () => {
    console.log('Import users');
    // Would typically open a file input dialog
  };

  const handleExport = () => {
    console.log('Export users');
    // Would typically generate and download a CSV file
  };

  const handleFilter = () => {
    console.log('Filter users');
    // Would typically open a filter dialog
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-semibold mb-8">Users</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/3">
            <SearchBar onSearch={handleSearch} placeholder="Search" />
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleFilter} variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <Button onClick={handleNewUser} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus size={16} />
              New user
            </Button>
          </div>
        </div>
        
        <UsersTable 
          users={users} 
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
              <Export size={16} />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
