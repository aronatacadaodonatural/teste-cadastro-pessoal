import React, { useState, useCallback, useEffect } from 'react';
import { User, Phone, FileText, Plus, Trash2, Search, Settings, ExternalLink } from 'lucide-react';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { Logo } from './components/Logo';
import { SettingsModal } from './components/SettingsModal';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { formatCPF, formatPhone, generateId } from './utils/formatters';
import { Contact, InputEvent, FormEvent } from './types';

function App() {
  // Initialize state from localStorage if available
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('contacts');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [sheetUrl, setSheetUrl] = useState(() => localStorage.getItem('sheetUrl') || '');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for delete confirmation
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Persist contacts when they change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Handle settings save
  const handleSaveSettings = (url: string) => {
    setSheetUrl(url);
    localStorage.setItem('sheetUrl', url);
  };

  // Handle input changes with masking
  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.cpf || !formData.phone) return;

    setIsSubmitting(true);

    const newContact: Contact = {
      id: generateId(),
      name: formData.name,
      cpf: formData.cpf,
      phone: formData.phone,
      createdAt: new Date()
    };

    try {
      // 1. Save locally
      setContacts(prev => [newContact, ...prev]);

      // 2. Send to Google Sheets if configured
      if (sheetUrl) {
        await fetch(sheetUrl, {
          method: 'POST',
          mode: 'no-cors', // Important for Google Apps Script Web Apps
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            cpf: formData.cpf,
            phone: formData.phone
          })
        });
      }
      
      // Reset form on success
      setFormData({
        name: '',
        cpf: '',
        phone: ''
      });
      
      // Optional: Add toast success notification here
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Salvo localmente, mas houve um erro ao enviar para a planilha. Verifique a URL nas configurações.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger the delete confirmation modal
  const handleRequestDelete = (contact: Contact) => {
    setContactToDelete(contact);
  };

  // Execute the actual deletion
  const handleConfirmDelete = useCallback(() => {
    if (contactToDelete) {
      setContacts(prev => prev.filter(contact => contact.id !== contactToDelete.id));
      setContactToDelete(null);
    }
  }, [contactToDelete]);

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.cpf.includes(searchTerm)
  );

  return (
    // Updated background color to warm off-white
    <div className="min-h-screen bg-[#fdfbf7] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        currentUrl={sheetUrl}
        onSave={handleSaveSettings}
      />

      <DeleteConfirmationModal 
        isOpen={!!contactToDelete}
        onClose={() => setContactToDelete(null)}
        onConfirm={handleConfirmDelete}
        contactName={contactToDelete?.name || ''}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section with Logo and Settings */}
        <div className="relative text-center space-y-4 pt-4">
          <div className="absolute right-0 top-0">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-[#155e37] hover:bg-[#155e37]/10 rounded-full transition-colors"
              title="Configurar Integração Google Sheets"
            >
              <Settings size={24} />
            </button>
          </div>

          <div className="flex justify-center mb-6 transform scale-110">
            <Logo />
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm inline-block px-6 py-2 rounded-full border border-[#be9d63]/20 shadow-sm">
            <h1 className="text-lg font-medium text-[#155e37] tracking-tight">
              Gestão de Contatos
            </h1>
          </div>
          
          <p className="text-slate-500 max-w-lg mx-auto text-sm">
            Cadastro de clientes e parceiros
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-[#be9d63]/30 p-6 sticky top-8 relative overflow-hidden">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#155e37] to-[#be9d63]" />
              
              <h2 className="text-lg font-semibold text-[#155e37] mb-6 flex items-center justify-between">
                <span className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-[#be9d63]" />
                  Novo Cadastro
                </span>
                {sheetUrl && (
                  <span className="flex items-center text-[10px] uppercase font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    <ExternalLink size={10} className="mr-1" />
                    Online
                  </span>
                )}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nome Completo"
                  name="name"
                  placeholder="Ex: João da Silva"
                  value={formData.name}
                  onChange={handleChange}
                  icon={User}
                  required
                />
                
                <Input
                  label="CPF"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleChange}
                  icon={FileText}
                  maxLength={14}
                  required
                />
                
                <Input
                  label="Telefone"
                  name="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={Phone}
                  maxLength={15}
                  required
                />

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full shadow-lg shadow-[#155e37]/20"
                    disabled={!formData.name || !formData.cpf || !formData.phone}
                    isLoading={isSubmitting}
                  >
                    Cadastrar Contato
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search Bar */}
            <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-[#be9d63]/20 focus-within:ring-2 focus-within:ring-[#155e37]/10 transition-shadow">
              <div className="p-2 bg-[#fdfbf7] text-[#155e37] rounded-lg">
                <Search size={20} />
              </div>
              <input 
                type="text"
                placeholder="Buscar por nome ou CPF..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="text-xs font-medium text-[#be9d63] px-2">
                {contacts.length} {contacts.length === 1 ? 'registro' : 'registros'}
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <div className="text-center py-16 bg-white/60 rounded-2xl border border-dashed border-[#be9d63]/30">
                  <div className="w-16 h-16 bg-[#fdfbf7] text-[#be9d63] rounded-full flex items-center justify-center mx-auto mb-4">
                    <User size={32} opacity={0.5} />
                  </div>
                  <h3 className="text-[#155e37] font-medium mb-1">Nenhum contato ainda</h3>
                  <p className="text-slate-500 text-sm">
                    Utilize o formulário para adicionar novos registros.
                  </p>
                </div>
              ) : filteredContacts.length === 0 ? (
                 <div className="text-center py-12">
                  <p className="text-slate-500">Nenhum contato encontrado para esta busca.</p>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div 
                    key={contact.id}
                    className="group bg-white rounded-xl p-5 border border-slate-100 hover:border-[#be9d63]/40 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-[#155e37] text-[#be9d63] flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-inner">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-[#155e37]">{contact.name}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                          <span className="flex items-center group-hover:text-[#be9d63] transition-colors">
                            <FileText size={14} className="mr-1.5" />
                            {contact.cpf}
                          </span>
                          <span className="flex items-center group-hover:text-[#be9d63] transition-colors">
                            <Phone size={14} className="mr-1.5" />
                            {contact.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="danger" 
                      onClick={() => handleRequestDelete(contact)}
                      className="w-full sm:w-auto opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 text-red-600 hover:bg-red-100 border-red-100"
                    >
                      <Trash2 size={16} />
                      <span className="sm:hidden ml-2">Excluir</span>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;