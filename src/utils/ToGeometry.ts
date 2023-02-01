import { HttpException } from '@nestjs/common';
import { Geometry } from 'geojson';

export function ToGeometry(array: any) {
  // TODO: verificar se as coordenadas não estão trocadas de posição no array
  const [latitude, longitude] = array;

  const location: Geometry = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  return { ...location };
}
