import ModelViewer3D from './ModelViewer3D';
import { MODELS_3D } from '../../../lib/models3d';

const Difusor3D = () => (
  <ModelViewer3D
    modelUrl={MODELS_3D.difusor.url}
    scale={MODELS_3D.difusor.scale}
    poster={MODELS_3D.difusor.poster}
    alt="Difusor de riego 3D"
  />
);

export default Difusor3D;
