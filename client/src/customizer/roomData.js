// Everything the customizer needs to know about a living-room board.
// Prices are illustrative day-rate + material estimates in INR.

export const BASE_PRICE = 148000;

export const ZONES = {
  wall:    { label: 'Back wall',    accepts: 'wall' },
  floor:   { label: 'Flooring',     accepts: 'floor' },
  sofa:    { label: 'Sofa fabric',  accepts: 'sofa' },
  cushion: { label: 'Cushion trim', accepts: 'cushion' },
  curtain: { label: 'Curtains',     accepts: 'curtain' },
  rug:     { label: 'Rug',          accepts: 'rug' },
};

export const DEFAULTS = {
  wall: '#D7CBAE',
  floor: 'oak',
  sofa: '#8C7355',
  cushion: '#A23B27',
  curtain: '#C9BE9E',
  rug: '#6C6250',
};

export const FLOOR_PATTERNS = {
  oak:      { label:'Oak plank',      swatch:'linear-gradient(90deg,#B08A5A 0 8%, #9C763F 8% 9%)' , price: 0 },
  walnut:   { label:'Walnut plank',   swatch:'linear-gradient(90deg,#5B3E29 0 8%, #492F1E 8% 9%)' , price: 9000 },
  concrete: { label:'Polished concrete', swatch:'#A9A79C', price: 14000 },
  terracotta:{ label:'Terracotta tile', swatch:'linear-gradient(90deg,#B5613C 0 46%, #9C4F30 46% 50%)', price: 11000 },
};

export const SWATCHES = [
  {
    category:'wall', title:'Wall paint', kind:'color',
    options:[
      { name:'Plaster putty', value:'#D7CBAE', price:0 },
      { name:'Ink charcoal', value:'#2B2924', price:4200 },
      { name:'Sage', value:'#5C6A50', price:3600 },
      { name:'Dusted rose', value:'#C79285', price:3600 },
      { name:'Prussian', value:'#33445A', price:4800 },
    ]
  },
  {
    category:'floor', title:'Flooring', kind:'floor',
    options: Object.entries(FLOOR_PATTERNS).map(([id, v]) => ({ name:v.label, value:id, price:v.price }))
  },
  {
    category:'sofa', title:'Sofa fabric', kind:'color',
    options:[
      { name:'Undyed linen', value:'#C9BE9E', price:0 },
      { name:'Umber boucle', value:'#8C7355', price:12000 },
      { name:'Moss velvet', value:'#45573C', price:22000 },
      { name:'Charcoal wool', value:'#3A382F', price:18000 },
      { name:'Clay corduroy', value:'#A9603F', price:16000 },
    ]
  },
  {
    category:'cushion', title:'Cushion trim', kind:'color',
    options:[
      { name:'Redline piping', value:'#A23B27', price:1200 },
      { name:'Brass ochre', value:'#B08A3E', price:1200 },
      { name:'Bone', value:'#E8DFC7', price:900 },
      { name:'Ink', value:'#2B2924', price:900 },
    ]
  },
  {
    category:'curtain', title:'Curtains', kind:'color',
    options:[
      { name:'Raw cotton', value:'#C9BE9E', price:0 },
      { name:'Linen fog', value:'#B9B8AC', price:5200 },
      { name:'Ink weight', value:'#33322C', price:7600 },
      { name:'Ochre sheer', value:'#C79A4E', price:6400 },
    ]
  },
  {
    category:'rug', title:'Rug', kind:'color',
    options:[
      { name:'Undyed wool', value:'#6C6250', price:0 },
      { name:'Woven rust', value:'#9C4F30', price:9800 },
      { name:'Charcoal flatweave', value:'#302E28', price:8600 },
      { name:'Sage kilim', value:'#5C6A50', price:10400 },
    ]
  },
];

export function findOption(category, value){
  const group = SWATCHES.find(s => s.category === category);
  return group?.options.find(o => o.value === value);
}
