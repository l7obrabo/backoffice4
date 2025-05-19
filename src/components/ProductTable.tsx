
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import TablePagination from '@/components/TablePagination';

interface Product {
  id: number;
  group: string;
  category: string;
  subcategory: string;
  location: string;
  pacotes: string;
}

interface SortConfig {
  key: keyof Product | null;
  direction: 'ascending' | 'descending';
}

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const ProductTable = ({
  products,
  onDelete,
  onEdit,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange
}: ProductTableProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'id',
    direction: 'ascending'
  });

  const handleSort = (key: keyof Product) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    });
  };

  // Sort products based on sort configuration
  const sortedProducts = [...products].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Paginate products
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / pageSize);

  // Render arrow for sorted column
  const renderSortArrow = (key: keyof Product) => {
    if (sortConfig.key !== key) return ' ↕';
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  return (
    <div className="bg-white rounded-md shadow">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead 
                className="w-14 cursor-pointer"
                onClick={() => handleSort('id')}
              >
                ID {renderSortArrow('id')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('group')}
              >
                Group {renderSortArrow('group')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('category')}
              >
                Category {renderSortArrow('category')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('subcategory')}
              >
                Subcategory {renderSortArrow('subcategory')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('location')}
              >
                Location {renderSortArrow('location')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('pacotes')}
              >
                Pacotes {renderSortArrow('pacotes')}
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={`${product.id}-${product.group}`} className="hover:bg-gray-50">
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.group}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.subcategory}</TableCell>
                <TableCell>{product.location}</TableCell>
                <TableCell>{product.pacotes}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onDelete(product.id)}
                      className="h-8 w-8 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onEdit(product.id)}
                      className="h-8 w-8 text-gray-500 hover:text-blue-600"
                    >
                      <Edit2 size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleImport}
            >
              Import
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExport}
            >
              Export
            </Button>
          </div>

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={products.length}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </div>
    </div>
  );

  function handleImport() {
    // This would typically be handled by the parent component
    console.log('Import clicked in table');
  }
  
  function handleExport() {
    // This would typically be handled by the parent component
    console.log('Export clicked in table');
  }
};

export default ProductTable;
