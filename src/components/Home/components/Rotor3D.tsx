import ModelViewer3D from './ModelViewer3D';
import { MODELS_3D } from '../../../lib/models3d';

const Rotor3D = () => (
  <ModelViewer3D
    modelUrl={MODELS_3D.rotor.url}
    scale={MODELS_3D.rotor.scale}
    poster={MODELS_3D.rotor.poster}
    alt="Rotor de riego 3D"
  />
);

export default Rotor3D;
