import { HttpResponse } from 'msw';

const SuccessResponse = {
  data: true,
  success: true,
  status: 200,
};

const FavoriteSuccessResponse = {
  data: 'favorited',
  success: true,
  status: 200,
};

export const getHandler = (request) => {
  const { id } = request.params;

  const response = {
    data: {
      id,
      title: 'image-title',
      description: 'image-description',
    },
    success: true,
    status: 200,
  };

  return HttpResponse.json(response, { status: 200 });
};

export const postHandler = () => {
  return HttpResponse.json(SuccessResponse, { status: 200 });
};

export const deleteHandler = () => {
  return HttpResponse.json(SuccessResponse, { status: 200 });
};

export const postFavoriteHandler = () => {
  return HttpResponse.json(FavoriteSuccessResponse, { status: 200 });
};
