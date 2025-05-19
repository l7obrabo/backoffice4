
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, Clock, Users } from 'lucide-react';
import { toast } from "sonner";
import PreOrderCard from '../components/PreOrderCard';

interface PreOrder {
  id: number;
  villa: string;
  severity: number;
  date: string;
  members: number;
  conciergeMessage: string;
  status: 'Concluded' | 'Pending' | 'Cancelled';
}

const PreOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Mock pre-order data
  const preOrders: PreOrder[] = [
    {
      id: 1,
      villa: 'Tropical Villas 2',
      severity: 2,
      date: '12/01/2025 at 9:00 AM',
      members: 4,
      conciergeMessage: 'We accept payment via Credit Card or Paypal. In case we aren\'t able to place the order due to availability or other issues...',
      status: 'Concluded'
    },
    {
      id: 2,
      villa: 'Tropical Villas 2',
      severity: 2,
      date: '12/01/2025 at 9:00 AM',
      members: 4,
      conciergeMessage: 'We accept payment via Credit Card or Paypal. In case we aren\'t able to place the order due to availability or other issues...',
      status: 'Concluded'
    },
    {
      id: 3,
      villa: 'Tropical Villas 2',
      severity: 2,
      date: '12/01/2025 at 9:00 AM',
      members: 4,
      conciergeMessage: 'We accept payment via Credit Card or Paypal. In case we aren\'t able to place the order due to availability or other issues...',
      status: 'Concluded'
    },
    {
      id: 4,
      villa: 'Tropical Villas 2',
      severity: 2,
      date: '12/01/2025 at 9:00 AM',
      members: 4,
      conciergeMessage: 'We accept payment via Credit Card or Paypal. In case we aren\'t able to place the order due to availability or other issues...',
      status: 'Concluded'
    }
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilter = () => {
    toast.success("Filter clicked");
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const filteredPreOrders = preOrders.filter(order => 
    order.villa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.conciergeMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">Pre-orders</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="w-64">
              <SearchBar onSearch={handleSearch} placeholder="Search" />
            </div>
            <div className="flex items-center bg-white rounded-md border border-gray-200 p-1">
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => handleViewModeChange('grid')}
                className={`${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                <Grid className="h-4 w-4" />
                <span className="ml-2">Grid</span>
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => handleViewModeChange('list')}
                className={`${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                <List className="h-4 w-4" />
                <span className="ml-2">List</span>
              </Button>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleFilter}
            className="border-gray-300"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
          {filteredPreOrders.map(order => (
            <PreOrderCard key={order.id} preOrder={order} />
          ))}
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Lines per page: 10 ▼
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>1-10 of 50 pages</span>
            <div className="flex">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                &lt;
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrders;
