type SiteConfig={email:string;phone:string;socials:{label:string;href:string}[]};
export const SITE_CONFIG:SiteConfig={
  email:'hello@grotera.com',
  phone:'',
  socials:[],
};
export const navItems=[['Home','home'],['About','about'],['Services','services'],['Work','work'],['Contact','contact']]as const;
