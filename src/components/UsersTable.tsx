
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { X, Edit } from "lucide-react";
import TablePagination from './TablePagination';

export interface User {
  id: string;
  name: string;
  company: string;
  category: string;
  time: string;
  status: 'Active' | 'Inactive';
}

interface UsersTableProps {
  users: User[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort: (column: string) => void;
}

const UsersTable = ({ 
  users, 
  sortColumn = 'name', 
  sortDirection = 'asc', 
  onSort 
}: UsersTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const getSortIndicator = (column: string) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = users.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(users.length / pageSize);

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => onSort('name')}
              >
                User {getSortIndicator('name')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => onSort('id')}
              >
                ID {getSortIndicator('id')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => onSort('company')}
              >
                Company {getSortIndicator('company')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => onSort('category')}
              >
                Category {getSortIndicator('category')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => onSort('time')}
              >
                Time {getSortIndicator('time')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => onSort('status')}
              >
                Status {getSortIndicator('status')}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.category}</TableCell>
                <TableCell>{user.time}</TableCell>
                <TableCell>
                  <span 
                    className={`px-3 py-1 rounded-md text-white text-xs ${
                      user.status === 'Active' ? 'bg-green-500' : 'bg-red-400'
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <X size={16} />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <Edit size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination 
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={users.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default UsersTable;
