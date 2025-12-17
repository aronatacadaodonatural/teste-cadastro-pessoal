export const formatCPF = (value: string): string => {
  // Remove non-numeric characters
  const cleanValue = value.replace(/\D/g, '');
  
  // Apply mask: 000.000.000-00
  return cleanValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const formatPhone = (value: string): string => {
  // Remove non-numeric characters
  const cleanValue = value.replace(/\D/g, '');
  
  // Apply mask: (00) 00000-0000
  return cleanValue
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};