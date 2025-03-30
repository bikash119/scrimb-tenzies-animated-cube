import Dieface from "./Dieface";
import { Side,Die as DieType } from "@/types/Dice";
export default function Die(props:{die:DieType,onClick:() => void}){
    
    return(
        <button className="die" onClick={props.onClick}>
            <div className="die-3d-space"> {/* Container to house the 3d Space */}
                <div className={`die-3d-obj ${props.die.isHeld ? 'die-3d-obj-held' : null}`}> {/* 3D Object */}
                {props.die.sides.map((eachSide:Side,index:number) => (
                    <Dieface key={eachSide.id} side={eachSide.side_name} value={eachSide.value} backgroundColor={props.die.colorScheme[index]} /> 
                ))}
                </div>
            </div>
        </button>
    )
}