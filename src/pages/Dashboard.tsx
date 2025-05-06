
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, RefreshCw, Eye, Edit } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/Sidebar";

type StatusType = 'Active' | 'Inactive';

interface ChangelogItem {
  id: string;
  user: string;
  company: string;
  category: string;
  time: string;
  status: StatusType;
}

const Dashboard = () => {
  const summaryCards = [
    {
      title: 'Houses',
      value: '2.843',
      change: 'Increase 12% in the last month',
      color: 'text-emerald-500'
    },
    {
      title: 'Bookings',
      value: '431',
      change: 'Increase 4% in the last month',
      color: 'text-emerald-500'
    },
    {
      title: 'Orders',
      value: '72',
      change: 'Decrease 8% in the last month',
      color: 'text-red-500'
    }
  ];

  const changelogItems: ChangelogItem[] = [
    { id: '12312', user: 'Michele Spazio', company: 'Soluta', category: 'Houses', time: 'Now', status: 'Active' },
    { id: '141412', user: 'Corice', company: 'Soluta', category: 'Houses', time: '4 min ago', status: 'Active' },
    { id: '323614', user: 'Dante Reis', company: 'Soluta', category: 'Users', time: '23 min ago', status: 'Active' },
    { id: '423614', user: 'Jorge Peixoto', company: 'Soluta', category: 'Houses', time: '1h ago', status: 'Inactive' },
    { id: '231241', user: 'Antonio Zanetti', company: 'Soluta', category: 'Users', time: '5h ago', status: 'Inactive' },
    { id: '839120', user: 'Felipe Reis', company: 'Soluta', category: 'Houses', time: 'One week ago', status: 'Active' },
    { id: '892321', user: 'José Silva', company: 'Soluta', category: 'Houses', time: 'Yesterday', status: 'Active' },
    { id: '839130', user: 'Felipe Reis', company: 'Soluta', category: 'Houses', time: 'One week ago', status: 'Active' },
    { id: '231241', user: 'Antonio Zanetti', company: 'Soluta', category: 'Users', time: '5h ago', status: 'Inactive' },
    { id: '423614', user: 'Jorge Peixoto', company: 'Soluta', category: 'Houses', time: '1h ago', status: 'Inactive' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-blue-600">Dashboard</h1>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {summaryCards.map((card, index) => (
            <div key={index} className="bg-white rounded-md p-5 shadow-sm">
              <h3 className="text-gray-500 font-medium text-sm mb-2">{card.title}</h3>
              <p className={`text-3xl font-semibold ${card.title === 'Orders' ? 'text-red-500' : 'text-emerald-400'}`}>{card.value}</p>
              <div className="flex items-center mt-3 text-xs text-gray-500">
                {card.title === 'Orders' ? (
                  <ChevronDown className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <ChevronUp className="h-4 w-4 text-emerald-500 mr-1" />
                )}
                {card.change}
              </div>
            </div>
          ))}
        </div>

        {/* Changes Backlog */}
        <div className="bg-white rounded-md shadow-sm mb-4">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-blue-600 font-medium">Changes backlog</h2>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>Order: crescent</span>
              <RefreshCw className="h-4 w-4" />
            </div>
          </div>
          
          <ScrollArea className="h-[500px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    User <ChevronUp className="h-3 w-3 inline ml-1" />
                  </TableHead>
                  <TableHead>
                    ID <ChevronUp className="h-3 w-3 inline ml-1" />
                  </TableHead>
                  <TableHead>
                    Company <ChevronUp className="h-3 w-3 inline ml-1" />
                  </TableHead>
                  <TableHead>
                    Category <ChevronUp className="h-3 w-3 inline ml-1" />
                  </TableHead>
                  <TableHead>
                    Time <ChevronUp className="h-3 w-3 inline ml-1" />
                  </TableHead>
                  <TableHead>
                    Status <ChevronUp className="h-3 w-3 inline ml-1" />
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {changelogItems.map((item) => (
                  <TableRow key={`${item.id}-${item.user}`}>
                    <TableCell className="font-medium">{item.user}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          item.status === 'Active' 
                            ? 'bg-emerald-500 hover:bg-emerald-600' 
                            : 'bg-red-500 hover:bg-red-600'
                        } text-white`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button className="p-1 rounded-full bg-gray-100">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </button>
                        <button className="p-1 rounded-full bg-gray-100">
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          
          <div className="p-4 flex justify-between items-center border-t text-xs text-gray-500">
            <span>Lines per page: 10 <ChevronDown className="h-3 w-3 inline" /></span>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <span>1-10 of 50 pages</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
