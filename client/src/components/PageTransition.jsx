import { motion } from 'framer-motion';

export default function PageTransition({ children }){
  return (
    <motion.div
      initial={{ clipPath:'inset(0 0 100% 0)' }}
      animate={{ clipPath:'inset(0 0 0% 0)' }}
      exit={{ clipPath:'inset(100% 0 0 0)' }}
      transition={{ duration:0.55, ease:[0.65,0,0.35,1] }}
    >
      {children}
    </motion.div>
  );
}
