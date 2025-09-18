export interface Genre{
      id: number;
  name: string;
}
export interface CastMember{
    id: number;
  name: string;
  character: string;
  profile_path: string | null;
}
export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface MovieDetailsDto {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number; // in minutes
  genres: Genre[];
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}