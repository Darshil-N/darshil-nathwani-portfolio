import React from 'react';
import { SiPython, SiReact, SiTypescript, SiFastapi, SiTensorflow, SiOpencv, SiTailwindcss, SiMongodb, SiNodedotjs, SiKotlin, SiFirebase, SiAndroid, SiCplusplus, SiSolidity, SiPolygon, SiStreamlit, SiFlask } from 'react-icons/si';

/** Brand icons for the tech-stack chips, keyed by the name used in the project data. */
export const techIcons: Record<string, React.ReactNode> = {
  'Python': <SiPython size={18} />,
  'React': <SiReact size={18} />,
  'TypeScript': <SiTypescript size={18} />,
  'FastAPI': <SiFastapi size={18} />,
  'TensorFlow': <SiTensorflow size={18} />,
  'OpenCV': <SiOpencv size={18} />,
  'Tailwind CSS': <SiTailwindcss size={18} />,
  'MongoDB': <SiMongodb size={18} />,
  'Node.js': <SiNodedotjs size={18} />,
  'Kotlin': <SiKotlin size={18} />,
  'Firebase': <SiFirebase size={18} />,
  'Android': <SiAndroid size={18} />,
  'C++': <SiCplusplus size={18} />,
  'Solidity': <SiSolidity size={18} />,
  'Polygon': <SiPolygon size={18} />,
  'Streamlit': <SiStreamlit size={18} />,
  'Flask': <SiFlask size={18} />,
};
