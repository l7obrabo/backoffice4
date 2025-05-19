
import React, { useState } from 'react';
import { X, Edit, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { toast } from "sonner";

interface House {
  id: number;
  status: string;
  company: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface Column {
  key: keyof House;
  label: string;
  sortable: boolean;
}

interface HousesTableProps {
  houses: House[];
  searchQuery: string;
}

const HousesTable: React.FC<HousesTableProps> = ({ houses, searchQuery }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof House;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const columns: Column[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'checkIn', label: 'Check-in', sortable: true },
    { key: 'checkOut', label: 'Check-out', sortable: true },
    { key: 'guests', label: 'Guests', sortable: true },
  ];

  const handleSort = (key: keyof House) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  const sortedHouses = React.useMemo(() => {
    let sortableHouses = [...houses];
    
    if (sortConfig !== null) {
      sortableHouses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableHouses;
  }, [houses, sortConfig]);

  const filteredHouses = sortedHouses.filter(house => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      house.id.toString().includes(searchTerm) ||
      house.status.toLowerCase().includes(searchTerm) ||
      house.company.toLowerCase().includes(searchTerm) ||
      house.name.toLowerCase().includes(searchTerm) ||
      house.location.toLowerCase().includes(searchTerm) ||
      house.checkIn.toLowerCase().includes(searchTerm) ||
      house.checkOut.toLowerCase().includes(searchTerm) ||
      house.guests.toString().toLowerCase().includes(searchTerm)
    );
  });

  const handleDelete = (id: number) => {
    toast.success(`House ${id} deleted successfully`);
  };

  const handleEdit = (id: number) => {
    toast.success(`Editing house ${id}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead 
                key={column.key}
                className="font-semibold text-gray-700 whitespace-nowrap"
                onClick={() => column.sortable && handleSort(column.key)}
                style={{ cursor: column.sortable ? 'pointer' : 'default' }}
              >
                {column.label}{' '}
                {sortConfig && sortConfig.key === column.key && (
                  sortConfig.direction === 'ascending' ? 
                    <ArrowUp className="inline h-4 w-4" /> : 
                    <ArrowDown className="inline h-4 w-4" />
                )}
              </TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredHouses.map(house => (
            <TableRow key={house.id}>
              <TableCell>{house.id}</TableCell>
              <TableCell>{house.status}</TableCell>
              <TableCell>{house.company}</TableCell>
              <TableCell>{house.name}</TableCell>
              <TableCell>{house.location}</TableCell>
              <TableCell>{house.checkIn}</TableCell>
              <TableCell>{house.checkOut}</TableCell>
              <TableCell>{house.guests}</TableCell>
              <TableCell className="text-right space-x-2">
                <button 
                  onClick={() => handleDelete(house.id)} 
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={18} />
                </button>
                <button 
                  onClick={() => handleEdit(house.id)} 
                  className="text-gray-500 hover:text-blue-500"
                >
                  <Edit size={18} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HousesTable;
