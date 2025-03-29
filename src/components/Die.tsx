import Dieface from "./Dieface";
import { nanoid } from "nanoid";

export default function Die(props:any){
    const sides:string[] = ["front","back","right","left","top","bottom" ]
    const colors:string[] = ["red","blue","green","brown","orange","purple"]
    const randomDips = () => {
        const newArray:number[] = []
        while(newArray.length < sides.length){
            const randomNumber = Math.ceil(Math.random() * sides.length)
            if(!newArray.includes(randomNumber)){
                newArray.push(randomNumber)
            }
        }
        return newArray;
    }
    const faceValues = randomDips()
    const colorScheme = colors.map(() => colors[Math.floor(Math.random() * 6)])
    const sidesWithDips= ()  =>  sides.map((eachSide,index) => ({id:nanoid(), side:eachSide,value:faceValues[index]}))
    return(
        <div className="die">
            <div className="die-3d-space"> {/* Container to house the 3d Space */}
                <div className="die-3d-obj"> {/* 3D Object */}
                {sidesWithDips().map((eachSide:any,index:number) => (
                    <Dieface key={eachSide.id} side={eachSide.side} value={eachSide.value} backgroundColor={colorScheme[index]} />
                ))}
                </div>
            </div>
        </div>
    )
}