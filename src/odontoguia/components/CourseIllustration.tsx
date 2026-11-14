// @ts-nocheck -- código importado tal cual desde el repositorio cursosclinica
import React, { useState } from 'react';
import { Monitor, Wrench } from 'lucide-react';
import { Modality } from '../data/procedures';
import img0 from '@/assets/odontoguia/ilustracion_procesos_computadora_1794632754702.jpg';
import img1 from '@/assets/odontoguia/ilustracion_procedimientos_presenciales_1794632756749.jpg';
import img2 from '@/assets/odontoguia/ilustracion_alta_paciente_1794632758968.jpg';
import img3 from '@/assets/odontoguia/ilustracion_cambio_toner_1794632757928.jpg';

interface CourseIllustrationProps {
  procedureId: string;
  modality: Modality;
}

const IMAGE_MAP: Record<string, { src: string; alt: string }> = {
  'main-computadora': {
    src: img0,
    alt: 'Ilustración de procesos digitales y odontograma en computadora',
  },
  'main-presenciales': {
    src: img1,
    alt: 'Ilustración de procedimientos presenciales y cambio de tóner en clínica',
  },
  'proc-alta-paciente-virtual': {
    src: img2,
    alt: 'Ilustración de alta de paciente e historia clínica odontológica digital',
  },
  'proc-toner-impresora': {
    src: img3,
    alt: 'Ilustración de cambio de cartucho de tóner en impresora láser',
  },
};

export const CourseIllustration: React.FC<CourseIllustrationProps> = ({
  procedureId,
  modality,
}) => {
  const [hasError, setHasError] = useState(false);

  const matched =
    IMAGE_MAP[procedureId] ||
    (procedureId.includes('toner')
      ? IMAGE_MAP['proc-toner-impresora']
      : procedureId.includes('alta')
      ? IMAGE_MAP['proc-alta-paciente-virtual']
      : modality === 'virtual'
      ? IMAGE_MAP['main-computadora']
      : IMAGE_MAP['main-presenciales']);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#0D9488] bg-teal-50/40 rounded-lg p-6">
        {modality === 'virtual' ? (
          <Monitor className="w-10 h-10 text-[#0D9488]" />
        ) : (
          <Wrench className="w-10 h-10 text-[#D97706]" />
        )}
      </div>
    );
  }

  return (
    <img
      src={matched.src}
      alt={matched.alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className="w-full h-full object-contain select-none"
    />
  );
};
