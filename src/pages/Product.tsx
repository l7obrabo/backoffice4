import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductTable from '@/components/ProductTable';
import { PlusSquare, Filter, Import, FileText, Search } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  group: string;
  category: string;
  subcategory: string;
  location: string;
  pacotes: string;
}

const mockProducts: Product[] = [
  { id: 12, group: 'Solutia', category: 'House', subcategory: 'House', location: '1077 Tipple Road, Philadelphia - 19153', pacotes: '137 431-6314' },
  { id: 4, group: 'Tropical Villas', category: 'Apartment', subcategory: 'Apartment', location: '1070 Echo Lane, Kalamazoo - 49007', pacotes: '137 431-6314' },
  { id: 5, group: 'Epic Trip', category: 'House', subcategory: 'House', location: '1071 Tipple Road, Philadelphia - 19231', pacotes: '407 431-6314' },
  { id: 6, group: 'JS Hosting', category: 'Apartment', subcategory: 'Apartment', location: '1020 Echo Lane, Kalamazoo - 59007', pacotes: '407 431-6314' },
  { id: 7, group: 'Solutia', category: 'House', subcategory: 'House', location: '1070 Echo Lane, Kalamazoo - 49007', pacotes: '137 431-6314' },
  { id: 3, group: 'Epic Trip', category: 'House', subcategory: 'House', location: '1071 Tipple Road, Philadelphia - 19231', pacotes: '407 431-6314' },
  { id: 6, group: 'JS Hosting', category: 'House', subcategory: 'House', location: '1020 Echo Lane, Kalamazoo - 59007', pacotes: '407 431-6314' },
  { id: 16, group: 'Solutia', category: 'Apartment', subcategory: 'Apartment', location: '2171 Tipple Road, Philadelphia - 21231', pacotes: '407 431-6314' },
  { id: 3, group: 'Epic Trip', category: 'Apartment', subcategory: 'Apartment', location: '1071 Tipple Road, Philadelphia - 19231', pacotes: '407 431-6314' },
  { id: 6, group: 'JS Hosting', category: 'House', subcategory: 'House', location: '1020 Echo Lane, Kalamazoo - 59007', pacotes: '407 431-6314' },
];

const Product = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // In a real app, you would filter based on the search term or call an API
  };
  
  const handleNewProduct = () => {
    toast.success("Creating new product");
  };

  const handleFilter = () => {
    toast.info("Filter dialog opened");
  };

  const handleImport = () => {
    toast.info("Import functionality triggered");
  };

  const handleExport = () => {
    toast.info("Export functionality triggered");
  };

  const handleDelete = (id: number) => {
    toast.success(`Product ${id} deleted`);
    // In a real app, you would delete the product and refresh the list
  };

  const handleEdit = (id: number) => {
    toast.info(`Editing product ${id}`);
    // In a real app, you would navigate to an edit form or open a modal
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-blue-600">Product</h1>
          
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleNewProduct}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlusSquare size={18} className="mr-2" />
                New product
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleFilter}
              >
                <Filter size={18} />
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={handleImport}
                className="text-gray-600"
              >
                <Import size={18} className="mr-1" />
                Import
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={handleExport}
                className="text-gray-600"
              >
                <FileText size={18} className="mr-1" />
                Export
              </Button>
            </div>
          </div>
          
          <ProductTable 
            products={products}
            onDelete={handleDelete}
            onEdit={handleEdit}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
