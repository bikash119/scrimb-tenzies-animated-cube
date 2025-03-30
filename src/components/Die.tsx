import Dieface from "./Dieface";
import { nanoid } from "nanoid";

export default function Die(props:any){
    const sides:string[] = ["front","back","right","left","top","bottom" ]
    const colors:string[] = ["red","blue","green","brown","orange","purple"]
    const randomDips = (() => {
        const newArray:number[] = []
        while(newArray.length < sides.length){
            const randomNumber = Math.ceil(Math.random() * sides.length)
            if(!newArray.includes(randomNumber)){
                newArray.push(randomNumber)
            }
        }
        return newArray;
    })();
    const colorScheme = (() => {
        const newArray:string[] = []
        while(newArray.length < sides.length){
            const randomNumber = Math.ceil(Math.random() * sides.length)
            if(!newArray.includes(colors[randomNumber-1])){
                newArray.push(colors[randomNumber-1])
            }
        }
        return newArray;
    })();
    const sidesWithDips= ()  =>  sides.map((eachSide,index) => ({id:nanoid(), side:eachSide,value:randomDips[index]}))
    return(
        <button className="die" onClick={props.onClick}>
            <div className="die-3d-space"> {/* Container to house the 3d Space */}
                <div className="die-3d-obj"> {/* 3D Object */}
                {sidesWithDips().map((eachSide:any,index:number) => (
                    <Dieface key={eachSide.id} side={eachSide.side} value={eachSide.value} backgroundColor={colorScheme[index]} /> 
                ))}
                </div>
            </div>
        </button>
    )
}