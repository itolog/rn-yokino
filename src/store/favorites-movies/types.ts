import { Favorites } from '../../shared/interface/favorites';

export interface FavoriteState {
  movies: Favorites[] | [];
  error: any;
  ids: number[] | [];
}
