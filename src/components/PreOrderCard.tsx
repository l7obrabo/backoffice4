
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, Users } from 'lucide-react';
import { toast } from "sonner";

interface PreOrder {
  id: number;
  villa: string;
  severity: number;
  date: string;
  members: number;
  conciergeMessage: string;
  status: 'Concluded' | 'Pending' | 'Cancelled';
}

interface PreOrderCardProps {
  preOrder: PreOrder;
}

const PreOrderCard = ({ preOrder }: PreOrderCardProps) => {
  const handleSeeDetails = () => {
    toast.success(`Viewing details for ${preOrder.villa}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <h3 className="font-medium text-gray-800">{preOrder.villa}</h3>
        <span className="text-sm text-gray-500">severity {preOrder.severity}</span>
      </div>
      
      <div className="px-4 pb-2 flex gap-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Clock className="h-4 w-4" />
          <span>{preOrder.date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Users className="h-4 w-4" />
          <span>{preOrder.members} members</span>
        </div>
      </div>

      <div className="border-t border-gray-100 mt-2"></div>
      
      <div className="p-4">
        <h4 className="text-gray-700 font-medium mb-1">Concierge</h4>
        <p className="text-sm text-gray-600 mb-2">{preOrder.conciergeMessage}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-500">Status: </span>
            <span 
              className={preOrder.status === 'Concluded' ? 'text-green-500' : 
                        preOrder.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}
            >
              {preOrder.status}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSeeDetails}
            className={preOrder.status === 'Concluded' ? 'text-blue-600 hover:text-blue-700' : ''}
          >
            See details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreOrderCard;
