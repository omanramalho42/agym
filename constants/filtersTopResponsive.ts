
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

interface FiltersTopProps {
  title: string;
}

const filtersTop: FiltersTopProps[] = [
  { title: 'Todos' },
  { title: 'Equilíbrio' },
  { title: 'Cardio / Respiratório' },
  { title: 'Fortalecimento' },
  { title: 'Flexibilidade' },
  { title: 'Pernas' },
  { title: 'Caminhada' },
  { title: 'Ginástica' },
  { title: 'Exercícios' },
];


export { container, item, filtersTop };