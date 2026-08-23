import { motion } from 'framer-motion';

/**
 * Wipes content up into view the way a hand slides a fresh sheet
 * onto a drafting table. Used sparingly — see frontend-design notes.
 */
export default function Reveal({ children, delay = 0, y = 26, as: Tag = 'div', className = '' }){
  const Comp = motion[Tag] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity:0, y }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-80px' }}
      transition={{ duration:0.7, delay, ease:[0.22,0.9,0.3,1] }}
    >
      {children}
    </Comp>
  );
}
