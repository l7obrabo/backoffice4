
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { X, Pencil } from "lucide-react";

export interface Company {
  id: string;
  name: string;
  admin: string;
  users: number;
  email: string;
  phone: string;
  location: string;
}

interface CompaniesTableProps {
  companies: Company[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort: (column: string) => void;
}

const CompaniesTable = ({ 
  companies, 
  sortColumn = 'name', 
  sortDirection = 'asc', 
  onSort 
}: CompaniesTableProps) => {
  
  const getSortIndicator = (column: string) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead 
              className="cursor-pointer font-medium"
              onClick={() => onSort('name')}
            >
              Name {getSortIndicator('name')}
            </TableHead>
            <TableHead 
              className="cursor-pointer font-medium"
              onClick={() => onSort('admin')}
            >
              Admin {getSortIndicator('admin')}
            </TableHead>
            <TableHead 
              className="cursor-pointer font-medium text-center"
              onClick={() => onSort('users')}
            >
              Users {getSortIndicator('users')}
            </TableHead>
            <TableHead 
              className="cursor-pointer font-medium"
              onClick={() => onSort('email')}
            >
              Email {getSortIndicator('email')}
            </TableHead>
            <TableHead 
              className="cursor-pointer font-medium"
              onClick={() => onSort('phone')}
            >
              Phone {getSortIndicator('phone')}
            </TableHead>
            <TableHead 
              className="cursor-pointer font-medium"
              onClick={() => onSort('location')}
            >
              Location {getSortIndicator('location')}
            </TableHead>
            <TableHead className="font-medium text-right pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id} className="bg-white">
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>{company.admin}</TableCell>
              <TableCell className="text-center">{company.users}</TableCell>
              <TableCell>{company.email}</TableCell>
              <TableCell>{company.phone}</TableCell>
              <TableCell>{company.location}</TableCell>
              <TableCell>
                <div className="flex space-x-2 justify-end">
                  <button 
                    className="p-1 rounded-full hover:bg-gray-100"
                    onClick={() => console.log(`Delete company ${company.id}`)}
                  >
                    <X size={16} />
                  </button>
                  <button 
                    className="p-1 rounded-full hover:bg-gray-100"
                    onClick={() => console.log(`Edit company ${company.id}`)}
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {companies.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No companies found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
