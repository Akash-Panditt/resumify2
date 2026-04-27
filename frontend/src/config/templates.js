export const TEMPLATES = [
  { id: 'modern', name: 'Modern', isPremium: false },
  { id: 'classic', name: 'Classic', isPremium: false },
  { id: 'minimalist', name: 'Minimalist', isPremium: false },
  { id: 'creative', name: 'Creative', isPremium: true },
  { id: 'professional', name: 'Professional', isPremium: true },
  { id: 'indigo', name: 'Indigo', isPremium: true },
  { id: 'gold', name: 'Gold', isPremium: true },
  { id: 'ruby', name: 'Ruby', isPremium: true },
  { id: 'blueprint', name: 'Blueprint', isPremium: false },
  { id: 'simple', name: 'Simple', isPremium: false },
  { id: 'compact', name: 'Compact', isPremium: false },
  { id: 'basic', name: 'Basic', isPremium: false },
  { id: 'photo-free', name: 'Photo (Free)', isPremium: false },
  { id: 'photo-premium', name: 'Photo (Premium)', isPremium: true },
  { id: 'mocha', name: 'Mocha', isPremium: true },
  { id: 'sage', name: 'Sage', isPremium: true },
  { id: 'onyx', name: 'Onyx', isPremium: true },
  { id: 'silver', name: 'Silver', isPremium: true },
  { id: 'navy', name: 'Navy', isPremium: true },
  { id: 'formal', name: 'Formal', isPremium: true },
  { id: 'modern-dark', name: 'Modern Dark', isPremium: true },
  { id: 'pastel', name: 'Pastel', isPremium: true },
  { id: 'tech', name: 'Tech', isPremium: true },
  // 45 Profession Templates are generally Premium
  { id: 'dr-1', name: 'Doctor - Specialized', isPremium: true },
  { id: 'lw-1', name: 'Lawyer - Formal', isPremium: true },
  { id: 'tc-1', name: 'Teacher - Academic', isPremium: true },
  // ... and so on for others, marking most profession-specific as premium
];

export const isTemplatePremium = (templateId) => {
  const template = TEMPLATES.find(t => t.id === templateId);
  if (!template) return false;
  return template.isPremium;
};
