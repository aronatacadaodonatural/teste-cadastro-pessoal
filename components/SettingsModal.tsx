import React, { useState, useEffect } from 'react';
import { X, Save, Sheet, HelpCircle } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  onSave: (url: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUrl,
  onSave
}) => {
  const [url, setUrl] = useState(currentUrl);

  useEffect(() => {
    setUrl(currentUrl);
  }, [currentUrl]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-[#fdfbf7]">
          <h3 className="text-lg font-semibold text-[#155e37] flex items-center">
            <Sheet className="w-5 h-5 mr-2 text-[#be9d63]" />
            Integração Google Sheets
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800 flex items-start">
            <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600" />
            <p>
              Para salvar os dados automaticamente, crie um <strong>Google Apps Script</strong> na sua planilha, publique como "App da Web" (acesso: "Qualquer pessoa") e cole a URL abaixo.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="webhook-url" className="block text-sm font-medium text-slate-700">
              URL do Web App (Script)
            </label>
            <input
              id="webhook-url"
              type="url"
              placeholder="https://script.google.com/macros/s/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#155e37]/20 focus:border-[#155e37] transition-all"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Configuração
          </Button>
        </div>
      </div>
    </div>
  );
};