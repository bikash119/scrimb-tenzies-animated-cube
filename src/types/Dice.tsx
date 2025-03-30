type Side = {
    id:string,
    side_name:string,
    color:string,
    value:number
  }
  type Die = {
    id:string,
    sides:Side[],
    isHeld:boolean,
    colorScheme:string[],
  }
  type NoIDSide = Omit<Side,"id">

  export type {Side,Die,NoIDSide}