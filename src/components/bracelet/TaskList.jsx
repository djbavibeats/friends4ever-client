import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/pro-solid-svg-icons"

const Task = ({ task }) => {
    return (<>
        <div className="grid mb-4 grid-cols-3">
            <div className="col-span-2">
                <p className="font-eurostile">{ task.name }</p>
                <p className={ task.completed ? 'text-[#0038FF] text-xs font-bold' : 'text-[#d0291d] text-xs font-bold' }>{ task.completed ? 'COMPLETE' : 'INCOMPLETE' }</p>
                <p className="text-xs pt-2">{ task.description }</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <div className="border-2 border-black py-3 px-1 rounded-xl bg-[rgba(0,0,0,0.075)] hover:cursor-pointer">
                    <p className="font-eurostile text-[10px] text-center">GO TO TASK</p>
                </div>
            </div>
        
        </div>
    </>)
}

export default function TaskList({ user, toggleTaskModal }) {
    console.log(user)
    const close = () => {
        toggleTaskModal()
    }
    return (<>
        <div className="flex items-center absolute top-0 left-0 h-screen w-screen p-2 bg-[rgba(0,0,0,0.5)] z-20">
            <div className="modal-container w-[95%] max-w-[500px] min-w-[330px] m-auto">
                <div className="relative task-list-modal text-black pt-14">
                    <div className="absolute top-3 right-3 text-md border-2 border-black rounded-full px-[10px] py-1 font-bold bg-[rgba(0,0,0,0.25)] hover:cursor-pointer" onClick={ close }>
                        <FontAwesomeIcon icon={faX} />
                    </div>
                    <p className="font-eurostile text-center text-2xl leading-[1.8rem] tracking-[.2rem] mb-4">TASK LIST</p>
                    <div className="h-[2px] w-[90%] m-auto bg-black mb-4"></div>            
                    <div className="px-5">
                        { user.charms.map((task, index) => {
                            return <Task index={ index } task={ task } />
                        })}
                    </div>    
                    <div className="h-[2px] w-[90%] m-auto bg-black mb-4"></div> 
                    {/* <div className="border-2 border-black py-3 px-1 rounded-xl w-24 m-auto flex items-center justify-center bg-[rgba(0,0,0,0.075)]">
                        <p className="font-eurostile text-xs text-center">CLOSE</p>
                    </div> */}
                </div>
            </div>
        </div>
    </>)
}   