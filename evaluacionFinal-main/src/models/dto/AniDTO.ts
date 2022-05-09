interface BaseAniDTO {
  id?: number
  name: string
  status: string
  published: Date
  duration: number
  year: number
  type: string
  episodes: number
  photo: string | null
  }
  
  export interface AniDTO extends BaseAniDTO {
    id: number
    userId: number | null
  }
  
  export interface CreateAniDTO extends BaseAniDTO {}
  
  export interface UpdateAniDTO extends Partial<BaseAniDTO> {}