import { HttpException } from '@nestjs/common';
import { Geometry } from 'geojson';

export function ToGeometry(array: any) {
  // TODO: verificar se as coordenadas não estão trocadas de posição no array
  const [latitude, longitude] = JSON.parse(array);
  if (
    !latitude ||
    !longitude ||
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    longitude > 180 ||
    latitude > 90
  ) {
    throw new HttpException('Coordenada inválida', 400);
  }

  const location: Geometry = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  return { ...location };
}
