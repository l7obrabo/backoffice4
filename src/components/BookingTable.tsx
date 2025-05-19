
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

interface Booking {
  id: number;
  status: string;
  company: string;
  houseName: string;
  houseId: number;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
}

interface Column {
  key: keyof Booking;
  label: string;
  sortable: boolean;
}

interface BookingTableProps {
  bookings: Booking[];
  searchQuery: string;
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings, searchQuery }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Booking;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const columns: Column[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'houseName', label: 'House name', sortable: true },
    { key: 'houseId', label: 'House ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'checkIn', label: 'Check-in', sortable: true },
    { key: 'checkOut', label: 'Check-out', sortable: true },
  ];

  const handleSort = (key: keyof Booking) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  const sortedBookings = React.useMemo(() => {
    let sortableBookings = [...bookings];
    
    if (sortConfig !== null) {
      sortableBookings.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableBookings;
  }, [bookings, sortConfig]);

  const filteredBookings = sortedBookings.filter(booking => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      booking.id.toString().includes(searchTerm) ||
      booking.status.toLowerCase().includes(searchTerm) ||
      booking.company.toLowerCase().includes(searchTerm) ||
      booking.houseName.toLowerCase().includes(searchTerm) ||
      booking.houseId.toString().includes(searchTerm) ||
      booking.name.toLowerCase().includes(searchTerm) ||
      booking.email.toLowerCase().includes(searchTerm) ||
      booking.phone.toLowerCase().includes(searchTerm) ||
      booking.checkIn.toLowerCase().includes(searchTerm) ||
      booking.checkOut.toLowerCase().includes(searchTerm)
    );
  });

  const handleDelete = (id: number) => {
    toast.success(`Booking ${id} deleted successfully`);
  };

  const handleEdit = (id: number) => {
    toast.success(`Editing booking ${id}`);
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
          {filteredBookings.map(booking => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>{booking.company}</TableCell>
              <TableCell>{booking.houseName}</TableCell>
              <TableCell>{booking.houseId}</TableCell>
              <TableCell>{booking.name}</TableCell>
              <TableCell>{booking.email}</TableCell>
              <TableCell>{booking.phone}</TableCell>
              <TableCell>{booking.checkIn}</TableCell>
              <TableCell>{booking.checkOut}</TableCell>
              <TableCell className="text-right space-x-2">
                <button 
                  onClick={() => handleDelete(booking.id)} 
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={18} />
                </button>
                <button 
                  onClick={() => handleEdit(booking.id)} 
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

export default BookingTable;
