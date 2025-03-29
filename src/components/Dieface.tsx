export default function Dieface(props: {side: string,value: number,backgroundColor:string}) {
    const stringRepresentation:{[key:number]:string} = 
        {1:"one",2:"two",3 :"three",4:"four",5:"five",6:"six"}
    
    const numberToString = (number:number) => stringRepresentation[number]
    const dips = Array(props.value).fill(0).map((_,index) => (
        <span key={index} className={`die-3d-obj-face-dip ${numberToString(props.value)}-${numberToString(index+1)}`}>
            &bull;
        </span>
    ))

    return (
        <div className={`die-3d-obj-face die-3d-obj-face-${props.side}`} style={{backgroundColor:props.backgroundColor}}>
            <div className="die-3d-obj-face-dips">
                {dips}
            </div>
        </div>
    )
}