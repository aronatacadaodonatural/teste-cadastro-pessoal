import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from './Button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contactName: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  contactName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border-2 border-red-100">
        
        {/* Header */}
        <div className="p-4 border-b border-red-50 bg-red-50/50 flex items-center justify-between">
          <div className="flex items-center text-red-700 font-semibold">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Confirmar Exclusão
          </div>
          <button 
            onClick={onClose}
            className="text-red-400 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-3">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 text-red-600">
            <Trash2 size={24} />
          </div>
          <p className="text-slate-600">
            Tem certeza que deseja excluir o contato <br/>
            <span className="font-semibold text-slate-900">"{contactName}"</span>?
          </p>
          <p className="text-xs text-slate-500">
            Essa ação não poderá ser desfeita.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center space-x-3">
          <Button variant="secondary" onClick={onClose} className="w-full">
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} className="w-full">
            Sim, Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};